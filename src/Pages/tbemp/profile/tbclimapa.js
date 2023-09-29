import React, { Component } from 'react';
import { SHr, SIcon, SPage, SText, STheme, SView, SMapView, SLoad, SNavigation, SInput, SPopup } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../../Model';
import { Parent } from ".."
import { connect } from 'react-redux';
import MarkerCircle from '../../../Components/Marker/MarkerCircle';
import PopupAutoCompleteCliente from './components/PopupAutoCompleteCliente';
import { GeolocationMapSelect } from 'servisofts-rn-geolocation'


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
            ref={(map) => this.map = map}
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

    buscador(data) {
        return <SView col={"xs-12"} height={50} row center>
            <SInput
                        height={48}
                        style={{
                            backgroundColor: STheme.color.card + 1,
                            // height: 55,
                            // borderRadius: 16,
                            // color: STheme.color.text,
                            fontSize: 14
                        }}
                        editable={false}
                        placeholder={"Busca una cliente..."}
                        // value={this.state?.data?.direccion ? `${this.state?.data?.direccion.substring(0, 40)}${this.state?.data?.direccion.length > 40 ? "..." : ""}` : ""}
                        value={data?.clinom}
                        onPress={() => {
                            SPopup.open({
                                key: "autocomplete", content:
                                    <PopupAutoCompleteCliente  callback={(resp) => {
                                        SPopup.close("autocomplete");
                                        this.state.data = resp;
                                        console.log(resp)
                                        this.map.getMap().animateToRegion({
                                            ...resp,
                                            latitudeDelta: 0.01,
                                            longitudeDelta: 0.01
                                        }, 1000);

                                        this.setState({ ...this.state });
                                    }} />
                            });
                        }}
                        iconR={<SIcon name={"SearchTapeke"} width={40} height={18} fill={STheme.color.primary} />}
                    />
        </SView>
    }

    render() {
        var data = Model.tbcli.Action.getAll({ cliidemp: this.pk })
        if (!data) return <SLoad />

        return <SPage title={'Mapa de clientes'} disableScroll>
            {this.buscador(data)}
            {this.renderMapa(data)}
        </SPage>
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);