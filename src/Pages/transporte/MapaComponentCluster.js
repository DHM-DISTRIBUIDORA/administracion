import React, { Component } from 'react'
import { SMapView, SView, SLoad, SNavigation, SThread, SText, STheme, SMapView2, SStorage } from 'servisofts-component'

// import ClusteredMapView from "react-native-maps-super-cluster"
import { Text, View } from 'react-native';
import MarkerCircle from '../../Components/Marker/MarkerCircle';
import { Btn } from '../../Components';
export default class MapaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            last_loc: { latitude: -17.79, longitude: -63.13, latitudeDelta: 0.1, longitudeDelta: 0.1 }
        };
    }

    center(arrLatLng2) {
        if (!this.map) return;
        if (!arrLatLng2.length) return;
        this.map.fitToCoordinates(arrLatLng2, {})
    }

    componentDidMount() {
        SStorage.getItem("last_location", resp => {
            if (!resp) {
                this.setState({ loading: true })
                return;
            };
            try {
                const last_ubicacion = JSON.parse(resp);
                this.state.last_loc = last_ubicacion
                this.state.loading = true;
                this.setState({ ...this.state })
            } catch (e) {
                this.setState({ loading: true })
                console.error(e);
            }
        })
    }


    handlePressClient = (data, visita, tbvd) => {

        SNavigation.navigate("/transporte/pedidoDetalle", {
            idven: data.id + "",
            idemp: this.props?.state?.idemp,
            visitaType: "transporte",
            visita: visita,
            // pk: vd.idcli + "",
        })
        // SNavigation.navigate("/tbcli/profile", {
        //     // SNavigation.navigate("/vendedor/cliente", {
        //     pk: data.id + "",
        //     idemp: this.props?.state?.idemp,
        //     visitaType: "transporte",
        //     visita: visita,
        //     tbvd: tbvd
        // })
    }

    render() {
        const { state, setState } = this.props;
        const clientes = state.data ?? []
        if (!clientes) return <SLoad />
        let data = [];
        let dataLatLng = [];

        clientes.map(o => {
            if (!o.clilat || !o.clilon) return;
            if (state?.busqueda) {
                console.log(state.busqueda)
                console.log(o.clinom)
                if (!o.clinom.toLowerCase().includes(state.busqueda.toLowerCase())) return
            }
            data.push({ id: o.idven, clinom: o.clinom, tbvd: o.tbvd, location: { latitude: o.clilat, longitude: o.clilon } });
            dataLatLng.push({ latitude: o.clilat, longitude: o.clilon });
        });

        const renderCluster = (data, onPressCluster, keys) => {
            // console.log("dataaaaaaaaaaaa");
            // console.log(data);


            // console.log(this.props.state);
            let onPress = onPressCluster;
            // const visita = null;

            let visita;
            if (this.props.state?.visitas) {
                visita = this.props.state?.visitas.find(a => a.idven == data.id);


            }
            if (data.count == 1) {
                onPress = this.handlePressClient.bind(this, data, visita, data.tbvd)
            }
            return MarkerCircle({
                borderColor: !visita ? STheme.color.primary : "#0f0",
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
        // new SThread(1000, "centermap", true).start(() => {
        //     if(this.state?.last_loc?.latitude == -17.79) {
        //         this.center(dataLatLng)
        //         // return;
        //     }else{
        //         this.center(this.state?.last_loc)
        //     }
        // })

        console.log("this.state?.last_loc")
        console.log(this.state?.last_loc)
        if (!this.state.loading) return <SLoad />
        return <SView col={"xs-12"} flex>
            <SMapView.Cluster
                ref={map => {
                    this.map = map;
                }}
                initialRegion={{

                    latitude: this.state?.last_loc?.latitude,
                    longitude: this.state?.last_loc?.longitude,
                    latitudeDelta: this.state?.last_loc?.latitudeDelta,
                    longitudeDelta: this.state?.last_loc?.longitudeDelta

                    // latitude: -17.79,
                    // longitude: -63.13,
                    // latitudeDelta: 0.1,
                    // longitudeDelta: 0.1,
                }}
                onClusterPress={(data, markers) => {
                    console.log(data, markers);
                    console.log(state.idemp)
                    SNavigation.navigate("/transporte/list", { pk: state.idemp, datas: markers })
                }}
                renderMarker={renderCluster}
                renderCluster={renderCluster}
                showsUserLocation={true} // here is what I thought should show it
                showsMyLocationButton={true}
                data={data}
                onRegionChangeComplete={(evt) => {
                    SStorage.setItem("last_location", JSON.stringify(evt))
                    console.log("onRegionChangeComplete")
                    console.log(evt)
                }}

            />

            <Btn onPress={() => {
                this.center(dataLatLng)
            }}>CENTRAR PEDIDOS</Btn>
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
