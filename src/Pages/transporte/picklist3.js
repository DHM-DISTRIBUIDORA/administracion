import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SLoad, SMath, SNavigation, SPage, STable2, SText } from 'servisofts-component'
import Model from '../../Model'
import SSocket from 'servisofts-socket'

export default class picklist extends Component {
    state = {
        data: null,
        fecha: SNavigation.getParam("fecha"),
        idemp: SNavigation.getParam("idemp")
    }
    componentDidMount() {
        this.loadData()
    }

    async loadData() {
        const user = Model.usuario.Action.getUsuarioLog();
        const picklist = await SSocket.sendPromise2({
            component: "tbemp",
            type: "picklist2",
            idemp: this.state.idemp ?? user.idtransportista,
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
                { key: "prdcod", width: 100 },
                { key: "prdnom", width: 300 },
                // { key: "cantidad_vendido-unid", label: "Unid.", width: 100, cellStyle: { textAlign: "right" } },
                // { key: "cantidad_vendido-cantp", label: "Cantidad Preventa", width: 100, cellStyle: { textAlign: "right" } },
                { key: "cantidad_vendido-cant", label: "Cantidad Vendida", width: 100, cellStyle: { textAlign: "right" } },
                // { key: "-dif", label: "Diferencia Devolucion", width: 100, cellStyle: { textAlign: "right" }, render: a => 0 },
                { key: "-precio", label: "Precio de Venta", width: 100, cellStyle: { textAlign: "right" }, render: (a) => SMath.formatMoney((a.total_vendido ?? 0) / (a.cantidad_vendido ?? 0)) },
                { key: "total_vendido", label: "Total Vendido Bs.", width: 100, sumar: true, cellStyle: { textAlign: "right" }, render: (a) => SMath.formatMoney(a) },

            ]} data={this.state.data} />
    }
    render() {
        return (
            <SPage title={"Pick List " + this.state.fecha} disableScroll>
                {this.renderTable()}
            </SPage>
        )
    }
}