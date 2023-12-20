import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SLoad, SMath, SNavigation, SPage, STable2, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../../Components/Fechas'
import { Link } from '../../../Components'
export default class index extends Component {
    state = {
        fecha_inicio: SNavigation.getParam("fecha_inicio"),
        fecha_fin: SNavigation.getParam("fecha_fin"),
        empcod: SNavigation.getParam("empcod"),
    }
    getData({ fecha_inicio, fecha_fin }) {
        const request = {
            component: "dhm",
            type: "getPedidosProveedor",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            empcod: this.state.empcod
        }
        this.setState({ loading: true, fecha_inicio: fecha_inicio, fecha_fin: fecha_fin })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            console.log(e);
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
                // { key: "idemp", width: 50 },
                { key: "lincod", width: 50 },
                { key: "linnom", width: 200 },
                { key: "montos", label: "Monto", width: 70, order: "desc", render: a => SMath.formatMoney(a), sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "productos", label: "Cant. Productos", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "clientes", width: 70, cellStyle: { textAlign: "center" } },
                // { key: "cantidad_otros", label: "Otros", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                // { key: "cantidad", label: "Total", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight:"bold" } },
                // { key: "fecha_primero", width: 130 },
                // { key: "fecha_ultimo", width: 130 },
                {
                    key: "-productos", width: 100, component: (a) => <Link onPress={() => {
                        SNavigation.navigate("/reportes/pedidos_por_proveedor/productos", {
                            lincod: a.lincod,
                            fecha_inicio: this.state.fecha_inicio,
                            fecha_fin: this.state.fecha_fin,
                            empcod: this.state.empcod

                        })
                    }
                    } >{"Ver productos"}</Link>
                },
                {
                    key: "-clientes", width: 100, component: (a) => <Link onPress={() => {
                        SNavigation.navigate("/reportes/pedidos_por_proveedor/clientes", {
                            lincod: a.lincod,
                            fecha_inicio: this.state.fecha_inicio,
                            fecha_fin: this.state.fecha_fin,
                            empcod: this.state.empcod


                        })
                    }
                    } >{"Ver clientes"}</Link>
                },

            ]}
            limit={50}
            data={this.state?.data} />
    }
    render() {
        return (
            <SPage title="Pedidos por proveedor" disableScroll>
                <SelectEntreFechas fecha_inicio={this.state.fecha_inicio} fecha_fin={this.state.fecha_fin} onChange={e => this.getData(e)} />
                <SView flex>
                    {this.getTable()}
                </SView>
            </SPage>
        )
    }
}