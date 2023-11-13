import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SLoad, SMath, SNavigation, SPage, STable2, SText } from 'servisofts-component'
import Model from '../../Model'
import SSocket from 'servisofts-socket'
import DataBase from '../../DataBase'

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
        const ventas = await DataBase.ventas_factura.all();
        const tbprd = await DataBase.tbprd.all();
        let productos = {};

        for (let i = 0; i < ventas.length; i++) {
            let venta = ventas[i];
            let detalle = venta.detalle;
            for (let j = 0; j < detalle.length; j++) {
                let det = detalle[j];
                let producto = productos[det.idprd] ?? {};
                producto.idprd = det.idprd;
                producto.cantidad_vendido = (producto.cantidad_vendido ?? 0) + det.vdcan;
                producto.total_vendido = (producto.total_vendido ?? 0) + (det.vdpre * det.vdcan);
                productos[det.idprd] = producto;
            }
        }
        let arr = Object.values(productos).map((producto, index) => {
            let prd = tbprd.find(a => a.idprd == producto.idprd)
            producto.prdnom = prd?.prdnom
            producto.prdcod = prd?.prdcod
            return producto;
        })
        arr.sort((a, b) => a.prdcod.localeCompare(b.prdcod))
        this.setState({ data: arr })

        // const picklist = await SSocket.sendPromise2({
        //     component: "tbemp",
        //     type: "picklist2",
        //     idemp: this.state.idemp ?? user.idtransportista,
        //     fecha: this.state.fecha
        // })
        // this.setState({ data: picklist.data ?? [] })
    }

    renderTable() {
        if (!this.state.data) return <SLoad />
        console.log(this.state.data)
        return <STable2
            rowHeight={25}
            limit={50}
            cellStyle={{
                fontSize: 14,
            }}
            header={[
                { key: "index" },
                { key: "prdcod", width: 80 },
                { key: "prdnom", width: 300 },
                // { key: "cantidad_vendido-unid", label: "Unid.", width: 100, cellStyle: { textAlign: "right" } },
                // { key: "cantidad_vendido-cantp", label: "Cantidad Preventa", width: 100, cellStyle: { textAlign: "right" } },
                { key: "cantidad_vendido-cant", label: "C. Vendida", width: 60, cellStyle: { textAlign: "right" } },
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