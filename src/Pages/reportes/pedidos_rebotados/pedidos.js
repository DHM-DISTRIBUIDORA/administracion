import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SLoad, SMath, SNavigation, SPage, STable2, SText, STheme, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../../Components/Fechas'
import { Link } from '../../../Components'
export default class index extends Component {
    state = {
        fecha_inicio: SNavigation.getParam("fecha_inicio"),
        fecha_fin: SNavigation.getParam("fecha_fin"),
        idvendedor: SNavigation.getParam("idvendedor"),
        idtransportista: SNavigation.getParam("idtransportista"),
        // lincod: SNavigation.getParam("lincod")
    }
    getData({ fecha_inicio, fecha_fin }) {
        const request = {
            component: "reporte",
            type: "getPedidosRebotadosVendedor",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            // lincod: this.state.lincod,
            idvendedor: this.state.idvendedor,
            idtransportista: this.state.idtransportista
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            console.log(e);
            e.data.map(a => {
                // a.entregado = e?.data_entrega_parcial[a?.idemp];
                // a.monto_diferencia = (a?.monto ?? 0) - (a?.entregado?.monto ?? 0)
                // a.cantidad_diferencia = (a?.cantidad ?? 0) - (a?.entregado?.cantidad ?? 0)
                a.rebotado = e?.data_rebotados[a?.idven];
            })
            this.setState({ data: e.data, loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })
    }

    getTable() {
        if (!this.state.data) return null
        const removeDecimal = a => parseFloat(a ?? 0).toFixed(0);
        return <STable2
            rowHeight={30}
            header={[
                { key: "index", width: 50 },
                { key: "idven", width: 80 },
                {
                    key: "rebotado/tipo", width: 200, component: (a) => {
                        let color = STheme.color.text;
                        if (a == "ENTREGADO") {
                            color = STheme.color.success;
                        } else if (a == "ENTREGADO PARCIALMENTE") {
                            color = STheme.color.warning;
                        } else {
                            color = STheme.color.danger;
                        }
                        return <SText col={"xs-12"} row color={color} fontSize={12}>{a}</SText>
                    }
                },
                { key: "rebotado/monto", width: 60, label: "Monto", width: 70, sumar: true, render: (a) => parseFloat(a).toFixed(2) <= 0 ? "" : a, renderTotal: a => parseFloat(a).toFixed(2), cellStyle: { textAlign: "right" } },
                { key: "rebotado/descripcion", width: 120 },


                // { key: "vdoc", width: 80 },
                // { key: "vnum", width: 80 },
                { key: "clicod", width: 120 },
                { key: "clinom", width: 150 },
                // { key: "vfec", width: 150 },
                { key: "vobs", width: 250 },
                // { key: "cantidad", width: 60, label: "Cantidad P.", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                // { key: "monto", width: 60, label: "Monto", width: 70, sumar: true, renderTotal: a => parseFloat(a).toFixed(2), render: a => parseFloat(a).toFixed(2), cellStyle: { textAlign: "right" } },

                // { key: "cant", width: 50 },
                // { key: "monto", width: 50 },
                // { key: "clicod", width: 70 },
                // { key: "clinom", width: 200 },
                // // { key: "cantidad", width: 50 },
                // // { key: "monto", width: 200 },
                // { key: "monto", label: "Monto", width: 70, order: "desc", sumar: true, renderTotal: a => parseFloat(a).toFixed(2), render: a => parseFloat(a).toFixed(2), cellStyle: { textAlign: "center" } },
                // { key: "cant", label: "Cant. Productos", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },

                // // { key: "clientes", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                // // // { key: "cantidad_otros", label: "Otros", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                // // // { key: "cantidad", label: "Total", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight:"bold" } },
                // // // { key: "fecha_primero", width: 130 },
                // // { key: "fecha_ultimo", width: 130 },
                {
                    key: "-clientes", width: 130, component: (a) => <Link onPress={() => {
                        SNavigation.navigate("/tbcli/profile", {
                            pk: a.idcli,
                            fecha_inicio: this.state.fecha_inicio, fecha_fin: this.state.fecha_fin
                        })
                    }} >{"Ver perfil"}</Link>
                },
            ]}
            limit={50}
            data={this.state?.data} />
    }
    render() {
        return (
            <SPage title="Pedidos rebotados por vendedor" disableScroll>
                <SelectEntreFechas fecha_inicio={this.state.fecha_inicio} fecha_fin={this.state.fecha_fin} onChange={e => this.getData(e)} />
                <SView flex>
                    {this.getTable()}
                </SView>
            </SPage>
        )
    }
}