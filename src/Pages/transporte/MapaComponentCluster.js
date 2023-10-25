import React, { Component } from 'react'
import { SMapView, SView, SLoad, SNavigation, SThread, SText } from 'servisofts-component'

// import ClusteredMapView from "react-native-maps-super-cluster"
import { Text, View } from 'react-native';
import MarkerCircle from '../../Components/Marker/MarkerCircle';
import { Btn } from '../../Components';
export default class MapaComponent extends Component {

    center(arrLatLng2) {
        if (!this.map) return;
        if (!arrLatLng2.length) return;
        this.map.fitToCoordinates(arrLatLng2, {})
    }

    handlePressClient = (data, visita, tbvd) => {
        console.log(tbvd);
        SNavigation.navigate("/tbcli/profile", {
            // SNavigation.navigate("/vendedor/cliente", {
            pk: data.id + "",
            idemp: this.props?.state?.idemp,
            visitaType: "transporte",
            visita: visita,
            tbvd: tbvd
        })
    }
    render() {
        const { state, setState } = this.props;
        const clientes = state.data ?? []
        if (!clientes) return <SLoad />
        let data = [];
        let dataLatLng = [];

        clientes.map(o => {
            if (!o.clilat || !o.clilon) return;
            data.push({ id: o.idcli, clinom: o.clinom, tbvd: o.tbvd, location: { latitude: o.clilat, longitude: o.clilon } });
            dataLatLng.push({ latitude: o.clilat, longitude: o.clilon });
        });

        const renderCluster = (data, onPressCluster, keys) => {
            let onPress = onPressCluster;
            // const visita = null;
            console.log(data)

            let visita;
            if (this.props.state?.visitas) {
                visita = this.props.state?.visitas.find(a => a.idcli == data.id);


            }
            if (data.count == 1) {
                onPress = this.handlePressClient.bind(this, data, visita, data.tbvd)
            }
            return MarkerCircle({
                borderColor: !visita ? "" : "#0f0",
                latitude: data.location.latitude, longitude: data.location.longitude,
                onPress: onPress,
                key: data.id,
                content: data.clinom,
                cantidad: data.count > 1 ? data.count : 0
            })
        }


        if (!dataLatLng.length) return <SView col={"xs-12"} flex center>
            <SText bold fontSize={18}>NO HAY UBICACIONES PARA VISITAR</SText>
        </SView>
        new SThread(1000, "centermap", true).start(() => {
            this.center(dataLatLng)
        })
        return <SView col={"xs-12"} flex>
            <SMapView.Cluster
                ref={map => {
                    this.map = map;
                }}
                initialRegion={{
                    latitude: -17.79,
                    longitude: -63.13,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                onClusterPress={(data, markers) => {
                    console.log(data, markers);
                    console.log(state.idemp)
                    SNavigation.navigate("/transporte/list", { pk: state.idemp, datas: markers })
                }}
                renderMarker={renderCluster}
                renderCluster={renderCluster}
                data={data}
            />
            <Btn onPress={() => {
                this.center(dataLatLng)
            }}>CENTRAR</Btn>
        </SView>
    }
}
const styles = {
    clusterWrapper: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clusterText: {
        color: 'white',
    },
};
