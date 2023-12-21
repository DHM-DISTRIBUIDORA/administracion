import React, { Component } from 'react'
import { SBuscador, SLoad, SMapView, SNavigation, SStorage, SText, STheme, SThread, SView } from 'servisofts-component'
import SRC from '../../Components/SRC';
import MarkerCircle from '../../Components/Marker/MarkerCircle';
import SSocket from 'servisofts-socket'
import Model from '../../Model';
import { Btn } from '../../Components';



export default class MapaComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            last_loc2: { latitude: -17.79, longitude: -63.13, latitudeDelta: 0.1, longitudeDelta: 0.1 }
        };
    }


    center(arrLatLng2) {
        if (!this.map) return;
        if (!arrLatLng2.length) return;
        this.map.fitToCoordinates(arrLatLng2, {})
    }

    componentDidMount() {

        SStorage.getItem("last_location2", resp => {
            if (!resp) {
                this.setState({ loading: true })
                return;
            };
            try {
                const last_ubicacion = JSON.parse(resp);
                // this.setState({
                //     last_loc: last_ubicacion
                // })
                this.state.last_loc2 = last_ubicacion
                this.state.loading = true;
                this.setState({ ...this.state })
            } catch (e) {
                this.setState({ loading: true })
                console.error(e);
            }
        })
    }

    render() {
        const { state, setState } = this.props;

        const clientes = state.data ?? []
        let visitas_ok = {}
        let arrLatLng = [];
        let arrLatLng2 = [];

        clientes.map(o => {
            console.log("00000000")
            console.log(o)

            console.log("state.visitas")
            console.log(state?.visitas[0])

            if (state?.visitas[0]) {
                visitas_ok = state?.visitas.find(a => a.idven == o.idven);
            }
            console.log("visitaaaaaaaaaaaaaaas")
            console.log(visitas_ok)

            // if (state.busqueda) {

            //     if (JSON.stringify(o).indexOf(state.busqueda) <= -1) return;
            // }
            if (!o.clilat || !o.clilon) return;
            if (state?.busqueda) {
                console.log(state.busqueda)
                console.log(o.clinom)
                if (!o.clinom.toLowerCase().includes(state.busqueda.toLowerCase())) return
            }
            arrLatLng2.push({
                latitude: o.clilat,
                longitude: o.clilon,
            })
            arrLatLng.push({
                latitude: o.clilat,
                longitude: o.clilon,
                src: SRC.tbcli(o.idcli),
                borderColor: visitas_ok ? "#0f0" : STheme.color.primary,
                content: o.clinom,
                onPress: () => {

                    // this.realizarVisita(o);
                    if (!visitas_ok) {
                        SNavigation.navigate("/transporte/pedidoDetalle", {
                            // SNavigation.navigate("/vendedor/cliente", {
                            // pk: o.idcli + "",
                            idven: o.idven + "",
                            idemp: this.props?.state?.idemp,
                            visitaType: "transporte",
                            visita: visitas_ok[0],

                            onVisitaSuccess: ({ descripcion, tipo }) => {
                                // if (this.state.loading) return null;
                                // if (this.state.visitas[o.idcli]) return null;
                                setState({ loading: true })
                                SSocket.sendPromise({
                                    component: "visita_vendedor",
                                    type: "registro",
                                    estado: "cargando",
                                    key_usuario: Model.usuario.Action.getKey(),
                                    data: {
                                        idemp: state.idemp,
                                        idcli: o.idcli,
                                        descripcion: descripcion,
                                        tipo: tipo,
                                        fecha: state.curdate.toString("yyyy-MM-dd")
                                    }
                                }).then(e => {
                                    state.visitas[0] = e.data;
                                    setState({ loading: false })
                                    SNavigation.goBack();

                                }).catch(e => {
                                    console.error(e)
                                    setState({ loading: false })
                                })
                            }
                        })
                    } else {
                        SNavigation.navigate("/transporte/pedidoDetalle", {
                            // pk: o.idcli + "",
                            // visita: visitas[o.idcli],
                            idven: o.idven + "",
                            idemp: this.props?.state?.idemp,
                            visitaType: "transporte",
                            visita: state?.visitas[0],
                        })
                    }

                },
            })
        })
        // if (!arrLatLng.length) return <SText>NO HAY UBICACIONES</SText>;
        if (!arrLatLng2.length) return <SView col={"xs-12"} flex center>
            <SText bold fontSize={18}>NO HAY UBICACIONES PARA VISITAR</SText>
        </SView>
        // new SThread(1000, "centermap", true).start(() => {
        //     this.center(arrLatLng2)
        // })
        console.log("this.state?.last_loc2")
        console.log(this.state?.last_loc2)
        if (!this.state.loading) return <SLoad />

        return <SView col={"xs-12"} flex>
            <SMapView
                showsUserLocation={true} // here is what I thought should show it
                showsMyLocationButton={true}
                initialRegion={{

                    latitude: this.state?.last_loc2?.latitude,
                    longitude: this.state?.last_loc2?.longitude,
                    latitudeDelta: this.state?.last_loc2?.latitudeDelta,
                    longitudeDelta: this.state?.last_loc2?.longitudeDelta

                    // latitude: -17.783799,
                    // longitude: -63.180,
                    // latitudeDelta: 0.1,
                    // longitudeDelta: 0.1
                }}

                ref={map => {
                    // if (map) {
                    //     if (!arrLatLng.length) return;
                    //     map.fitToCoordinates(arrLatLng2, {
                    //         edgePadding: {
                    //             top: 100,
                    //             right: 100,
                    //             bottom: 100,
                    //             left: 100
                    //         },
                    //         animated: true,

                    //     })
                    //     console.log("RTRTRTRT")
                    // }

                    this.map = map;

                }}
                onRegionChangeComplete={(evt) => {
                    SStorage.setItem("last_location2", JSON.stringify(evt))
                    console.log("onRegionChangeComplete")
                    console.log(evt)
                }}
            >
                <></>
                {arrLatLng.map(o => MarkerCircle(o))}
            </SMapView>
            <Btn onPress={() => {
                this.center(arrLatLng2)
            }}>CENTRAR</Btn>
        </SView>
    }
}
