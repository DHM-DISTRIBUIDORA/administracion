import React, { Component } from 'react';
import { SPage, STable4, SThread } from 'servisofts-component';
import STable from "servisofts-table"
import SSocket from 'servisofts-socket'
// const data = require("./test.json")
export default class index extends Component {


    getData() {
        return new Promise((resolve, reject) => {
            console.log("Entro a la promoe")
            SSocket.sendHttpAsync("http://192.168.5.18:30018/api", {
                version: "2.0",
                cabecera: "registro_administrador",
                service: "usuario",
                component: "usuario",
                type: "getAll",
                // fecha_edit:"2023-07-25"

            }).then(e => {
                const data = e.data;
                const arr = Object.values(data);
                const keys = Object.keys(arr[0]);
                let arrData = arr.map(obj => keys.map(k => obj[k]));
                arrData.splice(0, 0, keys)
                resolve(arrData)
                resolve([])
            }).catch(e => {
                console.error(e);
            })


        })
    }
    render() {
        // return <STable4 data={[]}/>

        return <SPage title={"Table"} disableScroll>
            <STable
                loadData={this.getData()} />
        </SPage>
    }
}