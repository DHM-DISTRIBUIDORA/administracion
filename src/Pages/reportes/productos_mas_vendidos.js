import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SHr, SInput, SLoad, SMath, SNavigation, SPage, STable2, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
import { Container } from '../../Components'
export default class index extends Component {
    state = {
    }
    getData({ fecha_inicio, fecha_fin }) {
        this.state.fecha = { fecha_inicio, fecha_fin };
        const request = {
            component: "tbprd",
            type: "getProductosVendidos",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            idemp: this.state.idemp
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
            rowHeight={24}
            cellStyle={{
                fontSize: 14
            }}
            header={[
                { key: "index", width: 30 },
                // { key: "idprd", width: 70 },÷
                { key: "prdcod", width: 70, label: "Código" },
                { key: "prdnom", width: 300, label: "Nombre producto" },
                { key: "cantidad", width: 100, cellStyle: { textAlign: "center" }, sumar: true, order: "desc" },
                { key: "monto", width: 100, cellStyle: { textAlign: "right" }, sumar: true, render: a => SMath.formatMoney(a), renderTotal: a => SMath.formatMoney(a) },
            ]}
            limit={50}
            data={this.state?.data} />
    }
    render() {
        return (
            <SPage title="Productos más vendidos" disableScroll>
                <Container>
                    <SelectEntreFechas fecha_inicio={this.state.fecha_inicio} fecha_fin={this.state.fecha_fin} onChange={e => this.getData(e)} />
                    <SInput  label="Vendedor" placeholder={"Todos los vendedores"} value={this?.state?.emp?.empnom} onPress={() => {
                        SNavigation.navigate("/tbemt/profile/tbemp", {
                            pk: 1, onSelect: (e) => {
                                this.state.emp = e;
                                this.state.data = null;
                                this.state.idemp = e.idemp
                                this.getData(this.state.fecha)
                                this.setState({ ...this.state })
                            }
                        })
                    }} />
                </Container>
                <SHr />
                <SView flex>
                    {this.getTable()}
                </SView>
            </SPage>
        )
    }
}