import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SLoad, SPage, STable2, SText } from 'servisofts-component'
import Model from '../../Model'
import SSocket from 'servisofts-socket'

export default class picklist extends Component {
    state = {
        data: null,
        fecha:"2023-10-24"
    }
    componentDidMount() {
        this.loadData()
    }

    async loadData() {
        const user = Model.usuario.Action.getUsuarioLog();
        const picklist = await SSocket.sendPromise2({
            component: "tbemp",
            type: "picklist",
            idemp: user.idtransportista,
            fecha: this.state.fecha
        })
        this.setState({ data: picklist.data })
    }

    renderTable() {
        if (!this.state.data) return <SLoad />
        console.log(this.state.data)
        return <STable2 header={[
            { key: "index" },
            { key: "Codigo", width: 100 },
            { key: "Nombre Producto", width: 300 },
            { key: "Cjs.", width: 50 },
            { key: "Unid.", width: 50 },
            { key: "Cantidad Preventa", width: 100 },
            { key: "Cantidad Vendida", width: 100 },
            { key: "Diferencia Devolucion", width: 100 },
            { key: "Precio de Venta", width: 100 },
            { key: "Total Vendido Bs.", width: 100 },
            { key: "Diferencia Bs.", width: 100 },

        ]} data={this.state.data} />
    }
    render() {
        return (
            <SPage title={"Pick List"}>
                {this.renderTable()}
            </SPage>
        )
    }
}