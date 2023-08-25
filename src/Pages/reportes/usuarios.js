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
            version: "2.0",
            cabecera: "usuario_app",
            service: "usuario",
            component: "usuario",
            type: "getAll",
            // fecha_edit:"2023-07-25"

        }).then(e => {
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
                        { key: "CI", width: 100 },
                        { key: "Nombres", width: 100 },
                        { key: "Apellidos", width: 100 },
                        { key: "Correo", width: 150 },
                        { key: "Telefono", width: 100 },
                        { key: "Fecha nacimiento", width: 100 },
                        { key: "idvendedor", width: 100 },
                        { key: "idtransportista", width: 100 },
                        { key: "key", width: 300, center: true },

                    ]}
                    data={this.state.data} />
            </SPage>
        )
    }
}