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
                <SelectEntreFechas
                    fecha_inicio={"2023-12-18"}
                    onChange={e => this.getData(e)} />
                <SView flex>
                    <STable2
                        header={[
                            { key: "index" },
                            { key: "lincod", width: 150 },
                            { key: "linnom", width: 150 },
                            { key: "prdcod", width: 150 },
                            { key: "prdnom", width: 150 },
                            { key: "empcod", width: 150 },
                            { key: "empnom", width: 300 },
                            { key: "clicod", width: 150, label: "Código cliente" },
                            { key: "clinom", width: 180, label: "Nombre cliente" },
                            { key: "clilat", width: 100, },
                            { key: "clilon", width: 100, },
                            { key: "pedidolat", width: 100, },
                            { key: "pedidolon", width: 100, },
                            { key: "vfec", width: 100, render: a => (a + "").substring(0, 10) },
                            { key: "vhora", width: 100, render: a => (a + "").substring(11, 19) },
                            // {key: "cantidad", width: 100, cellStyle: {textAlign: "end" }, sumar: true, order: "desc" },
                            // {key: "monto", width: 100, cellStyle: {textAlign: "end" }, sumar: true, render: a => SMath.formatMoney(a), renderTotal: a => SMath.formatMoney(a) },

                            // {key: "clilat", width: 150 },
                            // {key: "clilon", width: 150 },
                        ]}
                        limit={50}
                        rowHeight={30}
                        data={this.state?.data ?? {}} />
                    {/* <SLoad type='window' hidden={!this.state?.loading} /> */}
                </SView>
            </SPage>
        )
    }
}