import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SHr, SIcon, SInput, SLoad, SMapView, SMath, SNavigation, SPage, SRangeSlider, SText, STheme, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket'
import { getGPXDiaUsuario } from './Functions';
import { SelectFecha } from '../../Components/Fechas';
import { Container } from '../../Components';

export default class transportista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fecha: SNavigation.getParam("fecha"),
            // fecha_recorrido: new SDate().toString("yyyy-MM-dd"),
            index: 0,
            idemp: SNavigation.getParam("idemp"),
            key_usuario: SNavigation.getParam("key_usuario"),
            visita: []
        }
    }

    componentDidMount() {
        SSocket.sendHttpAsync(SSocket.api.root + "api", {
            "component": "visita_transportista",
            "type": "getAll",
            "estado": "cargando",
            "fecha": this.state?.fecha,
            "idemp": this.state?.idemp,
        }).then((e) => {
            let arr = Object.values(e.data);
            let fecha_recorrido = new SDate().toString("yyyy-MM-dd")
            if (arr.length > 0) {
                fecha_recorrido = new SDate(arr[0].fecha_on, "yyyy-MM-ddThh:mm:ss").toString("yyyy-MM-dd");
            }
            this.loadGpx(fecha_recorrido)
            this.setState({ visita: e.data, fecha_recorrido: fecha_recorrido })
        }).catch((e) => {
            console.error("SAdasdas");

        })

        SSocket.sendHttpAsync(SSocket.api.root + "api", {
            "component": "tbemp",
            "type": "getVentasFactura",
            "estado": "cargando",
            "fecha": this.state?.fecha,
            "idemp": this.state?.idemp,
        }).then((e) => {
            console.log(e);
            if (this.mapa) {
                let arr = []
                e.data.map(a => {
                    if (!a.clilat || !a.clilon) return;
                    arr.push({ latitude: a.clilat, longitude: a.clilon })
                })
                if (arr.length > 0) {
                    this.mapa.fitToCoordinates(arr, {
                        edgePadding: {
                            bottom: 100,
                            left: 100,
                            right: 100,
                            top: 100,
                        },
                        animated: true
                    })
                }
            }
            this.setState({ ventas: e.data })
        }).catch((e) => {

        })
    }


    loadActivaciones(fecha) {
        const request = {
            component: "location_info",
            type: "getAll",
            key_usuario: this.state.key_usuario,
            fecha_inicio: fecha,
            fecha_fin: fecha,
        }

        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            console.log(e);
            let arr = Object.values(e.data);

            this.setState({ activaciones: arr, loading: false })
        }).catch(e => {
            console.error(e);
        })
    }
    loadData(fecha) {
        console.log("FECHAAA AQUIII: " + fecha);
        this.loadActivaciones(fecha)
        this.setState({ data: null, error: "" })
        getGPXDiaUsuario({ fecha: fecha, key_usuario: this.state.key_usuario }).then(e => {
            e.sort((a, b) => a.fecha_on > b.fecha_on ? 1 : -1)
            console.log(e);
            this.setState({ data: e, error: "" })
        }).catch(e => {
            alert("Asdsada")
            if (!e) {
                e = {
                    error: "No hay datos en esta fecha."
                }
            }
            this.setState({ data: null, error: e?.message ?? e?.error })
            console.error(e);
        })
    }

    loadGpx(fecha) {
        console.log("ENTRO AL LOAD GPX", fecha)

        getGPXDiaUsuario({ fecha: fecha, key_usuario: this.state.key_usuario }).then(e => {
            e.sort((a, b) => a.fecha_on > b.fecha_on ? 1 : -1)
            this.setState({ data: e, error: "" })
            if (this.mapa) {
                console.log("centrando", e)
                let arr = []
                e.map(a => {
                    if (!a.lat || !a.lon) return;
                    arr.push({ latitude: parseFloat(a.lat), longitude: parseFloat(a.lon) })
                })
                this.mapa.fitToCoordinates(arr, {
                    edgePadding: {
                        bottom: 100,
                        left: 100,
                        right: 100,
                        top: 100,
                    },
                    animated: true
                })
            }
            this.setState({ points: e, error: "" })
        }).catch(e => {
            this.setState({ data: [], error: "" })
            console.error(e);
        })
        const request = {
            component: "location_info",
            type: "getAll",
            key_usuario: this.state.key_usuario,
            fecha_inicio: fecha,
            fecha_fin: fecha,
        }

        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            console.log(e);
            let arr = Object.values(e.data);

            this.setState({ activaciones: arr, loading: false })
        }).catch(e => {
            console.error(e);
        })
    }
    renderMarkers() {
        if (!this.state.ventas) return null;
        const grupos = {};
        const colores = {};
        return this.state.ventas.map(obj => {
            let color = "#666"
            if (this.state?.visita) {
                let visita = this.state?.visita[obj.idven];
                if (visita) {
                    if (visita.tipo == "ENTREGADO") {
                        color = STheme.color.success;
                    } else if (visita.tipo == "ENTREGADO PARCIALMENTE") {
                        color = STheme.color.warning;
                    } else {
                        color = STheme.color.danger;
                    }
                }
            }
            // console.log("obj")
            // console.log(obj)
            // console.log("VISITAS")
            // console.log(this.state.visita[obj.idven])
            let opacity = 1;
            if (this.state.find) {
                if (JSON.stringify(obj).toLowerCase().indexOf((this.state.find ?? "").toLowerCase()) <= -1) {
                    // opacity = 0.1
                    // } else {
                    return null;
                }
            }

            if (!grupos[obj.idven]) {
                grupos.push(idven = obj.idven)
            }



            return <SMapView.SMarker latitude={obj.clilat} longitude={obj.clilon} fill={color} onPress={() => {
                SNavigation.navigate("/tbcli/profile", { pk: obj.idcli })
            }}>
                {(this.state.visita[obj.idven]?.tipo == "ENTREGADO") ?
                    <SView center flex col={"xs-12"} height={73} style={{ zIndex: 999, position: "relative", opacity: opacity }}>
                        <SView col={"xs-12"} height={40} center >
                            <SView width={73} height={35} borderRadius={10} backgroundColor={STheme.color.white} style={{
                                borderWidth: 2,
                                borderColor: STheme.color.text,
                                position: "absolute",
                            }} center>
                                <SText fontSize={8} bold color={STheme.color.black} style={{ lineHeight: 8 }} center >{obj.clinom}</SText>
                                <SHr height={3} />
                                <SText fontSize={8} color={STheme.color.black} style={{ lineHeight: 7 }} center >{"(" + (obj.empnom).split(' ')[0] + ")"}</SText>

                            </SView>
                        </SView>
                        <SIcon name={"MarcadorMapa"} width={25.45} height={33.9} fill={color} />
                    </SView>
                    : <SView center flex col={"xs-12"} height={73} style={{ zIndex: 999, position: "relative", opacity: opacity }}>
                        <SView col={"xs-12"} height={40} center >
                            <SView width={68} height={35} borderRadius={10} backgroundColor={STheme.color.white} style={{
                                borderWidth: 2,
                                borderColor: STheme.color.text,
                                position: "absolute",
                            }} center>
                                <SText fontSize={8} bold color={STheme.color.black} style={{ lineHeight: 8 }} center >{obj.clinom}</SText>
                                <SHr height={3} />
                                <SText fontSize={8} color={STheme.color.black} style={{ lineHeight: 7 }} center >{"(" + (obj.empnom).split(' ')[0] + ")"}</SText>

                            </SView>
                        </SView>
                        <SIcon name={"MarcadorMapa"} width={25.45} height={33.9} fill={color} />
                    </SView>}

            </SMapView.SMarker>
        })
    }



    getHeader() {
        if (!this.state.fecha_recorrido) return <SLoad />
        return <SView col={"xs-12"} height={80}>
            <SView row col={"xs-12"} center>
                <SView width={150}>
                    {/* <SelectFecha fecha={this.state.}/> */}
                    <SInput defaultValue={this.state.fecha_recorrido} label={"Fecha del recorrido"} type='date' onChangeText={(e) => {
                        this.loadGpx(e)
                    }} />
                </SView>
                <SView width={8} />
                <SView width={150}>
                    <SInput defaultValue={this.state.fecha} label={"Fecha de los pedidos"} type='date' onChange={(e) => {
                        // this.state.fecha = e.fecha;
                        this.loadData(e)
                        // this.componentDidMount()
                    }} />
                </SView>
            </SView>
        </SView>
    }

    getPolylines = () => {
        if (!this.state?.points) return null;
        if (!this.state?.activaciones) return null;

        // console.log(this.state?.data)
        const colores = ['#85BFD0', '#9B9AD9', '#90D598', '#F5AD76', '#F18684', '#E36188', '#76DEFC', '#D289E1', '#5097F8', '#17C3A5', '#A7C1D4', '#87e4ec'];


        let last_start = null
        let last_stop = null
        return this.state.activaciones.filter(a => a.tipo == "stop" || a.tipo == "provider_disabled" || a.tipo == "start").sort((a, b) => a.fecha_on > b.fecha_on ? 1 : -1).map((activacion, i) => {

            if (activacion.tipo == "start") {
                last_start = activacion;
            }
            let ITEMS = [];
            const fact = new SDate(activacion.fecha_on);
            this.state.points.map((o) => {
                if (o.fecha_on.substring(0, 18) <= last_start?.fecha_on.substring(0, 18)) return;
                if (!last_stop) {
                    // if (o.fecha_on.substring(0, 18) > activacion.fecha_on.substring(0, 18)) return;
                } else {
                    if (o.fecha_on.substring(0, 18) > activacion.fecha_on.substring(0, 18)) return;
                    if (o.fecha_on.substring(0, 18) <= last_stop?.fecha_on.substring(0, 18)) return;
                }
                ITEMS.push({
                    latitude: parseFloat(o.lat),
                    longitude: parseFloat(o.lon)
                })
            })
            last_stop = activacion;

            return <SMapView.SPolyline key={this.state.index}
                coordinates={ITEMS}
                strokeColor={colores[i]}
                strokeWidth={5}
            ></SMapView.SPolyline>

        })
    }

    cardDetalle() {
        if (!this.state?.ventas) return null;
        let total_cliente = this.state?.ventas.length ?? 0;
        let entrega_parcial = 0;
        let pedidos = 0;
        let no_entregado = 0;
        let no_visitados = 0;
        this.state.ventas.map((o) => {
            // console.log("CLIENTESSS")
            // console.log(o)

            if (this.state?.visita) {
                let visita = this.state?.visita[o.idven];
                if (visita) {
                    if (visita.tipo == "ENTREGADO") {
                        pedidos++;
                    } else if (visita.tipo == "ENTREGADO PARCIALMENTE") {
                        entrega_parcial++;
                    } else {
                        no_entregado++;
                    }
                }
            } else {
                no_visitados++;
            }

            // let color = STheme.color.danger
            //   if (o.visitas.length > 0) {
            //     tot_visit++;
            //     if (o.ventas.length > 0) {
            //       pedidos++;
            //       color = STheme.color.success
            //     } else {
            //       color = "#FFC010"
            //       visitas_sin_exito++;
            //     }
            //   }
        })

        return <SView center
            style={{
                position: 'absolute',
                top: 140,
                zIndex: 9999,
                backgroundColor: STheme.color.card,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                padding: 6
            }}>
            <SView col={"xs-12"}>
                <SView col={"xs-12"} row>
                    <SText>TOTAL CLIENTES </SText>
                    <SText bold>({total_cliente})</SText>
                </SView>
                <SView col={"xs-12"} row>
                    <SView height={20} width={20} backgroundColor={STheme.color.success} style={{ borderRadius: 40 }} />
                    <SView width={5} />
                    <SText>ENTREGADOS </SText>
                    <SText bold>({pedidos})</SText>
                </SView>
                <SView col={"xs-12"} row>
                    <SView height={20} width={20} backgroundColor={STheme.color.warning} style={{ borderRadius: 40 }} />
                    <SView width={5} />
                    <SText>ENTREGA PARCIAL </SText>
                    <SText bold>({entrega_parcial})</SText>
                </SView>
                <SView col={"xs-12"} row>
                    <SView height={20} width={20} backgroundColor={STheme.color.danger} style={{ borderRadius: 40 }} />
                    <SView width={5} />
                    <SText>NO ENTREGADO </SText>
                    <SText bold>({no_entregado})</SText>
                </SView>
                <SView col={"xs-12"} row>
                    <SView height={20} width={20} backgroundColor={"#666"} style={{ borderRadius: 40 }} />
                    <SView width={5} />
                    <SText>NO VISITADOS </SText>
                    <SText bold>({no_visitados})</SText>
                </SView>
            </SView>
        </SView>


    }

    getMarkers = () => {
        if (!this.state?.data) return <></>;
        if (this.state?.data.length == 0) return <></>;

        return <SMapView.SMarker key={this.state.index}
            fill='#00f'
            ref={ref => this.marker = ref}
            latitude={parseFloat(this.state.data[this.state.index].lat)}
            longitude={parseFloat(this.state.data[this.state.index].lon)}
            fecha_on={this.state.data[this.state.index].fecha_on}
        ></SMapView.SMarker >
    }

    renerWithData() {
        if (this.state.error) return <SText>{JSON.stringify(this.state.error)}</SText>
        if (!this.state?.data) return <><SLoad /><SText>Buscando ruta...</SText></>
        if (!this.state?.ventas) return <><SLoad /><SText>Buscando ventas...</SText></>

        return <>
            <SRangeSlider
                range={[0, this.state.data.length - 1]}
                defaultValue={this.state.index}
                onChange={(e) => {
                    this.state.index = parseInt(e);
                    if (this.marker) {
                        this.marker.setCoordinate({
                            latitude: parseFloat(this.state.data[this.state.index].lat),
                            longitude: parseFloat(this.state.data[this.state.index].lon)
                        })
                    }

                    let datav = this.state.ventas;
                    let contador = 0;
                    let total = 0;

                    let fechaBase = this.state.fecha

                    this.mensaje.setLabel("visitas: " + contador + " / total: Bs. " + SMath.formatMoney(total) + " / " + new SDate(this.state.data[this.state.index]?.fecha_on, "yyyy-MM-ddThh:mm:ss").toString("yyyy-MM-dd hh:mm:ss"))

                    if (this.mensaje) {
                        if (this.mapa) {

                        }

                    }
                }} />
            <Mensajes ref={ref => this.mensaje = ref} />
        </>
    }


    render() {
        // console.log(this.state)
        return <SPage disableScroll>

            {this.cardDetalle()}
            <SMapView ref={ref => this.mapa = ref}>
                {this.getPolylines()}
                {this.renderMarkers()}
                {this.getMarkers()}

            </SMapView>
            <Container>
                {this.getHeader()}
                {this.renerWithData()}
                <SInput type='' placeholder={"Buscar..."} onChangeText={e => {
                    this.setState({ find: e })
                }} />
            </Container>
            <SHr height={30} />
        </SPage>
    }
}

class Mensajes extends Component {
    state = {
        label: "FECHA"
    }
    setLabel(label) {
        this.setState({ label: label })
    }
    render() {
        return <SText>{this.state.label}</SText>
    }
}