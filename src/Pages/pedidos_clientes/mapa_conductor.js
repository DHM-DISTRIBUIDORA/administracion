import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView, SInput, SMapView2, SThread } from 'servisofts-component';
import { BottomNavigator, Container, TopBar } from '../../Components';

import SSocket, { setProps } from 'servisofts-socket';
import Pedido from '../../Components/Pedido';
import Model from '../../Model';
export default class mapa_conductor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: -17.7833276,
                longitude: -63.1821408,
            }
        };
        // this.idcli = Model.tbcli.Action.getCliente()?.idcli
        this.idven = SNavigation.getParam("pk");
    }

    componentDidMount() {
        SSocket.sendPromise({
            component: "dm_cabfac",
            type: "getPedido",
            idven: this.idven,


        }).then(e => {
            console.log(e);
            this.setState({ data: e.data[0] })
        }).catch(e => {
            console.error(e);
        })
    }

    showMapa() {
        if (!this.state.data) return null;
        return <SView col={"xs-12"} flex center >
            <SMapView2 initialRegion={
                {
                    latitude: (this.state.data?.vlatitud + this.state.data?.vlatitud) / 2,
                    longitude: (this.state.data?.vlongitud + this.state.data?.vlongitud) / 2,
                    latitudeDelta: 0.0722,
                    longitudeDelta: 0.0421,
                }} preventCenter>
                {/* <Restaurante.Marker data={this.props.data?.restaurante}
                    lat={this.props.data?.restaurante?.latitude}
                    lng={this.props.data?.restaurante?.longitude}
                    latitude={this.props.data?.restaurante?.latitude}
                    longitude={this.props.data?.restaurante?.longitude} /> */}
                <SMarker lat={this.state.data?.vlatitud} lng={this.state.data?.vlongitud} >
                    <SIcon name={"MarcadorMapa"} width={40} height={40} fill={"#FA790E"} />
                </SMarker>
                {!this.state.posicion_conductor ? null : <SMarker lat={this.state.posicion_conductor?.latitude} lng={this.state?.posicion_conductor?.longitude} >
                    <SIcon name={"MarkerLocation"} width={50} height={50} fill={"#FA790E"} />
                </SMarker>}
            </SMapView2>
        </SView>
    }

    showCards() {
        return <SView height={200} style={{ backgroundColor: STheme.color.primary, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            {/* <Pedido.BotonesEstado data={this.props.data} posicion_conductor={this.state?.posicion_conductor} /> */}
            <Pedido.BotonesEstado data={this.state.data} />
        </SView>
    }


    render() {
        return <SPage disableScroll
            title={"Repartidor en Mapa"}
        // hidden
        // footer={this.footer()}
        >
            <SView col={"xs-12"} flex height backgroundColor={STheme.color.card}   >
                {this.showMapa()}
                {this.showCards()}
            </SView>
        </SPage>
    }


    // footer() {
    //     return <BottomNavigator url={"/pedidos"} />
    // }

}
// const initStates = (state) => {
//     return { state }
// };
// export default connect(initStates)(index);