import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SDate, SInput, SLoad, SMapView, SNavigation, SPage, SText, SThread, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import { SelectEntreFechas } from '../../Components/Fechas';

export default class mapa_calor_por_linea extends Component {
    state = {
        ...SNavigation.getAllParams(),
        fecha_inicio: SNavigation.getParam("fecha_inicio", new SDate().addDay(-30).toString("yyyy-MM-dd")),
        fecha_fin: SNavigation.getParam("fecha_fin", new SDate().toString("yyyy-MM-dd")),
    }
    componentDidMount() {

    }

    verifyComas(textoLimpio) {
        // Esta expresión regular permite cadenas de la forma 'valor', o listas del tipo 'valor,valor,...'
        const regex = /^\w+(?:,\w+)*$/;
        return regex.test(textoLimpio) ? textoLimpio : null;
    }
    getData() {

        delete this.state.data;
        this.setState({ loading: true, data: null })


        SSocket.sendPromise({
            component: "dhm",
            type: "getMapaCalor",
            fecha_inicio: this.state.fecha_inicio,
            fecha_fin: this.state.fecha_fin,
            idemp: this.verifyComas(this.state.idemp),
            idprd: this.verifyComas(this.state.idprd),
            idlinea: this.verifyComas(this.state.idlinea)

        }).then(e => {
            let arr = e.data.filter(a => !!a.clilat && a.clilon).map(a => {
                return { lat: a.clilat, lng: a.clilon }
            })
            this.setState({ data: arr, loading: false })
            console.log(e)
        }).catch(e => {
            this.setState({ loading: false })
            console.error("ASsakdasd")
        })
    }

    _ref = {}
    input({ label, key, onPress }) {
        return < SView col={"xs-12 sm-6"} padding={4} row >
            <SText onPress={onPress}>{key}: </SText>
            <SInput ref={ref => this._ref[key] = ref} style={{
                height: 30,
                padding: 0,
                justifyContent:"center"
            }}
                height={30}
                flex
                defaultValue={this.state[key] ?? ""}
                placeholder={label}
                onChangeText={e => {
                    if (!e && this.state[key]) {
                        delete this.state[key]
                    } else {
                        this.state[key] = e;

                    }
                    new SThread(1000, "sadasdas", true).start(() => {
                        this.getData();
                    })

                }} />
        </SView >
    }
    filtros() {
        return <SView col={"xs-12"} row>
            <SelectEntreFechas
                fecha_inicio={this.state.fecha_inicio}
                fecha_fin={this.state.fecha_fin}
                onChange={e => {
                    this.state = {
                        ...this.state,
                        ...e,
                    }
                    new SThread(1000, "sadasdas", true).start(() => {
                        this.getData();
                    })

                }} />
            {this.input({
                label: "Vendedor", key: "idemp",
                onPress: () => {
                    SNavigation.navigate("/tbemt/profile/tbemp", {
                        pk: 1, onSelect: (e) => {
                            if (this._ref["idemp"]) {
                                this._ref["idemp"].setValue((this.state.idemp ? (this.state.idemp + ",") : "") + e.idemp);
                            }
                        }
                    })
                }
            })}
            {this.input({
                label: "Producto", key: "idprd", onPress: () => {
                    SNavigation.navigate("/tbprd", {
                        onSelect: (e) => {
                            if (this._ref["idprd"]) {
                                this._ref["idprd"].setValue((this.state.idprd ? (this.state.idprd + ",") : "") + e.idprd);
                            }
                        }
                    })
                }
            })}
            {this.input({
                label: "Linea", key: "idlinea", onPress: () => {
                    SNavigation.navigate("/tbprdlin", {
                        onSelect: (e) => {
                            if (this._ref["idlinea"]) {
                                this._ref["idlinea"].setValue((this.state.idlinea ? (this.state.idlinea + ",") : "") + e.idlinea);
                            }
                        }
                    })
                }
            })}
            {/* {this.input({ label: "Empresa", key: "idempresa", })} */}
        </SView>
    }
    getMapa() {
        if (!this.state.data) return <SView center>
            <SLoad />
            <SText>Por favor aguarde, esto puede demorar unos minutos...</SText>
        </SView>
        return <SMapView initialRegion={{
            latitude: -17.7826045,
            longitude: -63.179657,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }}
            headmap={{
                positions: this.state.data,
                options: {
                    opacity: 0.5,
                    radius: 15
                }
            }}
        >

        </SMapView>
    }
    render() {
        return <SPage title={"Mapa de calor"} disableScroll>
            {this.filtros()}
            {this.getMapa()}
        </SPage>
    }
}
