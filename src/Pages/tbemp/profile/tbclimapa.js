import React, { Component } from 'react';
import { SHr, SIcon, SPage, SText, STheme, SView, SMapView, SLoad, SNavigation } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../../Model';
import { Parent } from ".."
import { connect } from 'react-redux';
import MarkerCircle from '../../../Components/Marker/MarkerCircle';


// const Parent2 = {
//     name: "Clientes del empleado",
//     path: `/tbcli`,
//     model: Model.tbcli
// }

const Marker = React.memo(({ onPress }) => <SView width={20} height={20} center onPress={onPress}>
    <SIcon name={"Marker"} fill={STheme.color.text} />
</SView>, (prevProps, nextProps) => prevProps === nextProps);
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ...this.state,
        };
        this.pk = SNavigation.getParam("pk")
    }


    renderMapa(data) {
        if (!data) return null;

        var latPadre = this.calcularPromedio(data, 'clilat');
        var longPadre = this.calcularPromedio(data, 'clilon');
        let arr = [];
        Object.values(data).map((obj) => {
            if (!obj.clilat || !obj.clilon) return null;
            arr.push({ id: obj.idcli, clinom: obj.clinom, location: { latitude: obj.clilat, longitude: obj.clilon } })
        });
        const HanndleOnPress = (obj) => {
            SNavigation.navigate("/tbcli/profile", { pk: obj.id })
        }
        const RenderMarker = (obj, onPress) => {
            return MarkerCircle({
                latitude: obj?.location.latitude,
                longitude: obj?.location.longitude,
                src: SSocket.api.root + "tbcli/" + obj?.id,
                label: obj.clinom,
                size: 40,
                cantidad: obj.count > 1 ? obj.count : 0,
                onPress: obj.count <= 1 ? HanndleOnPress.bind(this, obj) : onPress,
                // cantidad: obj?.cantidad
            })
        }
        return <SMapView.Cluster initialRegion={{
            latitude: latPadre,
            longitude: longPadre,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }}
            renderMarker={RenderMarker}
            renderCluster={RenderMarker}
            data={arr}
        >
            <></>
            {/* {this.getMarkers(data)} */}
        </SMapView.Cluster>
    }
    calcularPromedio(lista, atributo) {
        let suma = 0;
        let contador = 0;
        if (lista.length === 0) {
            return 0; // O cualquier valor que desees retornar si la lista está vacía
        } else {
            Object.values(lista).map((obj) => {
                if (!obj.clilat || !obj.clilon) return null;
                suma = suma + obj[atributo]
                contador++;
            })
            return suma / contador;
        }
    }

    render() {
        var data = Model.tbcli.Action.getAll({ cliidemp: this.pk })
        if (!data) return <SLoad />

        return <SPage title={'Mapa de clientes'} disableScroll>
            {this.renderMapa(data)}
        </SPage>
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);