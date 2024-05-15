import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Parent } from '.';

import { SButtom, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SText, STheme, SView, SInput, SPopup, SGeolocation, SMapView, SThread } from 'servisofts-component';
// import { AccentBar, PButtom } from '../../Components';
import Model from '../../Model';
import { GeolocationMapSelect } from 'servisofts-rn-geolocation'
import Btn from '../../Components/PButtom';
import SGeolocation2 from '../../Components/SGeolocation2';
// import SMapView from 'servisofts-component/Component/SMapView';
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
        // if (this.state.nodefault) {
        //     this.center();
        // }
    }

    center() {
        SGeolocation2.getCurrentPosition({
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
                        placeholder={"Escribe la dirección"}
                        defaultValue={this?.obj?.clidir}
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
                        SPopup.alert("Se requiere alguna descripción para la dirección");
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
                            this.callback2();
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
        return (
            <SPage center disableScroll>
                <SView col={"xs-12"} flex center>
                    <SMapView
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        ref={(ref) => {
                            // this._ref[ref]
                            this.map = ref;
                            console.log(this.state)
                            if (this.state.nodefault) {
                                if (ref) {
                                    new SThread(100, "center").start(() => {
                                        ref.center();

                                    })
                                }
                            }
                        }}
                        onRegionChangeComplete={(evt) => {
                            // this.setState({ lat: evt.latitude, lon: evt.longitude })
                            this.state.lat = evt.latitude;
                            this.state.lon = evt.longitude;
                            console.log("onRegionChangeComplete")
                            console.log(evt)
                        }}
                        initialRegion={{
                            latitude: (this?.state?.lat != 0) ? this?.state?.lat : -17.783799,
                            longitude: (this?.state?.lon != 0) ? this?.state?.lon : -63.180,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}
                    >
                        <></>
                    </SMapView>
                    <SView width={25} height={39.5} center style={{ position: "absolute", }}>
                        <SImage src={require('../../Assets/img/markerc.png')}
                            style={{
                                position: "relative",
                                top: -15,
                            }}
                        />
                    </SView>
                </SView>
                {this.getComponentBottom()}
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);