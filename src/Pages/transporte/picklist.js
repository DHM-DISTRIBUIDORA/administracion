import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SLoad, SMath, SNavigation, SPage, STable2, SText } from 'servisofts-component'
import Model from '../../Model'
import SSocket from 'servisofts-socket'

export default class picklist extends Component {
    state = {
        data: null,
        fecha: SNavigation.getParam("fecha")
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
        this.setState({ data: picklist.data ?? [] })
    }

    renderTable() {
        if (!this.state.data) return <SLoad />
        console.log(this.state.data)
        return <STable2
            cellStyle={{
                fontSize: 14
            }}
            header={[
                { key: "index" },
                { key: "Codigo", width: 100 },
                { key: "Nombre Producto", width: 300 },
                { key: "Cjs.", width: 50, cellStyle: { textAlign: "right" } },
                { key: "Cantidad Vendida-", label: "Unid.", width: 100, cellStyle: { textAlign: "right" } },
                { key: "Cantidad Vendida-", label: "Cantidad Preventa", width: 100, cellStyle: { textAlign: "right" } },
                { key: "Cantidad Vendida", width: 100, cellStyle: { textAlign: "right" } },
                { key: "Diferencia Devolucion", width: 100, cellStyle: { textAlign: "right" } },
                { key: "-precio", label: "Precio de Venta", width: 100, cellStyle: { textAlign: "right" }, render: (a) => SMath.formatMoney((a["Total Vendido Bs."] ?? 0) / (a["Cantidad Vendida"] ?? 0)) },
                { key: "Total Vendido Bs.", width: 100, sumar: true, cellStyle: { textAlign: "right" }, render: (a) => SMath.formatMoney(a) },
                { key: "Diferencia Bs.", width: 100, cellStyle: { textAlign: "right" }, },

            ]} data={this.state.data} />
    }
    render() {
        return (
            <SPage title={"Pick List " + this.state.fecha}>
                {this.renderTable()}
            </SPage>
        )
    }
}