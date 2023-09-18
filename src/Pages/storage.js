import React, { Component } from 'react';
import { SButtom, SHr, SNavigation, SPage, SText, STheme, SUuid, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket';
// import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import SDB from 'servisofts-db'
import { Btn, Container } from '../Components';
import { Platform } from 'react-native';
import STable from 'servisofts-table';
// import SFileStore from '../SFileStore';
// import { Platform } from 'react-native';



const keyStore = "test1";
export default class index extends Component {

    state = {
        data: [],
        loading: false,
    }

    times = {};
    time(key) {
        this.times[key] = new Date().getTime();
    }
    timeEnd(key) {
        console.log(key + ":", new Date().getTime() - this.times[key], "ms", Platform.OS);
        delete this.times[key]
    }
    componentDidMount() {
        // this.read();
    }
    async save(data) {
        this.time("save");
        return SDB.setItem(keyStore, data, { keyPath: "key" })
            .then(e => {
                this.timeEnd("save");
            }).catch(e => {
                this.timeEnd("save");
                console.error(e)
            })
    }
    async read() {
        this.time("read");
        SDB.getItem(keyStore).then(e => {
            this.timeEnd("read");
            // console.log(e);
            this.setState({ data: e })
        
        }).catch(e => {
            this.timeEnd("read");
            this.setState({ data: [] })
            console.error(e);
        })
    }

    pedirUsuarios() {
        this.setState({ loading: "solicitando usuarios" });
        this.time("pedirUsuarios");
        SSocket.sendHttpAsync("http://192.168.5.2:30002/api", {
            "version": "2.0",
            "component": "usuario",
            "type": "getAll",
            "cabecera": "registro_administrador",
            // "fecha_edit": "2022-09-10T17:00:50",
            "fecha_edit": "2023-09-10T17:00:50",
            "servicio": {
                "key": "b98d744a-6629-4c80-b513-f007c884e8e1"
            }
        }).then(e => {
            this.timeEnd("pedirUsuarios");
            console.log(Object.values(e.data).length)
            this.save(Object.values(e.data))
            this.setState({ loading: "usuarios cargados" });
            // console.log(e);
        }).catch((e)=>{
            console.error(e);
        })
    }
    render() {
        return <SPage disableScroll hidden>
            <Container >
                <SView col={"xs-12"} row style={{
                    justifyContent: "space-between"
                }}>
                    <Btn onPress={() => console.log("ESTA BIEn")}>debug</Btn>
                    <Btn onPress={this.pedirUsuarios.bind(this)}>PEDIR USUARIOS</Btn>
                    <Btn onPress={async () => {
                        await this.save(new Array(10).fill({ key: SUuid(), "nombre": "Juan", "desrcripcion":"Hola, Mi nombre es juan \n soy pro activo." }))
                        // this.read()
                    }}>ADD USER</Btn>
                    <Btn onPress={async () => {
                        await SDB.removeItem(keyStore)
                        this.read()
                    }}>CLEAR</Btn>
                    <Btn onPress={() => {
                        this.read();
                    }}>READ</Btn>
                </SView>
                <SText>{this.state.loading}</SText>
                <SText>{!this.state.data ? "SIN DATA" : this.state.data.length} </SText>
            </Container>
            {/* <STable
                ref={(ref) => this.table = ref}
                loadData={new Promise((ok, error) => {
                    SDB.getItem(keyStore).then(e => {
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
            /> */}
        </SPage>
    }



}
