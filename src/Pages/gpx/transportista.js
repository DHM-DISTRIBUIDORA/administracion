import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SInput, SLoad, SMapView, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket'
import { getGPXDiaUsuario } from './Functions';
import { SelectFecha } from '../../Components/Fechas';

export default class transportista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fecha: SNavigation.getParam("fecha"),
            // fecha_recorrido: new SDate().toString("yyyy-MM-dd"),
            idemp: SNavigation.getParam("idemp"),
            key_usuario: SNavigation.getParam("key_usuario")
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



    loadGpx(fecha) {
        getGPXDiaUsuario({ fecha: fecha, key_usuario: this.state.key_usuario }).then(e => {
            e.sort((a, b) => a.fecha_on > b.fecha_on ? 1 : -1)
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
        return this.state.ventas.map(obj => {
            let color = "#666"
            if (this.state.visita) {
                let visita = this.state.visita[obj.idven];
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
            return <SMapView.SMarker latitude={obj.clilat} longitude={obj.clilon} fill={color}></SMapView.SMarker>
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
                    <SInput defaultValue={this.state.fecha} label={"Fecha de los pedidos"} type='date' />
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
                if (o.fecha_on.substring(0, 18) <= last_start.fecha_on.substring(0, 18)) return;
                if (!last_stop) {
                    // if (o.fecha_on.substring(0, 18) > activacion.fecha_on.substring(0, 18)) return;
                } else {
                    if (o.fecha_on.substring(0, 18) > activacion.fecha_on.substring(0, 18)) return;
                    if (o.fecha_on.substring(0, 18) <= last_stop.fecha_on.substring(0, 18)) return;
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
    render() {
        // console.log(this.state)
        return <SPage disableScroll>
            {this.getHeader()}
            <SMapView ref={ref => this.mapa = ref}>
                {this.getPolylines()}
                {this.renderMarkers()}

            </SMapView>
        </SPage>
    }
}