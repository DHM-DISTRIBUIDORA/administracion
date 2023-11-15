import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SPage, STable2 } from 'servisofts-component'
import SSocket from 'servisofts-socket'
export default class index extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        SSocket.sendHttpAsync(SSocket.api.root + "api", {
            component: "log",
            type: "getAll",
        }).then(e => {
            console.log(e);
            this.setState({ data: e.data })
        }).catch(e => {
            console.error(e);
        })
    }
    render() {
        return (
            <SPage>
                <STable2
                    header={[
                        { key: "index" },
                        { key: "tipo", width: 80 },
                        { key: "fecha_on", width: 180 },
                        { key: "descripcion", width: 200 },
                        { key: "data/route", width: 100 },
                        { key: "data/errorInfo", width: 100 },
                        { key: "data/error", width: 100 },
                        { key: "key_usuario", width: 100 },
                        { key: "key", width: 300, center: true },
                    ]}
                    data={this.state.data} />
            </SPage>
        )
    }
}