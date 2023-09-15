import React, { Component } from 'react'
import { SBuscador, SMapView, SNavigation, SText, STheme, SThread, SView } from 'servisofts-component'
import SRC from '../../Components/SRC';
import MarkerCircle from '../../Components/Marker/MarkerCircle';
import SSocket from 'servisofts-socket'
import Model from '../../Model';
import { Btn } from '../../Components';



export default class MapaComponent extends Component {

    componentDidMount(){
        
    }
    center(arrLatLng2) {
        if (!this.map) return;
        if (!arrLatLng2.length) return;
        this.map.fitToCoordinates(arrLatLng2, {})
    }
    render() {
        const { state, setState } = this.props;
        const clientes = state.data ?? []
        const visitas = state.visitas ?? {};
        let arrLatLng = [];
        let arrLatLng2 = [];

        const handleOnPress = (o) => {
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
        }
        clientes.map(o => {
            if (!o.clilat || !o.clilon) return;
            arrLatLng2.push({ latitude: o.clilat, longitude: o.clilon })
            arrLatLng.push({
                latitude: o.clilat,
                longitude: o.clilon,
                src: SRC.tbcli(o.idcli),
                borderColor: !visitas[o.idcli] ? STheme.color.danger : STheme.color.success,
                content: o.clinom,
                onPress: handleOnPress.bind(this, o),
            })
        })
        if (!arrLatLng.length) return <SText>NO HAY UBICACIONES</SText>;
        new SThread(1000, "centermap", true).start(()=>{
            this.center(arrLatLng2)
        })
        return <SView col={"xs-12"} flex>
            <SMapView ref={map => {
                this.map = map;
                this.center(arrLatLng2)

            }}>
                <></>
                {arrLatLng.map(o => MarkerCircle(o))}
            </SMapView>
            {/* <Btn onPress={()=>{
                this.center(arrLatLng2)
                console.log("asdad")
            }}>CENTRAR</Btn> */}
        </SView>
    }
}
