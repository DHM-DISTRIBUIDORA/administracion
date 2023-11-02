import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SLoad, SMath, SNavigation, SPage, SPopup, STable2, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
export default class index extends Component {
    componentDidMount() {
        // if (!SNavigation.getParam("idemp")) {
        //     SNavigation.goBack();
        //     SPopup.alert("Usted no tiene un idemp")
        // }
    }
    getData({ fecha_inicio, fecha_fin }) {

        const request = {
            // component: "tbcli",
            // type: "clientes_con_pedidos",
            component: "reporte",
            type: "getClienteConPedidos",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            // idemp: SNavigation.getParam("idemp")
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            this.setState({ data: e.data, loading: false })
            console.log(e);
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })
    }
    render() {
        return (
            <SPage title="Clientes con pedidos" disableScroll>
                <SelectEntreFechas onChange={e => this.getData(e)} />
                <SView flex>
                    <STable2
                        header={[
                            { key: "index" },
                            { key: "idcli", width: 70 },
                            { key: "clicod", width: 150 , label:"Código cliente"},
                            { key: "clinom", width: 300 , label:"Nombre cliente"},
                            { key: "cantidad", width: 100, cellStyle: { textAlign: "end" }, sumar: true, order: "desc" },
                            { key: "monto", width: 100, cellStyle: { textAlign: "end" }, sumar: true, render: a => SMath.formatMoney(a), renderTotal: a => SMath.formatMoney(a) },

                            // { key: "clilat", width: 150 },
                            // { key: "clilon", width: 150 },
                        ]}
                        limit={50}
                        rowHeight={30}
                        data={this.state?.data ?? {}} />
                    <SLoad type='window' hidden={!this.state?.loading} />
                </SView>
            </SPage>
        )
    }
}