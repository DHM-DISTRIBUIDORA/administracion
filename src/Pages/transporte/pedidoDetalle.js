import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { SBuscador, SDate, SHr, SInput, SList, SList2, SLoad, SMapView, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SUuid, SMarker, SIcon, SGeolocation, SNotification } from 'servisofts-component'
import Model from '../../Model'
import SSocket from 'servisofts-socket'
import DataBase from '../../DataBase'
import { Btn, BtnNavegar, Container, PButtom3 } from '../../Components';
import PButtomSmall from '../../Components/PButtomSmall';
import { SBackgroundLocation } from 'servisofts-background-location';
import SGeolocation2 from '../../Components/SGeolocation2';

class pedidoDetalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curdate: new SDate(),
            idemp: SNavigation.getParam("idemp"),
            fecha: SNavigation.getParam("fecha"),
            edito: false,
        }
        this.idven = SNavigation.getParam("idven");
        this.visita = SNavigation.getParam("visita", false);
        this.visitaType = SNavigation.getParam("visitaType", false);
        this.idemp = SNavigation.getParam("idemp", 0);
        this.tbvd = SNavigation.getParam("tbvd", 0);
        this.pk = SNavigation.getParam("pk", 0);
    }
    componentDidMount() {
        //TODO: NO RECARGA EL DETALLE AL EDITAR
        // DataBase.ventas_factura.all
        // DataBase.dm_cabfac.
        DataBase.ventas_factura.objectForPrimaryKey(parseInt(this.idven)).then((e) => {
            this.setState({ data: e })

            if (e.detalle) {

            }
            // console.log(e)
        })
        DataBase.visita_transportista.filtered("idven == '" + this.idven + "'").then((e) => {
            // console.log(e);
            this.setState({ visita: e[0] })
        })
        DataBase.tbprd.all().then(e => {
            this.setState({ productos: e })
        })
    }

    calc_distance = (lat1, lon1, lat2, lon2) => {
        var rad = function (x) { return x * Math.PI / 180; }
        var R = 6378.137;
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c * 1000;
        return d;
    }

    handlePressVisita = async (tbcli, visit) => {
        let notify = await SNotification.send({
            title: "Obteniendo tu ubicación",
            body: "Estamos buscando tu ubicación actual.",
            type: "loading"
        })
        // SGeolocation.getCurrentPosition({
        //     enableHighAccuracy: false,
        //     maximumAge: 3600,
        //     timeout: 3000
        // }).then(e => {
        SGeolocation2.getCurrentPosition({
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 15000
        }).then(e => {
            notify.close();
            console.log("COORDENADAS OBTENIDAAAAAAAS");
            console.log(e.coords);
            console.log(tbcli);
            this.handlePressVisitaUbicacion(tbcli, e.coords, visit);
        }).catch(e => {
            notify.close();
            SNotification.send({
                title: "Obteniendo tu ubicación",
                body: e.message,
                time: 5000,
                color: STheme.color.danger
            })
            console.error(e);
        })
    }

    handlePressVisitaUbicacion = async (tbcli, ubicacion, visit) => {

        let distancia = this.calc_distance(tbcli.clilat, tbcli.clilon, ubicacion.latitude, ubicacion.longitude);
        // let distancia = this.calc_distance(tbcli.clilat, tbcli.clilon, -17.777669171299607, -63.17510496606445);
        if (distancia > 200) {
            console.log("DISTANCIA MAYOR A 200 METROS");

            if (!Model.usuarioPage.Action.getPermiso({ url: "/global", permiso: "levantar_pedido_fuera_zona" })) {
                console.log("DISTANCIA MAYOR A 200 METROS entró al if");
                SPopup.alert("No tiene permisos para realizar la visita lejos del cliente, por favor contáctese con la administración.")
                return;
            }
        }
        if (visit) {
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
                        <SInput defaultValue={(parseFloat(this.total).toFixed(2))} ref={ref => this.total_pagado = ref} type={"money"} placeholder={"Monto"} />
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
        } else {
            SPopup.openContainer({
                key: "popup_concretar_visita_no",
                render: (e) => {

                    let opts = []
                    if (this.visitaType == "transporte") {
                        opts = ["PENDIENTE DE ENTREGA", "NO TIENE DINERO", "NO ESTÁN LOS ENCARGADOS", "CERRADO", "PEDIDO MAL GENERADO"]
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
        }
    }

    item() {
        if (!this.state?.data) return <SLoad />
        return <>
            <SView col={"xs-12"} row >
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold  >FECHA: </SText>
                    <SText font={'AcherusGrotesque-Regular'} fontSize={14} color={STheme.color.gray}>{new SDate(this.state?.data?.vfec, "yyyy-MM-dd hh:mm:ss.s").toString("DAY, dd de MON del yyyy")} a las {new SDate(this.state?.data?.vhora, "yyyy-MM-dd hh:mm:ss.s").toString("hh:mm:ss")}</SText>
                </SView>
                {/* <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >NIT/CI: </SText>
                    <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.vnit}</SText>
                </SView> */}
            </SView>
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold >NOMBRE: </SText>
                    <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.clinom}</SText>
                </SView>
                {/* <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >ID CLIENTE: </SText>
                    <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.codigo}</SText>
                </SView> */}
            </SView>
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SView style={{ alignItems: "flex-start" }} >
                        <SText fontSize={14} bold >TELEFONO: </SText>
                    </SView>
                    <SView>
                        <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.clitel}</SText>
                    </SView>
                </SView>
                {/* <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14}   >ID VENTA: </SText>
                    <SText color={STheme.color.gray} font={'AcherusGrotesque-Regular'} >{this.state?.data?.idven}</SText>
                </SView> */}
            </SView>
            <SView col={"xs-12"} style={{ alignItems: "flex-start" }} row>
                <SView width={90} style={{ alignItems: "flex-start" }} >
                    <SText fontSize={14} bold >VENDEDOR: </SText>
                </SView>
                <SView flex >
                    <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.empnom}</SText>
                </SView>
            </SView>
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-6"} style={{ alignItems: "flex-start" }} row>
                    <SView width={70} style={{ alignItems: "flex-start" }} row>
                        <SText fontSize={14} bold >DETALLE: </SText>
                    </SView>
                    <SView col={"xs-9"} style={{ alignItems: "baseline" }} >
                        <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.razon_social}</SText>
                    </SView>
                </SView>
                <SView col={"xs-12 sm-6"} style={{ alignItems: "flex-start" }} row>
                    <SView width={90} style={{ alignItems: "flex-start" }} >
                        <SText fontSize={14} bold >DIRECCION: </SText>
                    </SView>
                    <SView flex >
                        <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.direccion}</SText>
                    </SView>
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
                <SView col={"xs-5.5"} >
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
        const productos = this.state.productos
        let total = 0;
        if (!detalle) return <SLoad />
        if (!productos) return <SLoad />
        Object.keys(detalle).map((key, index) => {
            total += detalle[key].vdpre * detalle[key].vdcan;
        });
        this.total = total;
        return <>
            <SList2
                initSpace={8}
                data={detalle}
                order={[{ key: "prdnom", order: "asc" }]}
                render={(vd) => {
                    const producto = Object.values(productos).find(a => a.idprd == vd.idprd)
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
                <SText font={'AcherusGrotesque-Regular'} fontSize={15} color={STheme.color.text}  >{`Bs. ${SMath.formatMoney(total)}`}</SText>
            </SView>
        </>
    }

    visitaRegistro({ descripcion, tipo, monto }) {
        this.setState({ loading: true })
        let data = {
            sync_type: "insert",
            key: SUuid(),
            key_usuario: Model.usuario.Action.getKey(),
            idven: this.idven,
            idcli: this.state?.data?.idcli + "",
            descripcion: descripcion,
            tipo: tipo,
            monto: parseFloat(monto ?? 0),
            fecha: new SDate(this?.state?.data?.fecha, "yyyy-MM-dd hh:mm:ss").toString("yyyy-MM-ddThh:mm:ss"),
        }
        data.idemp = Model.usuario.Action.getUsuarioLog()?.idtransportista;

        if (this.visita) {
            data.sync_type = "update";
            data.key = this.visita.key;
            DataBase.visita_transportista.update(data).then(e => {
                this.setState({ loading: false })
                SNavigation.goBack();

            }).catch(e => {
                console.error(e)
                this.setState({ loading: false })
            })

        } else {
            DataBase.visita_transportista.insert(data).then(e => {
                this.setState({ loading: false })
                SNavigation.goBack();

            }).catch(e => {
                console.error(e)
                this.setState({ loading: false })
            })
        }
        return;

    }

    renderButtoms() {
        if (this.state?.visita) {
            let { descripcion, fecha, fecha_on, tipo, monto } = this.state.visita
            if (monto == null) monto = 0;
            console.log(monto);
            return <SView
                style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: (monto != 0) ? STheme.color.success + "95" : STheme.color.danger + "95",
                    padding: 10,
                    backgroundColor: (monto != 0) ? STheme.color.success + "10" : STheme.color.danger + "10",
                }}
            >
                <SText bold  >Visitado el {new SDate(fecha_on, "yyyy-MM-ddThh:mm:ss").toString("DAY dd de MONTH del yyyy a las hh:mm")}. </SText>
                {(monto > 0) ?
                    <SView center style={{ left: 10 }}>
                        <SIcon name='Entregado' height={50} width={50} fill={STheme.color.success} />
                    </SView>
                    :
                    <SView center style={{ left: 10 }}>
                        <SIcon name='NoEntregado' height={50} width={50} fill={STheme.color.danger} />
                    </SView>}
                <SText>{tipo}</SText>
                <SText>Bs. {SMath.formatMoney(monto)}</SText>
                {(monto == 0) ? <SText>{descripcion}</SText> : null}
                <SHr height={10} />
                {/* <SText>{descripcion}</SText> */}
                <SView col={"xs-12"} flex style={{ alignItems: 'flex-end' }}>

                    <PButtomSmall width={100} center height={40} colorBg={STheme.color.danger} onPress={() => {
                        this.state.visita = null;
                        this.setState({ visita: null })
                        this.setState({ edito: true })
                    }}>{"EDITAR"}</PButtomSmall>
                </SView>
            </SView>
        }
        return <SView col={"xs-12"} center row>
            <SView col={"xs-5.5"} center>
                <PButtom3 colorBg={STheme.color.danger} onPress={() => {
                    this.handlePressVisita(this.state?.data, false);
                    // SPopup.openContainer({
                    //     key: "popup_concretar_visita_no",
                    //     render: (e) => {

                    //         let opts = []
                    //         if (this.visitaType == "transporte") {
                    //             opts = ["NO TIENE DINERO", "NO ESTÁN LOS ENCARGADOS", "CERRADO", "PEDIDO MAL GENERADO"]
                    //         }
                    //         return <SView col={"xs-12"} padding={8} center>
                    //             <SHr />
                    //             <SText fontSize={20} center>Cuéntanos, ¿cómo te fue en la visita?</SText>
                    //             <SHr />
                    //             <SHr />
                    //             <SInput type={"select"} ref={ref => this.visita_tipo = ref} defaultValue={opts[0]} options={opts} />
                    //             <SHr />
                    //             <SInput ref={ref => this.visita_descripcion = ref} type={"textArea"} placeholder={"Razón o motivo"} />
                    //             <SHr />
                    //             <Btn padding={8} onPress={() => {
                    //                 this.visitaRegistro({
                    //                     descripcion: (this.visita_descripcion?.getValue()) ? this.visita_descripcion?.getValue() : "",
                    //                     tipo: this.visita_tipo.getValue(),
                    //                     // monto: monto
                    //                 })
                    //                 SPopup.close("popup_concretar_visita_no");
                    //             }}>CONFIRMAR</Btn>
                    //             <SHr />
                    //         </SView>
                    //     }
                    // })

                }}>{"NO ENTREGADO"}</PButtom3>

            </SView>
            <SView col={"xs-1"} />
            <SView col={"xs-5.5"} center>
                <PButtom3 colorBg={STheme.color.success}
                    loading={this.state.loading}
                    onPress={() => {
                        this.handlePressVisita(this.state?.data, true);
                        // SPopup.openContainer({
                        //     key: "popup_concretar_visita_si",
                        //     render: (e) => {
                        //         let opts = []
                        //         if (this.visitaType == "transporte") {
                        //             opts = ["ENTREGADO", "ENTREGADO PARCIALMENTE"]
                        //         }
                        //         return <SView col={"xs-12"} padding={8} center>
                        //             <SHr />
                        //             <SText fontSize={20} center>Cuéntanos, ¿cómo te fue en la visita?</SText>
                        //             <SHr />
                        //             <SHr />
                        //             <SInput type={"select"} ref={ref => this.visita_tipo = ref} defaultValue={opts[0]} options={opts} />
                        //             <SHr />
                        //             <SInput defaultValue={(parseFloat(this.total).toFixed(2))} ref={ref => this.total_pagado = ref} type={"money"} placeholder={"Monto"} />
                        //             {/* <SHr />
                        //     <SInput ref={ref => this.visita_descripcion = ref} type={"textArea"} placeholder={"Resumen de la visita."} /> */}
                        //             <SHr />
                        //             <Btn padding={8} onPress={() => {
                        //                 let monto = 0;
                        //                 if (this.visitaType == "venta") {
                        //                     monto = 0;
                        //                 } else if (this.visitaType == "transporte") {
                        //                     monto = this.total_pagado.getValue();
                        //                 }
                        //                 this.visitaRegistro({
                        //                     // descripcion: this.visita_descripcion.getValue(),
                        //                     tipo: this.visita_tipo.getValue(),
                        //                     monto: monto
                        //                 })
                        //                 SPopup.close("popup_concretar_visita_si");
                        //             }}>CONFIRMAR</Btn>
                        //             <SHr />
                        //         </SView>
                        //     }
                        // })

                    }}>SÍ, ENTREGADO</PButtom3>
            </SView>
        </SView>
    }

    getUbicacion() {
        if (!this.state?.data) return <SLoad />
        const objeto = this.state?.data;
        // objeto.clilat = -17.750285549975814;
        // objeto.clilon = -63.17470188985609;
        if (!objeto.clilat) return <SView><SText bold>CLIENTE NO TIENE UBICACIÓN REGISTRADA</SText></SView>;

        return <>
            <SView col={"xs-12"} >

                {((objeto?.clilan == "") || (objeto?.clilon == "")) ? null :
                    <SView col={"xs-12 md-12"} height={300} padding={6}  >
                        <SView card flex col={"xs-12"} style={{
                            borderRadius: 14,
                            borderBottomWidth: 4,
                            borderLeftWidth: 3,
                            borderRightWidth: 1,
                            borderColor: STheme.color.card,
                            padding: 15
                        }} center>
                            <SMapView
                                initialRegion={{
                                    latitude: objeto?.clilat,
                                    longitude: objeto?.clilon,
                                    latitudeDelta: 0.0222,
                                    longitudeDelta: 0.0221,
                                }} preventCenter
                                options={{
                                    zoomControl: false,
                                    fullscreenControl: false,
                                    mapTypeControl: false,
                                    rotateControl: false,
                                    streetViewControl: false,
                                }}
                            >
                                <SMapView.SMarker latitude={objeto?.clilat} longitude={objeto?.clilon}  >
                                    <SIcon name="MarcadorMapa" width={25} height={45} fill={STheme.color.primary} />
                                </SMapView.SMarker>
                            </SMapView>
                            <SView col={"xs-12"} height style={{
                                position: "absolute"
                            }} withoutFeedback>

                            </SView>
                        </SView>
                    </SView>

                }

                <SHr height={10} />
                <SView col={"xs-12"} row center>
                    <SView col={"xs-11.5 sm-11.5"} center>
                        {objeto?.clilat == "" ? null : <BtnNavegar latLng={{ latitude: objeto?.clilat, longitude: objeto?.clilon }}
                            backgroundColor={STheme.color.darkGray}
                            width={190}
                            height={50}
                            style={{ borderRadius: 8 }}
                            center
                        >
                            <SText color={STheme.color.white} center fontSize={15} >IR A GOOGLE MAPS</SText>
                        </BtnNavegar>}

                    </SView>
                    <SView col={"xs-1"} height={10} />
                </SView>
                <SHr height={15} />
            </SView>
        </>

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
                {this.renderButtoms()}
                <SHr height={20} />
                <SView col={"xs-12"} row >
                    <SHr height={20} />
                    <SText bold fontSize={16}>UBICACIÓN TIENDA</SText>
                    <SHr />
                </SView>
                {this.getUbicacion()}
            </Container>
        </SPage>
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(pedidoDetalle);
