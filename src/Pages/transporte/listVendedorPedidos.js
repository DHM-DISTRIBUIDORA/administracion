import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SButtom, SLoad, SMath, SNavigation, SPage, STable2, SText, STheme, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
import { Link } from '../../Components'
import SList from 'servisofts-component/Component/SList2'
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.idemp = SNavigation.getParam("pk")
        this.fecha_ini_ = SNavigation.getParam("fecha_inicio");
        this.fecha_fin_ = SNavigation.getParam("fecha_fin");
        this.index = SNavigation.getParam("index");
    }
    // state = {
    // }

    getData({ fecha_inicio, fecha_fin }) {
        this.setState({ fecha_inicio, fecha_fin })
        console.log("idemppppp")
        console.log(this.idemp)
        const request = {
            component: "tbemp",
            type: "getVentasFactura",
            idemp: this.idemp,
            fecha: this.fecha_ini_,
            // fecha_fin: fecha_fin,
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

    agruparVendedores(data) {
        let vendedores = {};
        // data= data[this.index]
        data.filter(e => e.empnom == this.index).map(e => {
            if (!vendedores[e.empnom]) vendedores[e.empnom] = [];

            vendedores[e.empnom].push(e);

        })

        // data.map(e => {
        //     if (!vendedores[e.empnom]) vendedores[e.empnom] = [];

        //     vendedores[e.empnom].push(e);

        // })
        return vendedores;
    }

    // agruparVendedores(data) {
    //     let vendedores = {};
    //     data.map(e => {
    //         if (!vendedores[e.empnom]) vendedores[e.empnom] = {};

    //         vendedores.nombre = e.empnom;
    //         vendedores.detalle = e;

    //     })
    //     return vendedores;
    // }

    getTable() {
        // this.getData({ fecha_inicio: this.fecha_ini_, fecha_fin: this.fecha_fin_ })
    

        if (!this.state.data) return null
        this.state.data = this.agruparVendedores(this.state.data);
        console.log("this.state.dataaaaaaaa")
        console.log(this.state.data)
        console.log(Object.keys(this.state.data))
        console.log("this.state.fecha_inicio")
        console.log(this.state.fecha_inicio)
        const removeDecimal = a => parseFloat(a ?? 0).toFixed(0);
        let arrayDato = this.state.data[this.index]
        console.log("arrayDato")
        console.log(arrayDato)

        return <SList
            initSpace={8}
            flex
            data={arrayDato}
            // filter={(a) => a.idlinea == this.params.pk}
            // order={[{ key: "prdnom", order: "asc" }]}
            // limit={10}
            buscador={true}
            render={(obj) => {
                return <>
                    <SView col={"xs-12"} row center>
                        <SView col={"xs-5"} center card>
                            <SView col={"xs-12"} row>
                                <SText fontSize={12} bold>Cliente: </SText>
                                <SText fontSize={12}>{obj.clinom}</SText>
                            </SView>
                            <SView col={"xs-12"} row>
                                <SText fontSize={12} bold>Teléfono: </SText>
                                <SText fontSize={12}>{obj.clitel}</SText>
                            </SView>
                        </SView>
                        <SView col={"xs-5"} center card>
                            <SView col={"xs-12"} row>
                                <SText fontSize={12} bold>Nit: </SText>
                                <SText fontSize={12}>{obj.vnit}</SText>
                            </SView>
                            <SView col={"xs-12"} row>
                                <SText fontSize={12} bold>Monto: </SText>
                                <SText fontSize={12}>Bs. {SMath.formatMoney(obj.contado)}</SText>
                            </SView>
                        </SView>
                        {/* <SView col={"xs-5"} center>
                            <SButtom type='primary' styleText={{ color: STheme.color.text }}
                                onPress={() => {
                                    SNavigation.navigate("/transporte/listVendedorPedidos", {
                                        pk: this.pk
                                    })
                                }}>VER PEDIDOS</SButtom>
                        </SView> */}
                    </SView>
                </>
            }}
        />
    }
    render() {
        console.log("this.state.fecha_ini_")
        console.log(this.fecha_ini_)
        return (
            <SPage title="Pedidos por vendedores" >
                <SelectEntreFechas fecha_inicio={this.fecha_ini_} onChange={e => this.getData(e)} />
                {this.state.loading ? <SLoad /> : ""}
                <SView flex>
                    {this.getTable()}
                </SView>
            </SPage>
        )
    }
}