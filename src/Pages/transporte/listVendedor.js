import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SButtom, SLoad, SMath, SNavigation, SPage, STable2, SText, STheme, SView } from 'servisofts-component'
import { SelectEntreFechas, SelectFecha } from '../../Components/Fechas'
import { Container, Link } from '../../Components'
import SList from 'servisofts-component/Component/SList2'
import DataBase from '../../DataBase'
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.http = SNavigation.getParam("http")
        this.idemp = SNavigation.getParam("pk")
        this.fecha = SNavigation.getParam("fecha");
        this.fecha_ini_ = SNavigation.getParam("fecha_inicio", this.fecha);
        this.fecha_fin_ = SNavigation.getParam("fecha_fin", this.fecha);
    }
    // state = {
    // }

    getData({ fecha }) {
        this.setState({ fecha })
        if (!this.http) {
            DataBase.ventas_factura.all().then(e => {
                this.setState({ data: e, loading: false })
            })
        } else {
            const request = {
                component: "tbemp",
                type: "getVentasFactura",
                idemp: this.idemp,
                fecha: fecha,
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


        // console.log("idemppppp")
        // console.log(this.idemp)

    }

    agruparVendedores(data) {
        let vendedores = {};
        data.map(e => {
            if (!vendedores[e.idemp]) vendedores[e.idemp] = {
                idemp: e.idemp,
                empnom: e.empnom,
                pedidos: []
            };

            vendedores[e.idemp].pedidos.push(e);

        })
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
        if (!this.state.data) return null
        let data = this.agruparVendedores(this.state.data);
        // console.log("this.state.dataaaaaaaa")
        // console.log(this.state.data)
        // console.log(Object.keys(this.state.data))
        // console.log("this.state.fecha_inicio")
        // console.log(this.state.fecha_inicio)
        // const removeDecimal = a => parseFloat(a ?? 0).toFixed(0);
        // console.log(this.state.data);
        return <SList
            initSpace={8}
            flex
            data={data}
            // filter={(a) => a.idlinea == this.params.pk}
            // order={[{ key: "prdnom", order: "asc" }]}
            // limit={10}
            buscador={true}
            render={(obj, key) => {
                return <>
                    <SView col={"xs-12"} row height={50} center card>
                        <SView flex >
                            <SText fontSize={12}>{obj.empnom}</SText>
                            <SText fontSize={12}># de pedidos: {obj.pedidos.length}</SText>
                        </SView>
                        <SButtom type='primary' styleText={{ color: STheme.color.text }}
                            onPress={() => {
                                SNavigation.navigate("/transporte/listVendedorPedidos", {
                                    idtrans: this.idemp, idemp: obj.idemp, fecha: this.state.fecha, index: key, http: this.http
                                })
                            }}>VER PEDIDOS</SButtom>
                    </SView>
                </>
            }}
        />
    }
    render() {
        return (
            <SPage title="Pedidos por vendedores" disableScroll>
                {/* <SelectEntreFechas onChange={e => this.getData(e)} /> */}
                <Container>
                    <SelectFecha fecha={this.fecha} onChange={e => this.getData(e)} />
                    {this.state.loading ? <SLoad /> : ""}
                    <SView col={"xs-12"}>
                        {this.getTable()}
                    </SView>
                </Container>
            </SPage>
        )
    }
}