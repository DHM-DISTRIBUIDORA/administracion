import React, { Component } from 'react';
import { SHr, SIcon, SPage, SText, STheme, SView, SMapView, SLoad } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../../Model';
import { Parent } from ".."


// const Parent2 = {
//     name: "Clientes del empleado",
//     path: `/tbcli`,
//     model: Model.tbcli
// }

const Marker = React.memo(({ }) => <SView width={20} height={20} center onPress={() => {
}}>
    <SIcon name={"Marker"} fill={STheme.color.text} />
</SView>, (prevProps, nextProps) => prevProps === nextProps);
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ...this.state,
        };
    }


    getMarkers(data) {
        if (!data) return null;

        return Object.values(data).map((obj) => {
            if (!obj.clilat || !obj.clilon) return null;
            return <SMapView.SMarker
                latitude={parseFloat(obj?.clilat ?? 0)}
                longitude={parseFloat(obj?.clilon ?? 0)} >
                <Marker />
            </SMapView.SMarker>
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
                console.log(obj[atributo])
            })
            console.log(suma)
            console.log(contador)
            //   const suma = lista.reduce((acumulador, obj) => acumulador + obj[atributo], 0);
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



        return <SPage title={'Mapa Test'} disableScroll>
            <SMapView initialRegion={{
                // latitude: -17.783799,
                // longitude: -63.180,
                latitude:  latPadre ,
                longitude:  longPadre ,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            }}>
                {this.getMarkers(data)}
            </SMapView>
        </SPage>
    }
}