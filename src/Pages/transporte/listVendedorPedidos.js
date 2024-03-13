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
        this.idemp = SNavigation.getParam("idemp")
        this.idtrans = SNavigation.getParam("idtrans")
        this.fecha = SNavigation.getParam("fecha");
        this.index = SNavigation.getParam("index");
    }
    // state = {
    // }

    getData({ fecha }) {
        this.setState({ fecha })
        if (!this.http) {
            DataBase.ventas_factura.filtered(`idemp == ${this.idemp}`).then(e => {
                let ventas = e;
                for (let i = 0; i < ventas.length; i++) {
                    let venta = ventas[i];
                    let detalle = venta.detalle;
                    for (let j = 0; j < detalle.length; j++) {
                        let det = detalle[j];
                        if (!venta.total) venta.total = 0;
                        if (!venta.cantidad_productos) venta.cantidad_productos = 0;
                        venta.total += det.vdcan * det.vdpre
                        venta.cantidad_productos += det.vdcan
                        // producto.idprd = det.idprd;
                        // producto.cantidad_vendido = (producto.cantidad_vendido ?? 0) + det.vdcan;
                        // producto.total_vendido = (producto.total_vendido ?? 0) + (det.vdpre * det.vdcan);
                        // productos[det.idprd] = producto;
                    }
                }
                this.setState({ data: e, loading: false })
            })
        } else {

            // console.log(this.idemp)
            const request = {
                component: "tbemp",
                type: "getVentasFactura",
                idemp: this.idtrans,
                fecha: fecha,
                // fecha_fin: fecha_fin,
            }
            this.setState({ loading: true })
            SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
                console.log(e);
                let ventas = e.data.filter(v => v.idemp == this.idemp);

                for (let i = 0; i < ventas.length; i++) {
                    let venta = ventas[i];
                    venta.detalle = e.detalle.filter(vd => vd.idven == venta.idven)
                    let detalle = venta.detalle;
                    for (let j = 0; j < detalle.length; j++) {
                        let det = detalle[j];
                        if (!venta.total) venta.total = 0;
                        if (!venta.cantidad_productos) venta.cantidad_productos = 0;
                        venta.total += det.vdcan * det.vdpre
                        venta.cantidad_productos += det.vdcan
                        // producto.idprd = det.idprd;
                        // producto.cantidad_vendido = (producto.cantidad_vendido ?? 0) + det.vdcan;
                        // producto.total_vendido = (producto.total_vendido ?? 0) + (det.vdpre * det.vdcan);
                        // productos[det.idprd] = producto;
                    }
                }
                this.setState({ data: ventas, loading: false })
            }).catch(e => {
                this.setState({ loading: false, error: e?.error })
                console.error(e);
            })
        }

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
        // this.state.data = this.agruparVendedores(this.state.data);
        // console.log("this.state.dataaaaaaaa")
        // console.log(this.state.data)
        // console.log(Object.keys(this.state.data))
        // console.log("this.state.fecha_inicio")
        // console.log(this.state.fecha_inicio)
        // const removeDecimal = a => parseFloat(a ?? 0).toFixed(0);
        // let arrayDato = this.state.data[this.index]
        // console.log("arrayDato")
        // console.log(arrayDato)

        return <SList
            initSpace={8}
            flex
            data={this.state.data}
            // filter={(a) => a.idlinea == this.params.pk}
            // order={[{ key: "prdnom", order: "asc" }]}
            // limit={10}
            buscador={true}
            render={(obj) => {
                return <>
                    <SView col={"xs-12"} center onPress={() => {
                        if (this.http) return;
                        SNavigation.navigate("/transporte/pedidoDetalle", {
                            idven: obj.idven,
                            pk: obj.idcli,
                            visitaType: "transporte"
                        })
                    }}>
                        <SView col={"xs-12"} center card>
                            <SView col={"xs-12"} row>
                                <SText fontSize={12} bold>Cliente: </SText>
                                <SText fontSize={12}>{obj.clinom}</SText>
                            </SView>
                            <SView col={"xs-12"} row>
                                <SText fontSize={12} bold>Teléfono: </SText>
                                <SText fontSize={12}>{obj.clitel}</SText>
                            </SView>
                        </SView>
                        <SView col={"xs-12"} center card>
                            <SView col={"xs-12"} row>
                                <SText fontSize={12} bold>Nit: </SText>
                                <SText fontSize={12}>{obj.vnit}</SText>
                            </SView>
                            <SView col={"xs-12"} row>
                                <SText fontSize={12} bold>Monto: </SText>
                                <SText fontSize={12}>Bs. {SMath.formatMoney(obj?.total)}</SText>
                            </SView>
                        </SView>
                        {/* <SText col={"xs-12"}>{JSON.stringify(obj.detalle)}</SText> */}
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
        return (
            <SPage title="Pedidos por vendedores" >
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