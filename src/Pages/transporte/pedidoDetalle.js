import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { SBuscador, SDate, SHr, SInput, SList, SList2, SLoad, SMapView, SMath, SNavigation, SPage, SPopup, SText, STheme, SView,SUuid } from 'servisofts-component'
import Model from '../../Model'
import SSocket from 'servisofts-socket'
import DataBase from '../../DataBase'
import { Btn, Container, PButtom3 } from '../../Components';

class pedidoDetalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curdate: new SDate(),
            idemp: SNavigation.getParam("idemp"),
            fecha: SNavigation.getParam("fecha"),
        }
        this.idven = SNavigation.getParam("idven");
        this.visita = SNavigation.getParam("visita", false);
        this.visitaType = SNavigation.getParam("visitaType", false);
        this.idemp = SNavigation.getParam("idemp", 0);
        this.tbvd = SNavigation.getParam("tbvd", 0);
    }
    componentDidMount() {
        //TODO: NO RECARGA EL DETALLE AL EDITAR
        // DataBase.ventas_factura.all
        // DataBase.dm_cabfac.
        DataBase.ventas_factura.objectForPrimaryKey(parseInt(this.idven)).then((e) => {
            this.setState({ data: e })
            // console.log(e)
        })
    }
    item() {
        if (!this.state?.data) return <SLoad />
        return <>
            <SView col={"xs-12"} row >
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold  >FECHA: </SText>
                    <SText font={'AcherusGrotesque-Regular'} fontSize={14} color={STheme.color.gray}>{new SDate(this.state?.data?.vfec, "yyyy-MM-dd hh:mm:ss.s").toString("DAY, dd de MON del yyyy")} a las {new SDate(this.state?.data?.vhora, "yyyy-MM-dd hh:mm:ss.s").toString("hh:mm:ss")}</SText>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >NIT/CI: </SText>
                    <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.nit}</SText>
                </SView>
            </SView>
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold >NOMBRE: </SText>
                    <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.nombrecliente}</SText>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >ID CLIENTE: </SText>
                    <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.clicod}</SText>
                </SView>
            </SView>
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SView width={70} style={{ alignItems: "flex-start" }} row>
                        <SText fontSize={14} bold >DETALLE: </SText>
                    </SView>
                    <SView col={"xs-9"} style={{ alignItems: "baseline" }} >
                        <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.vobs}</SText>
                    </SView>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14}   >ID VENTA: </SText>
                    <SText color={STheme.color.gray} font={'AcherusGrotesque-Regular'} >{this.state?.data?.idven}</SText>
                </SView>
            </SView>
        </>
    }

    cabeceraVenta() {
        return <>
            <SView col={"xs-12"} row center
                height={36}
                backgroundColor={STheme.color.card}
                style={{
                    padding: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5
                }}
            >
                <SView col={"xs-1.5"} center>
                    <SText fontSize={12}>CANT</SText>
                </SView>
                <SView col={"xs-5.5"} center>
                    <SText fontSize={12}>DETALLE</SText>
                </SView>
                <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                    <SText fontSize={12}>PRECIO</SText>
                </SView>
                <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                    <SText fontSize={12}>SUBTOTAL</SText>
                </SView>
            </SView>
            <SView col={"xs-12"} style={{ borderColor: STheme.color.gray, borderBottomWidth: 1 }} />
        </>

    }

    detalle() {
        if (!this.state?.data) return <SLoad />
        const { detalle } = this.state.data;
        const productos = Model.tbprd.Action.getAll();
        let total = 0;
        if (!detalle) return <SLoad />
        if (!productos) return <SLoad />
        Object.keys(detalle).map((key, index) => {
            total += detalle[key].vdpre * detalle[key].vdcan;
        });
        return <>
            <SList2
                initSpace={8}
                data={detalle}
                order={[{ key: "prdnom", order: "asc" }]}
                render={(vd) => {
                    const producto = Object.values(productos).find(a => a.prdcod == vd.prdcod)
                    return <SView col={"xs-12"} row >
                        <SView col={"xs-1.5"} center>
                            <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{vd?.vdcan}</SText>
                        </SView>
                        <SView col={"xs-5.5"}>
                            <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{producto?.prdnom}</SText>
                        </SView>
                        <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                            <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{SMath.formatMoney(vd?.vdpre)} </SText>
                        </SView>
                        <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                            <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{SMath.formatMoney(vd?.vdpre * vd?.vdcan)}</SText>
                        </SView>
                    </SView>
                }
                }
            />
            <SHr />
            <SView col={"xs-12"} style={{ borderColor: STheme.color.gray, borderBottomWidth: 1 }} />
            <SView col={"xs-12"} style={{ alignItems: "flex-end", }} height={36} >
                <SHr />
                <SText font={'AcherusGrotesque-Regular'} fontSize={15} color={STheme.color.text}  >{`Bs. ${total}`}</SText>
            </SView>
        </>
    }

    visitaRegistro({ descripcion, tipo, monto }) {
        this.setState({ loading: true })
        let data = {
            sync_type: "insert",
            key: SUuid(),
            key_usuario: Model.usuario.Action.getKey(),

            idcli: this.pk,
            descripcion: descripcion,
            tipo: tipo,
            monto: monto,
            fecha: new SDate().toString("yyyy-MM-dd"),
        }

        if (this.visitaType == "transporte") {
            data.idemp = Model.usuario.Action.getUsuarioLog()?.idtransportista;
            DataBase.visita_transportista.insert(data).then(e => {
                this.setState({ loading: false })
                SNavigation.goBack();

            }).catch(e => {
                console.error(e)
                this.setState({ loading: false })
            })
        } else {
            data.idemp = Model.usuario.Action.getUsuarioLog()?.idvendedor;
            DataBase.visita_vendedor.insert(data).then(e => {
                this.setState({ loading: false })
                SNavigation.goBack();

            }).catch(e => {
                console.error(e)
                this.setState({ loading: false })
            })
        }

        // return;
        // SSocket.sendPromise({
        //     component: this.visitaType == "transporte" ? "visita_transportista" : "visita_vendedor",
        //     type: "registro",
        //     estado: "cargando",
        //     key_usuario: Model.usuario.Action.getKey(),
        //     data: {
        //         idemp: this.idemp,
        //         idcli: this.pk,
        //         descripcion: descripcion,
        //         tipo: tipo,
        //         monto: monto,
        //         fecha: new SDate().toString("yyyy-MM-dd")
        //     }
        // }).then(e => {
        //     // state.visitas[o.idcli] = e.data;
        //     this.setState({ loading: false })
        //     SNavigation.goBack();

        // }).catch(e => {
        //     console.error(e)
        //     this.setState({ loading: false })
        // })
    }

    render() {
        return <SPage title={"Detalle Pedido"}>
            <Container>
                <SView col={"xs-12"} center row >
                    {this.item()}
                    <SHr h={20} />
                    {this.cabeceraVenta()}
                    {this.detalle()}
                </SView>
                <SHr height={20} />
                <SView col={"xs-12"} center row>
                    <SView col={"xs-5.5"} center>
                        <PButtom3 colorBg={STheme.color.danger} onPress={() => {
                            SPopup.openContainer({
                                key: "popup_concretar_visita_no",
                                render: (e) => {

                                    let opts = []
                                    if (this.visitaType == "transporte") {
                                        opts = ["NO TIENE DINERO", "NO ESTÁN LOS ENCARGADOS", "CERRADO", "PEDIDO MAL GENERADO"]
                                    }
                                    return <SView col={"xs-12"} padding={8} center>
                                        <SHr />
                                        <SText fontSize={20} center>Cuéntanos, ¿cómo te fue en la visita?</SText>
                                        <SHr />
                                        <SHr />
                                        <SInput type={"select"} ref={ref => this.visita_tipo = ref} defaultValue={opts[0]} options={opts} />
                                        <SHr />
                                        <SInput ref={ref => this.visita_descripcion = ref} type={"textArea"} placeholder={"Razón o motivo"} />
                                        <SHr />
                                        <Btn padding={8} onPress={() => {
                                            this.visitaRegistro({
                                                descripcion: (this.visita_descripcion?.getValue()) ? this.visita_descripcion?.getValue() : "",
                                                tipo: this.visita_tipo.getValue(),
                                                // monto: monto
                                            })
                                            SPopup.close("popup_concretar_visita_no");
                                        }}>CONFIRMAR</Btn>
                                        <SHr />
                                    </SView>
                                }
                            })

                        }}>{"NO ENTREGADO"}</PButtom3>

                    </SView>
                    <SView col={"xs-1"} />
                    <SView col={"xs-5.5"} center>
                        <PButtom3 colorBg={STheme.color.success} onPress={() => {
                            SPopup.openContainer({
                                key: "popup_concretar_visita_si",
                                render: (e) => {
                                    let opts = []
                                    if (this.visitaType == "transporte") {
                                        opts = ["ENTREGADO", "ENTREGADO PARCIALMENTE"]
                                    }
                                    return <SView col={"xs-12"} padding={8} center>
                                        <SHr />
                                        <SText fontSize={20} center>Cuéntanos, ¿cómo te fue en la visita?</SText>
                                        <SHr />
                                        <SHr />
                                        <SInput type={"select"} ref={ref => this.visita_tipo = ref} defaultValue={opts[0]} options={opts} />
                                        <SHr />
                                        <SInput ref={ref => this.total_pagado = ref} type={"money"} placeholder={"Monto"} />
                                        {/* <SHr />
                                        <SInput ref={ref => this.visita_descripcion = ref} type={"textArea"} placeholder={"Resumen de la visita."} /> */}
                                        <SHr />
                                        <Btn padding={8} onPress={() => {
                                            let monto = 0;
                                            if (this.visitaType == "venta") {
                                                monto = 0;
                                            } else if (this.visitaType == "transporte") {
                                                monto = this.total_pagado.getValue();
                                            }
                                            this.visitaRegistro({
                                                // descripcion: this.visita_descripcion.getValue(),
                                                tipo: this.visita_tipo.getValue(),
                                                monto: monto
                                            })
                                            SPopup.close("popup_concretar_visita_si");
                                        }}>CONFIRMAR</Btn>
                                        <SHr />
                                    </SView>
                                }
                            })

                        }}>SÍ, ENTREGADO</PButtom3>
                    </SView>
                </SView>
            </Container>
        </SPage>
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(pedidoDetalle);
