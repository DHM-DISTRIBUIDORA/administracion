import React, { Component } from 'react';
import { SHr, SIcon, SPage, SText, STheme, SView, SMapView, SLoad, SNavigation, SInput, SPopup } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../../Model';
import { Parent } from ".."
import { connect } from 'react-redux';
import MarkerCircle from '../../../Components/Marker/MarkerCircle';
import PopupAutoCompleteCliente from './components/PopupAutoCompleteCliente';
import { GeolocationMapSelect } from 'servisofts-rn-geolocation'
import { Container } from '../../../Components';


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
            coordenadas: null,
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
            console.log(this.state?.data?.latitude + " data---" + obj?.location.latitude + "- obj")
            if (this.state?.data) obj.count = 0
            console.log(obj.count)

            if (this.state?.data) {
                if (this.state?.data?.idcli != obj?.id) {
                    return null
                }
            }


            ////if(this.state?.data?.latitude == 0) SPopup.alert("Cliente no tiene ubicación registrada")
            return MarkerCircle({
                latitude: (this.state?.data) ? this.state?.data?.latitude : obj?.location.latitude,
                longitude: (this.state?.data) ? this.state?.data?.longitude : obj?.location.longitude,
                src: SSocket.api.root + "tbcli/" + obj?.id,
                label: obj.clinom,
                // label: (this.state?.data?.idcli ==  obj?.id) 
                size: 40,
                cantidad: obj.count > 1 ? obj.count : 0,
                onPress: obj.count <= 1 ? HanndleOnPress.bind(this, obj) : onPress,
               
            })
        }
        console.log("valor data")
        console.log(this.state?.data)
        return <SMapView.Cluster initialRegion={{
            latitude: latPadre,
            longitude: longPadre,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }}
            renderMarker={RenderMarker}
            renderCluster={RenderMarker}
            data={arr}
            ref={map => {
                this.map = map;
            }}

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
        return <Container >
            <SInput
                height={48}
                style={{
                    backgroundColor: STheme.color.card,
                    borderRadius: 16,
                    color: STheme.color.primary,
                    fontSize: 14
                }}
                editable={false}
                placeholder={"Busca una cliente..."}
                // value={this.state?.data?.direccion ? `${this.state?.data?.direccion.substring(0, 40)}${this.state?.data?.direccion.length > 40 ? "..." : ""}` : ""}
                value={data?.clinom}
                onPress={() => {
                    SPopup.open({
                        key: "autocomplete", content:
                            <PopupAutoCompleteCliente callback={(resp) => {
                                SPopup.close("autocomplete");
                                this.state.data = resp;
                                this.setState({ ...this.state });
                            }} />
                    });
                }}
                iconR={<SIcon name={"SearchTapeke"} width={40} height={18} fill={STheme.color.primary} />}
            />
            <SHr height={20} />
        </Container>
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