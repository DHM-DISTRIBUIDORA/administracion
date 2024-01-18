import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SDate, SLoad, SMath, SNavigation, SPage, STable2, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
import { Link } from '../../Components'
import Model from '../../Model'
export default class index extends Component {
    state = {
        fecha_inicio: SNavigation.getParam("fecha_inicio"),
        fecha_fin: SNavigation.getParam("fecha_fin"),
        idemp: SNavigation.getParam("idemp"),
        empcod: SNavigation.getParam("empcod"),
    }
    getData({ fecha_inicio, fecha_fin }) {
        this.setState({ fecha_inicio, fecha_fin })
        const request = {
            component: "dm_cabfac",
            type: "getPedidosVendedorDetalle",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            idemp: this.state.idemp,
            empcod: this.state.empcod,
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
        const removeDecimal = a => parseFloat(a ?? 0).toFixed(0);
        return <STable2
            rowHeight={30}
            header={[
                { key: "index", width: 50 },
                { key: "vzona", width: 80 },
                { key: "clicod", width: 100 },
                { key: "nombrecliente", width: 200 },

                {
                    key: "-fecha", order: "asc", width: 120, render: a => {

                        let fecha = new SDate(a.vfec.substring(0, 10) + " " + a.vhora.substring(11, 19), "yyyy-MM-dd hh:mm:ss");
                        return fecha.toString();
                    }
                },
                // { key: "vhora", width: 200, render: a => a.substring(0, 10) },
                {
                    key: "-cliente", width: 80, component: (a) => <Link onPress={() => {

                        Model.tbcli.Action.getByCliCod(a.clicod).then(e => {
                            SNavigation.navigate("/tbcli/profile", {
                                pk: e.idcli,
                            })
                        }).catch(e => {
                            console.error(e);
                        })

                    }
                    } >{"Ver perfil"}</Link>
                },
            ]}
            limit={50}
            data={this.state?.data} />
    }
    render() {
        return (
            <SPage title="Pedidos por vendedores" disableScroll>
                <SelectEntreFechas fecha_inicio={this.state.fecha_inicio} fecha_fin={this.state.fecha_fin} onChange={e => this.getData(e)} />
                <SView flex>
                    {this.getTable()}
                </SView>
            </SPage>
        )
    }
}