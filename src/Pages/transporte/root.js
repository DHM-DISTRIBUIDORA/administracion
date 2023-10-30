import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SBuscador, SDate, SHr, SInput, SLoad, SMapView, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component'
import Model from '../../Model'
import SSocket from 'servisofts-socket'
import MapaComponent from './MapaComponentCluster';
import DetalleMapaComponent from './DetalleMapaComponent';
import DataBase from '../../DataBase'
import { Trigger } from 'servisofts-db'
export default class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // curdate: new SDate("2023-08-28", "yyyy-MM-dd"),
            curdate: new SDate(SNavigation.getParam("fecha"), "yyyy-MM-dd"),
            idemp: SNavigation.getParam("idemp"),
            fecha: SNavigation.getParam("fecha"),
        }
    }
    componentDidMount() {
        this.loadDataAsync();
        this.t1 = Trigger.addEventListener({
            on: ["insert", "update", "delete"],
            tables: ["visita_transportista"]
        }, (evt) => {
            this.loadDataAsync();
        });
    }
    componentWillUnmount() {
        Trigger.removeEventListener(this.t1);
    }

    async loadDataAsync() {
        this.setState({ loading: true })
        try {
            const ventas = await DataBase.ventas_factura.all()
            const visitas = await DataBase.visita_transportista.all();
            this.setState({
                loading: false,
                data: ventas,
                visitas: visitas
            })

        } catch (error) {
            this.setState({ loading: false })
            console.error(error);
        }
    }
    render() {
        return <SPage disableScroll title={this.state.curdate.toString("DAY, dd de MONTH.")}>
            <SView col={"xs-12"} center row padding={4} height={50}>
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
            {/* <SLoad type='window' hidden={!this.state.loading} /> */}
        </SPage>
    }
}
