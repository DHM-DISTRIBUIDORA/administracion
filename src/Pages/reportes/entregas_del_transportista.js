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
            component: "dhm",
            type: "getEntregasTransportista",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
        }
        this.setState({ loading: true })
        console.log("enviando")
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            console.log(e);
            e.pedidos.map(a => {
                a.visita = e.visitas[a.idemp];
            })
            this.setState({ data: e.pedidos, loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })
    }

    getTable() {
        if (!this.state.data) return null
        console.log("this.state.fecha_inicio")
        console.log(this.state.fecha_inicio)
        const removeDecimal = (a) => parseFloat(a ?? 0).toFixed(0);
        return <STable2
            rowHeight={30}
            header={[
                { key: "index", width: 50 },
                { key: "idemp", width: 50 },
                { key: "empcod", width: 50 },
                { key: "empnom", width: 200 },
                { key: "total_pedidos", label: "Pedidos asignados", width: 90, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "cantidad_productos", label: "Productos asignados", width: 90, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "monto_productos", label: "Monto asignado", width: 90, sumar: true, render: a => parseFloat(a).toFixed(2), renderTotal: removeDecimal, cellStyle: { textAlign: "right" } },
                { key: "visita/visitas", label: "Visitas realizadas", width: 90, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "visita/visitas_exitosas", label: "Visitas exitosas", width: 90, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "visita/visitas_fallidas", label: "Visitas fallidas", width: 90, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                { key: "visita/monto_visitas_exitosas", label: "Monto exitoso", width: 90, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "right" } },

                // { key: "cantidad_ss", label: "App Servisofts", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                // { key: "cantidad_otros", label: "Otros", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center" } },
                // { key: "cantidad", label: "Total", width: 70, sumar: true, renderTotal: removeDecimal, cellStyle: { textAlign: "center", fontWeight:"bold" } },
                // { key: "fecha_primero", width: 130 },
                // { key: "fecha_ultimo", width: 130 },
                { key: "idemp-ver", width: 70, component: (a) => <Link onPress={() => { SNavigation.navigate("/admin/tbemp", { pk: a, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state.fecha_fin }) }} >{"Ver perfil"}</Link> },
            ]}
            limit={50}
            data={this.state?.data} />
    }
    render() {
        return (
            <SPage title="Entregas del transportista" disableScroll>
                <SelectEntreFechas
                    // fecha_inicio={"2023-12-12"}
                    // fecha_fin={"2023-12-12"}
                    onChange={e => this.getData(e)} />
                <SView flex>
                    {this.getTable()}
                </SView>
            </SPage>
        )
    }
}