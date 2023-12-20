import React, { Component } from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import Model from '../../../Model';
import item from '../item';
import { SHr, SImage, SInput, SList, SLoad, SNavigation, SStorage, SText, STheme, SView, SIcon, SDate, SMath, SMarker, SPopup, SUuid } from 'servisofts-component';
import SSocket from "servisofts-socket"
import { Btn, BtnNavegar, Header, PButtom, Visitas } from '../../../Components';
import SCharts from 'servisofts-charts';
import SMapView from "servisofts-component/Component/SMapView";
import { SelectEntreFechas } from '../../../Components/Fechas';
import DataBase from '../../../DataBase';
import { Trigger } from 'servisofts-db';
import { Platform } from 'react-native';
import SBLocation from 'servisofts-background-location';


class index extends DPA.profile {
    state = {
        cantidad_ventas: 0,
        maxima_venta: 0,
        cantidad_pedidos: 0,
        minima_venta: 0,
        primer_venta: "0000-00-00",
        ultima_venta: "0000-00-00",
        fecha_inicio: SNavigation.getParam("fecha_inicio"),
        fecha_fin: SNavigation.getParam("fecha_fin"),
        // primer_compra: new SDate(),
        // ultima_compra: new SDate()

    }
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: [],
            title: "Perfil de " + Parent.title,
        });
        this.pk = parseInt(SNavigation.getParam("pk"));
        this.visita = SNavigation.getParam("visita", false);
        this.visitaType = SNavigation.getParam("visitaType", false);
        this.idemp = SNavigation.getParam("idemp", 0);
        this.tbvd = SNavigation.getParam("tbvd", 0);
        // this.onVisitaSuccess = SNavigation.getParam("onVisitaSuccess");
        // this.visita = SNavigation.getParam("visita");

    }

    componentDidMount() {
        this.load()
        this.t1 = Trigger.addEventListener({
            on: ["insert", "update", "delete"],
            tables: ["tbcli"]
        }, (e) => {
            if (e.on == "delete") {

            } else {
                this.load()
            }
        })

    }
    componentWillUnmount() {
        Trigger.removeEventListener(this.t1)
    }
    load() {
        DataBase.tbcli.objectForPrimaryKey(this.pk).then(e => {
            this.setState({ data: e })
        }).catch(e => {
            console.error(e)
        })
    }

    loadData({ fecha_inicio, fecha_fin }) {
        SSocket.sendPromise({
            component: "tbcli",
            type: "getPerfil",
            idcli: this.pk + "",
            fecha_inicio,
            fecha_fin
        }).then((e) => {
            const obj = e.data[0]
            console.log("tbcli getPerfil", obj)
            this.setState({ ...obj })
        }).catch(e => console.error(e))
        this.setState({ fecha_inicio: fecha_inicio, fecha_fin: fecha_fin })
    }

    visitaRegistro({ descripcion, tipo, monto }) {
        this.setState({ loading: true })
        let data = {
            sync_type: "insert",
            key: SUuid(),
            key_usuario: Model.usuario.Action.getKey(),
            idcli: this.pk + " ",
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

        return;
        SSocket.sendPromise({
            component: this.visitaType == "transporte" ? "visita_transportista" : "visita_vendedor",
            type: "registro",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            data: {
                idemp: this.idemp,
                idcli: this.pk,
                descripcion: descripcion,
                tipo: tipo,
                monto: monto,
                fecha: new SDate().toString("yyyy-MM-dd")
            }
        }).then(e => {
            // state.visitas[o.idcli] = e.data;
            this.setState({ loading: false })
            SNavigation.goBack();

        }).catch(e => {
            console.error(e)
            this.setState({ loading: false })
        })
    }
    $allowNew() {
        if (!!Model.usuario.Action.getUsuarioLog()?.idvendedor) return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    $allowEdit() {
        if (!!Model.usuario.Action.getUsuarioLog()?.idvendedor) return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        if (!!Model.usuario.Action.getUsuarioLog()?.idvendedor) return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return this.state?.data;
    }

    ItemCard = ({ label, cant, monto, icon, color, onPress }) => {
        var montoOk = "";
        if (monto) montoOk = "Bs. " + (SMath.formatMoney(monto) ?? 1);
        return <SView col={"xs-6 md-6"} height={100} padding={6} onPress={onPress} >
            <SView card flex col={"xs-12"} style={{
                borderRadius: 14,
                borderBottomWidth: 4,
                borderLeftWidth: 3,
                borderRightWidth: 1,
                borderColor: STheme.color.card,
                padding: 15
            }} row center>
                <SView width={38} center height={38} padding={8}
                    style={{
                        backgroundColor: color + "40",
                        borderRadius: 50
                    }}
                >
                    <SIcon name={icon} fill={color} />
                </SView>
                <SView width={4} />
                <SView flex height style={{
                    justifyContent: "center"
                }}>
                    <SText bold fontSize={14}>{montoOk}</SText>
                    {(montoOk == "")
                        ?
                        <SText bold fontSize={14}>{cant ?? 0}</SText>
                        :
                        <SText bold fontSize={14}>({cant ?? 0})</SText>}
                    <SText fontSize={12} color={STheme.color.gray}>{label}</SText>
                </SView>
            </SView>
        </SView>
    }

    getGrafo() {
        return <>
            <SView col={"xs-12"} >
                <SText>GRÁFICO DE COMPRAS Y PEDIDOS</SText>
                <SHr />
                <SView col={"xs-12 md-12"} height={300} padding={6}  >
                    <SView card flex col={"xs-12"} style={{
                        borderRadius: 14,
                        borderBottomWidth: 4,
                        borderLeftWidth: 3,
                        borderRightWidth: 1,
                        borderColor: STheme.color.card,
                        padding: 15
                    }} row center>
                        <SCharts type='torta'
                            config={{
                                // endSpace:20
                            }}
                            data={[
                                { key: "compras", val: this.state?.cantidad_ventas ?? 0, color: "#8CB45F66", },
                                { key: "pedidos", val: this.state?.cantidad_pedidos ?? 0, color: "#FA5A5F" }
                            ]} />
                    </SView>
                </SView>
            </SView>
        </>
    }

    getUbicacion(objeto) {
        // console.log(objeto)
        // console.log("aquiiii")
        // if ((objeto.clilan == "") || (objeto.clilon == "")) return;
        return <>
            <SView col={"xs-12"} >
                <SHr height={20} />
                <SText>UBICACIÓN TIENDA</SText>
                <SHr />
                {((objeto?.clilan == "") || (objeto?.clilon == "")) ? null :
                    <SView col={"xs-12 md-12"} height={300} padding={6}  >
                        <SView card flex col={"xs-12"} style={{
                            borderRadius: 14,
                            borderBottomWidth: 4,
                            borderLeftWidth: 3,
                            borderRightWidth: 1,
                            borderColor: STheme.color.card,
                            padding: 15
                        }} row center>
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
                                <SMarker lat={objeto?.clilat} lng={objeto?.clilon}  >
                                    <SIcon name="MarcadorMapa" width={50} height={55} fill={STheme.color.primary} />
                                </SMarker>
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

                    <SView col={"xs-11.5 sm-5.5"} center>
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
                    <SView col={"xs-11.5 sm-5.5"} center>
                        <SView height={50}>
                            <SView center width={190} height={50} backgroundColor={STheme.color.primary}
                                style={{ borderRadius: 8 }}
                                onPress={() => {
                                    SNavigation.navigate("/tbcli/mapa",
                                        {
                                            callback2: (resp) => {
                                                this.setState({ ubicacion: resp })
                                            },
                                            lat: objeto?.clilat,
                                            lon: objeto?.clilon,
                                            pk: this.pk,
                                            obj: objeto
                                        },
                                    )
                                }}>
                                <SText fontSize={15} color={STheme.color.white}>{((objeto?.clilan == "") || (objeto?.clilon == "")) ? "AGREGAR UBICACIÓN" : "EDITAR UBICACIÓN"}</SText>
                            </SView>
                        </SView>
                    </SView>


                </SView>
                <SHr height={15} />
            </SView>
        </>

    }

    $render() {
        return <>
            <Header.Modulo
                width={120}
                titulo="CLIENTES"
                icon="Clientes"
            />
            {super.$render()}
        </>
    }

    getDetalleCarga() {
        if (!this.tbvd) return null;
        if (typeof this.tbvd != "object") return null;
        let productos = Model.tbprd.Action.getAll();
        if (!productos) return <SLoad />
        let total = 0;
        this.tbvd.map(o => {
            total += o.vdcan * o.vdpre
        })
        return <SView col={"xs-12"} center card padding={8}>
            <SText bold>CARGA</SText>
            <SList
                data={this.tbvd}
                render={(itm) => {
                    const producto = productos[itm.idprd]
                    return <SView col={"xs-12"} card padding={8} row center>
                        <SView width={40} height={40} >
                            <SImage src={require('../../../Assets/img/foto.png')}
                                style={{
                                    position: "absolute",
                                    zIndex: 90,
                                    top: 0,
                                }}
                            />
                            <SImage enablePreview src={SSocket.api.root + "tbprd/" + itm.idprd}
                                style={{
                                    position: "absolute",
                                    zIndex: 99,
                                    top: 0,
                                    backgroundColor: "#ffffff50"
                                }}
                            />
                        </SView>
                        <SView width={8} />
                        <SView flex>
                            <SText>{producto.prdnom}</SText>
                            <SText>{itm.vdcan}  x   Bs. {SMath.formatMoney(itm.vdpre)}</SText>
                            <SText col={"xs-12"} style={{
                                textAlign: "right"
                            }} bold>Bs. {SMath.formatMoney(itm.vdcan * itm.vdpre)}</SText>
                        </SView>

                    </SView>
                }}
            />

            <SText bold>Total = Bs. {SMath.formatMoney(total)} </SText>
        </SView>
    }
    $item(obj) {
        if (!obj) return <SLoad />
        return <SView col={"xs-12"} center>
            <SHr />
            <SView col={"xs-12"} height={260} center>
                <SView width={100} height={100} card style={{
                    borderRadius: 28,
                    overflow: "hidden",
                    backgroundColor: STheme.color.white
                }} center>
                    <SImage enablePreview src={require('../../../Assets/img/sinFoto.png')} style={{
                        resizeMode: "contain",
                        position: "absolute",
                        zIndex: 90,
                        top: 0,
                        width: 50
                    }} />
                    <SImage enablePreview src={Model.tbcli._get_image_download_path(SSocket.api, this.pk) + "?date=" + new Date().getTime()} style={{
                        resizeMode: "cover",
                        zIndex: 99,
                    }} />
                </SView>
                <SView style={{
                    position: "absolute",
                    right: "36.5%",
                    top: 70
                }}
                    onPress={() => {
                        SNavigation.navigate("/tbcli/edit", { pk: this.pk })
                    }}
                >
                    <SView width={45} height={45}
                        backgroundColor={STheme.color.primary}
                        style={{
                            borderRadius: 50
                        }}
                        center
                    >
                        <SIcon name="Icamera" width={25} height={25} />
                    </SView>
                </SView>
                <SHr />
                <SText bold fontSize={16}>{`${obj.clinom}`}</SText>
                <SText>{`${obj.idcli} | ${obj.clicod}`}</SText>
                <SHr h={4} />
                <SText fontSize={12}>{`Tel.: ${obj.clitel}`}</SText>
                <SHr h={4} />
                <SText fontSize={12}>{`Dir.: ${obj.clidir}`}</SText>
            </SView>

            <Btn col={"xs-11"} onPress={() => {

                if (Platform.OS == "web") {
                    SStorage.setItem("tbcli_a_comprar", JSON.stringify(obj))
                    SNavigation.navigate("/public", { idcli: obj.idcli })
                    return;
                };
                SBLocation.isActive().then(e => {
                    if (e.estado == "exito") {
                        SStorage.setItem("tbcli_a_comprar", JSON.stringify(obj))
                        SNavigation.navigate("/public", { idcli: obj.idcli })
                        return;
                    }
                    SPopup.alert("Debe activarse en el inicio para realizar pedidos.")
                }).catch(e => {
                    SPopup.alert("Debe activarse en el inicio para realizar pedidos.")
                })

            }}>REALIZAR PEDIDO</Btn>
            <SHr h={16} />
            {(this.visitaType && !this.visita) ? <><Btn col={"xs-11"} onPress={() => {
                SPopup.openContainer({
                    key: "popup_concretar_visita",
                    render: (e) => {

                        let opts = []
                        if (this.visitaType == "venta") {
                            opts = ["TIENDA CERRADA", "NO ESTÁN LOS ENCARGADOS", "CUENTA CON STOCK", "NO CUENTA CON DINERO"]
                        } else if (this.visitaType == "transporte") {
                            opts = ["RECIBIO CONFORME", "NO PAGO", "SE ENCONTRABA CERRADO"]
                        }
                        return <SView col={"xs-12"} padding={8} center>
                            <SHr />
                            <SText fontSize={20} center>Cuéntanos, ¿cómo te fue en la visita?</SText>
                            <SHr />
                            <SHr />
                            <SInput type={"select"} ref={ref => this.visita_tipo = ref} defaultValue={opts[0]} options={opts} />
                            <SHr />
                            {(this.visitaType == "transporte") ? <SInput ref={ref => this.total_pagado = ref} type={"money"} placeholder={"Monto"} /> : null}
                            <SHr />
                            <SInput ref={ref => this.visita_descripcion = ref} type={"textArea"} placeholder={"Resumen de la visita."} />

                            <SHr />
                            <Btn padding={8} onPress={() => {
                                // let monto = 0;
                                // if (this.visitaType == "venta") {
                                //     monto = 0;
                                // } else if (this.visitaType == "transporte") {
                                //     monto = this.total_pagado.getValue();
                                // }
                                this.visitaRegistro({
                                    descripcion: this.visita_descripcion.getValue(),
                                    tipo: this.visita_tipo.getValue(),
                                    // monto: monto
                                })
                                // this.onVisitaSuccess({
                                //     descripcion: this.visita_descripcion.getValue(),
                                //     tipo: this.visita_tipo.getValue()
                                // });
                                SPopup.close("popup_concretar_visita");
                            }}>CONFIRMAR</Btn>
                            <SHr />
                        </SView>
                    }
                })

            }}>CONCRETAR VISITA</Btn><SHr /></> : null}
            <Visitas.Detalle data={this.visita} />
            <SHr h={8} />
            {this.getDetalleCarga()}
            <SHr h={8} />
            {this.getUbicacion(obj)}
            <SelectEntreFechas fecha_inicio={this.state.fecha_inicio} fecha_fin={this.state.fecha_fin} onChange={e => {
                this.loadData(e)
            }} />
            <SHr height={20} />

            <SView col={"xs-12"} center row style={{
                justifyContent: "space-between"
            }}>

                {this.ItemCard({
                    label: "Total pedidos",
                    cant: this.state.cantidad_pedidos,
                    icon: 'Ipedidos',
                    color: '#FF5A5F',
                    // onPress: () => SNavigation.navigate("/tbcli/profile/tbven", { pk: this.pk, tipo: "VD", fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                })}
                {this.ItemCard({
                    label: "Total productos",
                    cant: this.state.cantidad_productos,
                    monto: this.state.monto_pedidos ?? 0,
                    icon: 'Ipedidos',
                    color: '#FF5A5F',
                    // onPress: () => SNavigation.navigate("/tbcli/profile/tbven", { pk: this.pk, tipo: "VD", fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                })}
                {this.ItemCard({
                    label: "Rechazos",
                    cant: this.state.cantidad_ventas ?? 0,
                    // monto: SMath.formatMoney(this.state?.monto_total_ventas ?? 0),
                    icon: 'Alert',
                    color: '#FF5A5F',
                    // onPress: () => SNavigation.navigate("/tbcli/profile/tbven", { pk: this.pk, tipo: "VF", fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbcli", { pk: this.pk }) : null
                })}
                {/* {this.ItemCard({
                    label: "Máxima venta",
                    cant: (this.state.maxima_venta ?? 0).toFixed(2),
                    icon: 'ImaxCompra',
                    color: '#B622B5',
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })}
                {this.ItemCard({
                    label: "Mínima venta",
                    cant: (this.state.minima_venta ?? 0).toFixed(2),
                    icon: 'IminCompra',
                    color: '#00A0AA',
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })} */}
                {/* {this.ItemCard({
                    label: "Primer venta",
                    cant: this.state.primer_venta.split(' ')[0],
                    icon: 'Ifirst',
                    color: '#DC7D3C',
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })}
                {this.ItemCard({
                    label: "Última venta",
                    cant: this.state.ultima_venta.split(' ')[0],
                    icon: 'Ilast',
                    color: '#FF64B4',
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })} */}


                {/* {this.getGrafo()} */}

            </SView>

            <SHr />
        </SView>
    }
}
export default connect(index);
