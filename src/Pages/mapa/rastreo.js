import React, { Component } from 'react';
import { SHr, SIcon, SPage, SText, STheme, SView, SMapView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import SwitchRastreo from '../../Components/SwitchRastreo';
import Model from '../../Model';
import { connect } from 'react-redux';


class Mapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    toMap() {
        const location = Model.background_location.Action.getCurrentLocation();
        if (location && this.map) {
            console.log(location)
            this.map.animateToRegion({
                latitude: location?.latitude,
                longitude: location?.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }, 1000)
        }
    }
    componentDidUpdate() {
        this.toMap();

    }
    render() {
        const location = Model.background_location.Action.getCurrentLocation();

        return <SPage title={'Rastreo'} disableScroll>
            <SView col={"xs-12"} height={50} center>
                <SwitchRastreo />
            </SView>
            <SView col={"xs-12"} flex>
                <SMapView ref={ref => this.map = ref} initialRegion={{
                    latitude: location?.latitude ?? -17.783799,
                    longitude: location?.longitude ?? -63.180,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                    showsUserLocation={true}
                    onPress={(evt) => {
                        Model.background_location.Action.onChange({
                            ...evt.coordinate,
                            rotation: 1,
                        }, "onChange");
                    }}>
                    <></>
                    <SMapView.SMarker latitude={location?.latitude ?? 0} longitude={location?.longitude ?? 0} />
                </SMapView>
            </SView>
        </SPage>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Mapa);