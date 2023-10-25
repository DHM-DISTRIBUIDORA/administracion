import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SBuscador, SDate, SHr, SInput, SLoad, SMapView, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component'
import Model from '../../Model'
import SSocket from 'servisofts-socket'
import MapaComponent from './MapaComponentCluster';
import DetalleMapaComponent from './DetalleMapaComponent';
import SwitchRastreo from '../../Components/SwitchRastreo'
export default class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // curdate: new SDate("2023-08-28", "yyyy-MM-dd"),
            curdate: new SDate(),
            idemp: SNavigation.getParam("idemp"),
            fecha_inicio: SNavigation.getParam("fecha_inicio"),
            fecha_fin: SNavigation.getParam("fecha_fin"),
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        SSocket.sendPromise({
            component: "tbemp",
            type: "getVentasFactura",
            idemp: this.state.idemp,
            fecha: this.state.fecha_inicio
        }).then((e) => {
            this.setState({
                loading: false,
                data: Object.values(e.data),
                visitas: e.visitas
            })
        }).catch(e => {
            this.setState({ loading: false })
            console.error(e);
        })
    }

    render() {
        return <SPage disableScroll title={this.state.curdate.toString("DAY, dd de MONTH.")}>
            <SView col={"xs-12"} center row padding={4} height={50}>
                <SwitchRastreo height={18} width={80} />
                <SView width={4} />
                <SView flex center>
                    <SBuscador onChange={(e) => {
                        this.setState({ busqueda: e })
                    }} />
                    {/* <SInput placeholder={"Buscar al cliente"} /> */}
                    {/* <SText col={"xs-11"} fontSize={12}>Activate para visitar a tus clientes.</SText> */}
                </SView>
            </SView>
            <SView col={"xs-12"} flex>
                <MapaComponent state={this.state} setState={this.setState.bind(this)} />
                <DetalleMapaComponent state={this.state} setState={this.setState.bind(this)} />
            </SView>
            <SLoad type='window' hidden={!this.state.loading} />
        </SPage>
    }
}
