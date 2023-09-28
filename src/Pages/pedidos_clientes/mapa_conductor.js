import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView, SInput, SMapView2, SThread } from 'servisofts-component';
import { BottomNavigator, Container, FloatButtomTap, TopBar } from '../../Components';

import SSocket, { setProps } from 'servisofts-socket';
import Pedido from '../../Components/Pedido';
import Model from '../../Model';
class index extends Component {

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
            component: "tbven",
            type: "getConductor",
            idven: this.idven,
        }).then(e => {
            console.log(e);
            this.setState({ data: e.data[0] })
        }).catch(e => {
            console.error(e);
        })
        this.isRun = true;
        this.hilo();
    }

    componentWillUnmount() {
        this.isRun = false;
    }

    hilo() {
        if (!this.isRun) return;
        new SThread(5000, "hilo_rastreo", true).start(() => {
            if (!this.isRun) return;
            this.sync_location();
            this.hilo();
            
        })
    }

    sync_location() {
        if(!this.state?.usuario?.key) return;
        Model.background_location.Action.getByKeyAsync(this.state?.usuario?.key).then(r => {
            console.log("actualiza/repinta la ubicacion conductor", r);
            this.state.posicion_conductor = r.data;
            this.setState({ ...this.state });
        }).catch(r => {
            console.log(r)
        })
    }
    showMapa() {

        if (!this.state.data) return null;
        return <SView col={"xs-12"} flex center >
            <SMapView
                initialRegion={{
                    latitude: (this.state.region.latitude),
                    longitude: (this.state.region.longitude),
                    latitudeDelta: 0.0722,
                    longitudeDelta: 0.0421,
                }}
                preventCenter>
                <></>
                {/* <Restaurante.Marker data={this.props.data?.restaurante}
                    lat={this.props.data?.restaurante?.latitude}
                    lng={this.props.data?.restaurante?.longitude}
                    latitude={this.props.data?.restaurante?.latitude}
                    longitude={this.props.data?.restaurante?.longitude} />  */}
                {/* <SMarker lat={this.state.data?.vlatitud} lng={this.state.data?.vlongitud} >
                    <SIcon name={"MarcadorMapa"} width={40} height={40} fill={"#FA790E"} />
                </SMarker> */}
                {!this.state.posicion_conductor ? null : <SMapView.SMarker width={50} height={50} latitude={this.state.posicion_conductor?.latitude} longitude={this.state?.posicion_conductor?.longitude} >
                    <SIcon name={"Marker"} width={50} height={50} fill={STheme.color.primary} />
                </SMapView.SMarker>}
            </SMapView>
        </SView>
    }

    showCards() {
        return <SView height={200} style={{ backgroundColor: STheme.color.primary, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            {/* <Pedido.BotonesEstado data={this.props.data} posicion_conductor={this.state?.posicion_conductor} /> */}
            <Pedido.BotonesEstado data={this.state.data} />
        </SView>
    }


    render() {
        this.users = Model.usuario.Action.getAll();
        if (!this.users) return <SLoad />

        let user = {}
        if (this.state.data) {
            user = Object.values(this.users).find(o => o.idtransportista == this.state.data.idemp)
            this.state.usuario = user
        }

        return <SPage disableScroll
            title={"Repartidor en Mapa"}
        // hidden
        // footer={this.footer()}
        >
            <SView col={"xs-12"} flex height backgroundColor={STheme.color.card}   >
                <SView col={"xs-12"} flex>
                    {this.showMapa()}
                    <FloatButtomTap onPress={() => {
                        this.sync_location();
                    }} />
                </SView>
                {this.showCards()}
            </SView>

        </SPage>
    }


    // footer() {
    //     return <BottomNavigator url={"/pedidos"} />
    // }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);