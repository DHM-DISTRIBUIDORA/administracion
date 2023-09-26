import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SLoad, SMath, SPage, STable2, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
export default class index extends Component {
    state = {
    }
    getData({ fecha_inicio, fecha_fin }) {
        const request = {
            component: "tbprd",
            type: "getProductosVendidos",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            this.setState({ data: e.data, loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })
    }

    getTable() {
        if (!this.state.data) return null
        return <STable2
            header={[
                { key: "index", width: 50 },
                { key: "idprd", width: 70 },
                { key: "prdcod", width: 70 },
                { key: "prdnom", width: 300 },
                { key: "cantidad", width: 100, cellStyle: { textAlign: "end" }, sumar: true, order: "desc" },
                { key: "monto", width: 100, cellStyle: { textAlign: "end" }, sumar: true, render: a => SMath.formatMoney(a), renderTotal: a => SMath.formatMoney(a) },
            ]}
            limit={50}
            // rowHeight={30}
            data={this.state?.data} />
    }
    render() {
        return (
            <SPage title="Productos más vendidos" disableScroll>
                <SelectEntreFechas onChange={e => this.getData(e)} />
                <SView flex>
                    {this.getTable()}
                    {/* <SLoad type='window' hidden={!this.state?.loading} /> */}
                </SView>
            </SPage>
        )
    }
}