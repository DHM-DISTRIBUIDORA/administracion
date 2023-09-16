import React, { Component } from 'react'
import { SMapView, SView, SLoad, SNavigation } from 'servisofts-component'

// import ClusteredMapView from "react-native-maps-super-cluster"
import { Text, View } from 'react-native';
export default class MapaComponent extends Component {


    render() {
        const { state, setState } = this.props;
        const clientes = state.data ?? []
        if (!clientes) return <SLoad />
        let data = [
        ];

        clientes.map(o => {
            if (!o.clilat || !o.clilon) return;
            data.push({ id: o.idcli, location: { latitude: o.clilat, longitude: o.clilon } });

        });

        const renderCluster = (data, onPressCluster) => {
            let color = "#f0f"
            let onPress = onPressCluster;
            if (data.count == 1) {
                color = "#ff0"
                onPress = () => {
                    SNavigation.navigate("/tbcli/profile", {
                        pk: data.id + "",
                    });
                }
            }
            return (
                <SMapView.SMarker key={data.id} {...data.location} onPress={onPress} width={50} height={50}>
                    <View style={{ ...styles.clusterWrapper, backgroundColor: color }}>
                        <Text style={styles.clusterText}>
                            {data.count}
                        </Text>
                    </View>
                </SMapView.SMarker>
            );
        };


        return <SView col={"xs-12"} flex>
            <SMapView.Cluster
                initialRegion={{
                    latitude: -17.79,
                    longitude: -63.13,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                renderMarker={renderCluster}
                renderCluster={renderCluster}
                data={data}
            />
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
