import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SHr, SLoad, SMapView, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component'
import Model from '../../Model'
import MarkerCircle from '../../Components/Marker/MarkerCircle';
import SRC from '../../Components/SRC';
import SSocket from 'servisofts-socket'
export default class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // curdate: new SDate("2023-08-28", "yyyy-MM-dd")
            curdate: new SDate()
        }
        this.idemp = SNavigation.getParam("idemp");
    }
    componentDidMount() {

        Model.tbcli.Action.getClientesDia({ idemp: this.idemp, sdate: this.state.curdate }).then((e) => {
            this.setState({
                data: e.data, visitas: e.visitas
            })
        }).catch(e => {
            console.error(e);
        })
    }

    realizarVisita(o, { descripcion, tipo }) {
        if (this.state.loading) return null;
        if (this.state.visitas[o.idcli]) return null;
        this.setState({ loading: true })
        SSocket.sendPromise({
            component: "visita_vendedor",
            type: "registro",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            data: {
                idemp: this.idemp,
                idcli: o.idcli,
                descripcion: descripcion,
                tipo: tipo,
                fecha: this.state.curdate.toString("yyyy-MM-dd")
            }
        }).then(e => {
            this.state.visitas[o.idcli] = e.data;
            this.setState({ loading: false })
        }).catch(e => {
            console.error(e)
            this.setState({ loading: false })
        })
    }
    renderMap() {
        if (!this.state.data) return <SLoad />
        const arrLatLng = []
        this.state.data.map(o => {
            if (!o.clilat || !o.clilon) return;
            arrLatLng.push({
                latitude: o.clilat,
                longitude: o.clilon,
                src: SRC.tbcli(o.idcli),
                onPress: () => {
                    // this.realizarVisita(o);
                    if (!this.state.visitas[o.idcli]) {
                        SNavigation.navigate("/tbcli/profile", {
                            // SNavigation.navigate("/vendedor/cliente", {
                            pk: o.idcli + "",

                            onVisitaSuccess: ({ descripcion, tipo }) => {
                                SNavigation.goBack();
                                this.realizarVisita(o, { descripcion, tipo });
                            }
                        })
                    } else {
                        SNavigation.navigate("/tbcli/profile", {
                            pk: o.idcli + "",
                            visita: this.state.visitas[o.idcli],
                        })
                    }

                },
                borderColor: !this.state.visitas[o.idcli] ? STheme.color.danger : STheme.color.success,
                content: o.clicod
            })
        })
        if (!arrLatLng.length) return <SText>NO TIENES CLIENTES POR VICITAR ESTE DIA</SText>
        return <SMapView ref={map => {
            if (map) this.map = map
            this.map.fitToCoordinates(arrLatLng, {})
        }}>
            {arrLatLng.map(o => MarkerCircle(o))}
        </SMapView>
    }

    render() {
        return <SPage disableScroll title={this.state.curdate.toString("DAY, dd de MONTH.")}>
            <SView col={"xs-12"} flex>
                {this.renderMap()}
            </SView>
            <DetalleMapaComponent state={this.state} />
            <SLoad type='window' hidden={!this.state.loading} />
            {/* <SText>Esta sera la parte del vendor</SText>
            <SHr />
            <SText>DEBO MOSTRAR LOS CLIENTES QUE DEBO VICITAR EL DIA DE HOY EN LAS DIFERENTES ZONAS</SText>
            <SText>TAMBIEN MOSTRAR SI YA ESTA VICITADO</SText> */}

        </SPage>
    }
}

const DetalleMapaComponent = ({ state }) => {
    if (!state.data) return <SLoad />
    const clientes = state.data;
    const clientes_con_ubicacion = clientes.filter(a => !!a.clilat && !!a.clilon)
    const clientes_sin_ubicacion = clientes.filter(a => !a.clilat || !a.clilon)
    const clientes_visitados = clientes.filter(a => !!state.visitas[a.idcli])

    return <SView col={"xs-12"} height={100} backgroundColor={STheme.color.background}>
        <SText>clientes_con_ubicacion: {clientes_con_ubicacion.length}</SText>
        <SText>clientes_sin_ubicacion: {clientes_sin_ubicacion.length}</SText>
        <SText>visitas: {`( ${clientes_visitados.length} / ${clientes.length} )`}</SText>
    </SView>
}