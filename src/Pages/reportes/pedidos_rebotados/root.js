import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SLoad, SMath, SNavigation, SPage, STable2, SText, STheme, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../../Components/Fechas'
import { Link } from '../../../Components'
export default class index extends Component {
    state = {
        fecha_inicio: SNavigation.getParam("fecha_inicio"),
        fecha_fin: SNavigation.getParam("fecha_fin"),
    }
    getData({ fecha_inicio, fecha_fin }) {
        this.setState({ fecha_inicio, fecha_fin })
        const request = {
            component: "reporte",
            type: "getPedidosRebotados",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            console.log(e)
            if (!e.data) return;
            e.data.map(a => {
                if (a.idemp == "118") {
                    console.log(e?.data_rebotados[a?.idemp + "_" + a?.idtransportista])
                }
                // a.entregado = e?.data_entrega_parcial[a?.idemp];
                // a.monto_diferencia = (a?.monto ?? 0) - (a?.entregado?.monto ?? 0)
                // a.cantidad_diferencia = (a?.cantidad ?? 0) - (a?.entregado?.cantidad ?? 0)
                a.rebotado = e?.data_rebotados[a?.idemp + "_" + a?.idtransportista];
            })

            this.setState({ data: e.data, loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })
    }

    getTable() {
        if (this.state.loading) return <SView col={"xs-12"} flex center>
            <SLoad />
            <SText>Esta consulta puede demorar un tiempo... </SText>
            <SText>Desde {this.state.fecha_inicio} hasta {this.state.fecha_fin}</SText>
        </SView>
        if (this.state.error) return <SView col={"xs-12"} flex center>
            <SText color={STheme.color.danger}>{JSON.stringify(this.state.error)}</SText>
        </SView>
        if (!this.state.data) return null
        const removeDecimal = a => parseFloat(a ?? 0).toFixed(0);
        return <STable2
            rowHeight={30}
            header={[
                { key: "index", width: 50 },
                { key: "idemp", label: "IDV", width: 35 },
                // { key: "empcod", width: 50 },
                { key: "empnom", label: "Vendedor", width: 200 },
                { key: "idtransportista", label: "IDT", width: 35 },
                { key: "transportista", width: 200, label: "Transportista" },
                // { key: "cantidad_ss", label: "App Servisofts", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                // { key: "cantidad_otros", label: "Otros", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "cantidad", label: "Pedidos", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight: "bold" } },
                { key: "rebotado/monto_pedidos", width: 60, label: "Monto pedidos", width: 70, sumar: true, renderTotal: a => parseFloat(a ?? 0).toFixed(2), render: a => parseFloat(!a ? 0 : a).toFixed(2), cellStyle: { textAlign: "right" } },
                // { key: "cantidad_app", label: "P. APP", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight: "bold" } },
                { key: "rebotado/cantidad", label: "Visitados", width: 70, render: (a) => a <= 0 ? "" : a, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight: "bold" } },
                { key: "rebotado/monto", width: 60, label: "Monto visitas", width: 70, sumar: true, renderTotal: a => parseFloat(a ?? 0).toFixed(2), render: a => parseFloat(!a ? 0 : a).toFixed(2), cellStyle: { textAlign: "right" } },
                { key: "rebotado/cantidad_entregados", label: "Entregados", render: (a) => a <= 0 ? "" : a, width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight: "bold" } },
                { key: "rebotado/monto_entregados", width: 60, label: "Monto Entregados", width: 70, sumar: true, renderTotal: a => parseFloat(a ?? 0).toFixed(2), render: a => parseFloat(!a ? 0 : a).toFixed(2), cellStyle: { textAlign: "right" } },
                { key: "rebotado/cantidad_entregados_parciales", label: "Entregados Parcial.", render: (a) => a <= 0 ? "" : a, width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight: "bold" } },
                { key: "rebotado/monto_entregados_parciales", width: 60, label: "Monto parciales", width: 70, sumar: true, renderTotal: a => parseFloat(a ?? 0).toFixed(2), render: a => parseFloat(!a ? 0 : a).toFixed(2), cellStyle: { textAlign: "right" } },
                { key: "rebotado/cantidad_rebotados", label: "Rebotados", width: 70, render: (a) => a <= 0 ? "" : a, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight: "bold" } },
                { key: "rebotado-calc", label: "Monto perdido", width: 70, render: (a) => parseFloat((a.monto_pedidos ?? 0) - (a.monto ?? 0)).toFixed(2), sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight: "bold" } },

                // { key: "monto", width: 60, label: "Monto pedido", width: 70, sumar: true, renderTotal: a => parseFloat(a).toFixed(2), render: a => parseFloat(a).toFixed(2), cellStyle: { textAlign: "right" } },

                // { key: "entregado/monto_entregados", width: 60, label: "Monto entregados", width: 70, sumar: true, renderTotal: a => parseFloat(a ?? 0).toFixed(2), render: a => parseFloat(!a ? 0 : a).toFixed(2), cellStyle: { textAlign: "right" } },
                // { key: "entregado/monto_entregados_parciales", width: 60, label: "Monto parcial", width: 70, sumar: true, renderTotal: a => parseFloat(a ?? 0).toFixed(2), render: a => parseFloat(!a ? 0 : a).toFixed(2), cellStyle: { textAlign: "right" } },
                // { key: "entregado/monto", width: 60, label: "Monto entregado", width: 70, sumar: true, renderTotal: a => parseFloat(a ?? 0).toFixed(2), render: a => parseFloat(!a ? 0 : a).toFixed(2), cellStyle: { textAlign: "right" } },
                // { key: "monto_diferencia", width: 60, label: "M. no entregado", width: 70, sumar: true, renderTotal: a => parseFloat(a).toFixed(2), render: a => parseFloat(a).toFixed(2), cellStyle: { textAlign: "right" } },
                // { key: "cantidad_producto", width: 60, label: "Cantidad Prd.", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                // { key: "fecha_primero", width: 130 },
                // { key: "fecha_ultimo", width: 130 },
                { key: "idemp-ver", width: 90, component: (a) => <Link onPress={() => { SNavigation.navigate("/admin/tbemp", { pk: a, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state.fecha_fin }) }} >{"Ver perfil"}</Link> },
                { key: "-verpedidos", width: 90, component: (a) => <Link onPress={() => { SNavigation.navigate("/reportes/pedidos_rebotados/pedidos", { idvendedor: a.idemp, idtransportista: a.idtransportista, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state.fecha_fin }) }} >{"Ver pedidos"}</Link> },

            ]}
            limit={50}
            data={this.state?.data} />
    }
    render() {
        return (
            <SPage title="Pedidos rebotados." disableScroll>
                <SelectEntreFechas fecha_inicio={this.state.fecha_inicio} fecha_fin={this.state.fecha_fin} onChange={e => this.getData(e)} />
                <SView flex>
                    {this.getTable()}
                </SView>
            </SPage>
        )
    }
}