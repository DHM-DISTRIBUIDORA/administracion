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

    getMarkers(data) {
        if (!data) return null;

        return Object.values(data).map((obj) => {
            if (!obj.clilat || !obj.clilon) return null;
            const onPress = () => {
                SNavigation.navigate("/tbcli/profile", { pk: obj.idcli })
            }
            //     // SNavigation.navigate("/tbcli/profile", { pk: data.idcli + "" })
            return MarkerCircle({
                latitude: parseFloat(obj?.clilat ?? 0),
                longitude: parseFloat(obj?.clilon ?? 0),
                src: SSocket.api.root + "tbcli/" + obj?.idcli,
                label: obj?.idcli,
                size:40,
                onPress: onPress
                // cantidad: obj?.cantidad
            })
            return <SMapView.SMarker
                latitude={parseFloat(obj?.clilat ?? 0)}
                longitude={parseFloat(obj?.clilon ?? 0)}

            >
                <Marker onPress={onPress} />
            </SMapView.SMarker >
        })
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
        var latPadre;
        var longPadre;

        latPadre = this.calcularPromedio(data, 'clilat');
        longPadre = this.calcularPromedio(data, 'clilon');

        return <SPage title={'Mapa de clientes'} disableScroll>
            {(isNaN(longPadre)) ?
                <SText center>NO HAY DATOS EN MAPA</SText>
                :
                <SMapView initialRegion={{
                    // latitude: -17.783799,
                    // longitude: -63.180,
                    latitude: latPadre,
                    longitude: longPadre,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}>
                    <></>
                    {this.getMarkers(data)}
                </SMapView>}
        </SPage>
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);