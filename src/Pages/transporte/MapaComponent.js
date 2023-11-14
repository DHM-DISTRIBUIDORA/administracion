import React, { Component } from 'react'
import { SBuscador, SMapView, SNavigation, SText, STheme, SView } from 'servisofts-component'
import SRC from '../../Components/SRC';
import MarkerCircle from '../../Components/Marker/MarkerCircle';
import SSocket from 'servisofts-socket'
import Model from '../../Model';



export default class MapaComponent extends Component {
    render() {
        const { state, setState } = this.props;

        const clientes = state.data ?? []
        let visitas_ok= {}
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
                            visita: visitas[0],
                        })
                    }

                },
            })
        })
        // if (!arrLatLng.length) return <SText>NO HAY UBICACIONES</SText>;
        return <SView col={"xs-12"} flex>
            <SMapView ref={map => {
                if (map) {
                    if (!arrLatLng.length) return;
                    map.fitToCoordinates(arrLatLng2, {
                        edgePadding: {
                            top: 100,
                            right: 100,
                            bottom: 100,
                            left: 100
                        },
                        animated: true,
                    
                    })
                    console.log("RTRTRTRT")
                }

            }}>
                <></>
                {arrLatLng.map(o => MarkerCircle(o))}
            </SMapView>
        </SView>
    }
}
