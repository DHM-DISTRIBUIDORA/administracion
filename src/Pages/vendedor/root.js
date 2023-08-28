import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SBuscador, SDate, SHr, SInput, SLoad, SMapView, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component'
import Model from '../../Model'
import SSocket from 'servisofts-socket'
import MapaComponent from './MapaComponent';
import DetalleMapaComponent from './DetalleMapaComponent';
import SwitchRastreo from '../../Components/SwitchRastreo'
export default class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // curdate: new SDate("2023-08-28", "yyyy-MM-dd"),
            curdate: new SDate(),
            idemp: SNavigation.getParam("idemp"),
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        Model.tbcli.Action.getClientesDia({ idemp: this.state.idemp, sdate: this.state.curdate }).then((e) => {
            this.setState({
                loading: false,
                data: e.data, visitas: e.visitas
            })
        }).catch(e => {
            this.setState({ loading: false })
            console.error(e);
        })
    }

    // realizarVisita(o, { descripcion, tipo }) {
    //     if (this.state.loading) return null;
    //     if (this.state.visitas[o.idcli]) return null;
    //     this.setState({ loading: true })
    //     SSocket.sendPromise({
    //         component: "visita_vendedor",
    //         type: "registro",
    //         estado: "cargando",
    //         key_usuario: Model.usuario.Action.getKey(),
    //         data: {
    //             idemp: this.idemp,
    //             idcli: o.idcli,
    //             descripcion: descripcion,
    //             tipo: tipo,
    //             fecha: this.state.curdate.toString("yyyy-MM-dd")
    //         }
    //     }).then(e => {
    //         this.state.visitas[o.idcli] = e.data;
    //         this.setState({ loading: false })
    //     }).catch(e => {
    //         console.error(e)
    //         this.setState({ loading: false })
    //     })
    // }



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
