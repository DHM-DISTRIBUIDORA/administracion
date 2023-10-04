import React, { Component } from 'react';
import { SNavigation, SPage, SUuid } from 'servisofts-component';
import { Btn } from '../Components';
import SDB, { DBProps } from 'servisofts-db'

import { Platform } from 'react-native';
import SSocket from 'servisofts-socket';
import STable from 'servisofts-table';

const DB: DBProps = {
    db_name: "dhm",
    version: 2,
    tables: [
        {
            name: "usuario",
            properties: {
                "key": "string",
                "Nombres": "string?",
                "Apellidos": "string?",
                "Correo": "string?",
                "Telefono": "string?",
                "TelefonoNito": "string?"
            },
            primaryKey: "key"
        },
    ]
}

const times = {};
const time = (key) => {
    console.log(key + ":", " start ", Platform.OS);
    times[key] = new Date().getTime();
}
const timeEnd = (key) => {
    console.log(key + ":", new Date().getTime() - times[key], "ms", Platform.OS);
    delete times[key]
}
export default class index extends Component {

    constructor(props) {
        super(props)
        this.handleOpen();
    }

    componentDidMount() {
        this.handleOpen();
    }

    handleOpen() {
        SDB.open(DB).then(e => {
            console.log(e);
        }).catch(e => {
            console.error(e);
        })
    }
    handleClose() {
        SDB.close().then(e => {
            console.log(e);
        }).catch(e => {
            console.error(e);
        })
    }
    handleAddUser() {
        SDB.insert("usuario", {
            key: SUuid(),
            Nombres: "Ricardo"
        }).then(e => {
            console.log(e);
        }).catch(e => {
            console.error(e);
        })
    }
    handleGetAll() {
        time("getAll")
        SDB.all("usuario").then(e => {
            timeEnd("getAll")
            console.log(e.length);
        }).catch(e => {
            timeEnd("getAll")
            console.error(e);
        })
    }
    handleDeleteAll() {
        time("deleteAll")
        SDB.deleteAll("usuario").then(e => {
            timeEnd("deleteAll")
        }).catch(e => {
            timeEnd("deleteAll")
            console.error(e);
        })
    }
    pedirUsuarios() {
        time("pedirUsuarios");
        SSocket.sendHttpAsync("http://192.168.5.2:30002/api", {
            "version": "2.0",
            "component": "usuario",
            "type": "getAll",
            "cabecera": "registro_administrador",
            // "fecha_edit": "2022-09-10T17:00:50",
            // "fecha_edit": "2023-09-10T17:00:50",
            "servicio": {
                "key": "b98d744a-6629-4c80-b513-f007c884e8e1"
            }
        }).then(async e => {
            timeEnd("pedirUsuarios");
            console.log(Object.values(e.data).length)
            time("save_users")
            const arrData = Object.values(e.data);
            SDB.insertArray("usuario", Object.values(e.data)).then(e => {
                timeEnd("save_users")
            }).catch(e => {
                timeEnd("save_users")
            })
        }).catch((e) => {
            console.error(e);
        })
    }


    render() {
        return <SPage disableScroll>
            <Btn onPress={()=>SNavigation.reset("/")}>Reload</Btn>
            <Btn onPress={this.handleOpen}>Open</Btn>
            <Btn onPress={this.handleClose}>Close</Btn>
            <Btn onPress={this.handleAddUser}>Add User</Btn>
            <Btn onPress={this.handleGetAll}>Get All Users</Btn>
            <Btn onPress={this.handleDeleteAll}>Delete All Users</Btn>
            <Btn onPress={this.pedirUsuarios}>Pedir USUARIOS DB</Btn>
            <STable
                ref={(ref) => this.table = ref}
                loadData={new Promise((ok, error) => {
                    SDB.all("usuario").then(e => {
                        let allKeysSet = new Set();
                        e.forEach(obj => {
                            Object.keys(obj).forEach(key => allKeysSet.add(key));
                        });
                        const allKeys = Array.from(allKeysSet);
                        // console.log(e) 
                        let arrData = e.map(obj => allKeys.map(k => obj[k]));
                        arrData.splice(0, 0, allKeys)
                        ok(arrData)
                    }).catch(e => {
                        console.error(e);
                    })
                })}
            />
        </SPage>
    }

}
