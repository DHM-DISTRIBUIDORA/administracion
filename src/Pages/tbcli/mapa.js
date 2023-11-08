import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Parent } from '.';

import { SButtom, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SText, STheme, SView, SInput, SPopup, SGeolocation, } from 'servisofts-component';
// import { AccentBar, PButtom } from '../../Components';
import Model from '../../Model';
import { GeolocationMapSelect } from 'servisofts-rn-geolocation'
import Btn from '../../Components/PButtom';
// import PopupAutoCompleteDireccion from './profile/Components/PopupAutoCompleteDireccion';
// import PopupAutoCompleteDireccion from './Components/PopupAutoCompleteDireccion';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: SNavigation.getParam("lat", 0),
            lon: SNavigation.getParam("lon", 0),
            ready: false,
        };

        if (!this.state.lat || !this.state.lon) {
            this.state.nodefault = true;
            this.state.lat = -17.783799
            this.state.lon = -63.180
        }

        // this.pk = SNavigation.getParam("pk");

        this.callback = SNavigation.getParam("callback");
        this.obj = SNavigation.getParam("obj");
        this.callback2 = SNavigation.getParam("callback2");
        // this.hiddeDescripcion = SNavigation.getParam("hiddeDescripcion");
        // this.hiddeReferencia = SNavigation.getParam("hiddeReferencia");

        // this.lat = SNavigation.getParam("lat");
        // this.lon = SNavigation.getParam("lon");
        // this.all = SNavigation.getAllParams()
    }

    componentDidMount() {
        if (this.state.nodefault) {
            this.center();
        }
    }

    center() {
        SGeolocation.getCurrentPosition({
        }).then(e => {
            this.map.getMap().animateToRegion({
                latitude: e.coords.latitude,
                longitude: e.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            })
            this.setState({ lat: e.coords.latitude, lon: e.coords.longitude, ready: true })
            console.log(e);
        }).catch(e => {
            this.setState({ ready: true })
            console.error(e);
        })
    }
    getImput() {
        if (this.hiddeDescripcion) return null;
        return <SView col={"xs-12"} >
            <SInput fontSize={16} placeholder={"Nombre de la Ubicación"}
                isRequired={true}
                height={48}
            />
        </SView>
    }

    getComponentBottom() {
        return <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} height={180} center>
            <SHr height={10} />
            <SView col={"xs-11"} center row border={'transparent'}>
                <SView col={"xs-12"}>
                    <SHr height={5} />
                    <SInput
                        ref={ref => this.input = ref}
                        height={80}
                        style={{
                            backgroundColor: STheme.color.card,
                            fontSize: 14,
                            padding: 0,
                            margin: 0,
                            padding: 4,
                        }}
                        type='textArea'
                        // editable={false}
                        placeholder={"Escribe la direccion"}
                        // value={this.state?.data?.direccion ? `${this.state?.data?.direccion.substring(0, 50)}${this.state?.data?.direccion.length > 50 ? "..." : ""}` : ""}
                        defaultValue={this?.obj?.clidir}
                    // iconR={<SIcon name={"SearchTapeke"} width={40} height={18} fill={STheme.color.primary} />}
                    />
                </SView>
            </SView>
            <SHr />
            <SView col={"xs-8.8"} row center border={'transparent'}  >
                <Btn loading={this.state.loading} fontSize={16} onPress={() => {
                    var descripcion = "";
                    var referencia = "";

                    const valDir = this.input.getValue();
                    if (!valDir) {
                        SPopup.alert("Se requiere direccion ");
                        return;
                    }

                    var data = {
                        // descripcion: descripcion,
                        // referencia: referencia,
                        clilat: parseFloat(this.state?.lat),
                        clilon: parseFloat(this.state?.lon),
                        clidir: valDir
                    }
                    console.log(this.state)
                    if (this.callback) {
                        this.callback(data);
                        SNavigation.goBack();
                    }
                    if (this.callback2) {
                        Parent.model.Action.editar({
                            data: {
                                ...this.obj,
                                ...data
                            },
                            key_usuario: Model.usuario.Action.getKey()
                        }).then((resp) => {
                            SNavigation.goBack();
                        }).catch(e => {
                            console.error(e);
                        })
                    }
                }}>ELEGIR ESTA UBICACIÓN</Btn>
            </SView>
            <SHr height={10} />
        </SView>
    }
    render() {
        // if (!this.state.ready) return <SLoad />
        return (
            <SPage center disableScroll>
                <GeolocationMapSelect
                    initialRegion={{
                        // latitude: (this?.all?.lat != 0) ? this?.all?.lat : -17.783799,
                        // longitude: (this?.all?.lon != 0) ? this?.all?.lon : -63.180,
                        latitude: this.state.lat,
                        longitude: this.state.lon,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    ref={(map) => this.map = map}
                    icon={<SIcon name="MarcadorMapa" width={25} height={40} fill={STheme.color.primary} />}
                    onChange={(evt) => {
                        this.setState({ lat: evt.latitude, lon: evt.longitude })
                    }} />
                {this.getComponentBottom()}
                <SView style={{
                    width: 50,
                    height: 50,
                    position: "absolute",
                    bottom: 200,
                    right: 4,
                }} center card padding={8} onPress={() => { this.center() }}>
                    <SIcon name="Marker" width={20} height={20} />
                    <SText center fontSize={10} font='Roboto' underLine>Centrar</SText>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);