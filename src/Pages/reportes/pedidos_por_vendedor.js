import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SLoad, SMath, SNavigation, SPage, STable2, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
import { Link } from '../../Components'
export default class index extends Component {
    state = {
    }
    getData({ fecha_inicio, fecha_fin }) {
        this.setState({ fecha_inicio, fecha_fin })
        const request = {
            component: "dm_cabfac",
            type: "getPedidosVendedor",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
        }
        this.setState({ loading: true })
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
        console.log("this.state.fecha_inicio")
        console.log(this.state.fecha_inicio)
        const removeDecimal = a => parseFloat(a ?? 0).toFixed(0);
        return <STable2
            rowHeight={30}
            header={[
                { key: "index", width: 50 },
                { key: "idemp", width: 50 },
                { key: "empcod", width: 50 },
                { key: "empnom", width: 200 },
                { key: "cantidad_ss", label: "App Servisofts", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "cantidad_otros", label: "Otros", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "cantidad", label: "Total", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight: "bold" } },
                { key: "monto", label: "Monto", width: 70, render: a => SMath.formatMoney(a), sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "fecha_primero", width: 130 },
                { key: "fecha_ultimo", width: 130 },
                { key: "idemp-ver", width: 130, component: (a) => <Link onPress={() => { SNavigation.navigate("/admin/tbemp", { pk: a, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state.fecha_fin }) }} >{"Ver perfil"}</Link> },
                {
                    key: "-pedidos", width: 100, component: (a) => <Link onPress={() => {
                        SNavigation.navigate("/reportes/pedidos_por_vendedor_detalle", {
                            idemp: a.idemp,
                            empcod: a.empcod,
                            fecha_inicio: this.state.fecha_inicio,
                            fecha_fin: this.state.fecha_fin,
                            // empcod: this.state.empcod

                        })
                    }
                    } >{"Ver pedidos"}</Link>
                },
            ]}
            limit={50}
            data={this.state?.data} />
    }
    render() {
        return (
            <SPage title="Pedidos por vendedores" disableScroll>
                <SelectEntreFechas onChange={e => this.getData(e)} />
                <SView flex>
                    {this.getTable()}
                </SView>
            </SPage>
        )
    }
}