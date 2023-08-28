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
        const visitas = state.visitas ?? {};
        let arrLatLng = [];
        let arrLatLng2 = [];
        clientes.map(o => {
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
                borderColor: !visitas[o.idcli] ? STheme.color.danger : STheme.color.success,
                content: o.clicod,
                onPress: () => {
                    // this.realizarVisita(o);
                    if (!visitas[o.idcli]) {
                        SNavigation.navigate("/tbcli/profile", {
                            // SNavigation.navigate("/vendedor/cliente", {
                            pk: o.idcli + "",

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
                                    state.visitas[o.idcli] = e.data;
                                    setState({ loading: false })
                                    SNavigation.goBack();

                                }).catch(e => {
                                    console.error(e)
                                    setState({ loading: false })
                                })
                            }
                        })
                    } else {
                        SNavigation.navigate("/tbcli/profile", {
                            pk: o.idcli + "",
                            visita: visitas[o.idcli],
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

                    })
                }

            }}>
                <></>
                {arrLatLng.map(o => MarkerCircle(o))}
            </SMapView>
        </SView>
    }
}
