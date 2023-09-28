import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SBuscador, SButtom, SDate, SHr, SIcon, SInput, SList, SLoad, SMapView, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component'
import Model from '../../Model'
import SSocket from 'servisofts-socket'
import MapaComponent from './MapaComponent';
import DetalleMapaComponent from './DetalleMapaComponent';
import SwitchRastreo from '../../Components/SwitchRastreo'
import { Container, Popups } from '../../Components'
export default class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // curdate: new SDate("2023-08-28", "yyyy-MM-dd"),
            curdate: new SDate(),
            idemp: SNavigation.getParam("pk"),
            ubicacion: SNavigation.getParam("ubicacion"),
            datas: SNavigation.getParam("datas"),
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        Model.tbcli.Action.getClientesDia({ idemp: this.state.idemp, sdate: this.state.curdate }).then((e) => {
            this.setState({
                loading: false,
                data: e.data, visitas: e.visitas
            })
        }).catch(e => {
            this.setState({ loading: false })
            console.error(e);
        })
    }

    alertSinCoordenadas() {
        return <SView col={"xs-11 md-8 xl-6"} row center style={{ height: 250, borderRadius: 8, }} backgroundColor={STheme.color.background} >
            <SView col={"xs-11"} height={40} />
            <SView col={"xs-11"}  >
                <SIcon name={"SinUbicacion"} height={100} fill={STheme.color.primary} />
            </SView>
            <SView col={"xs-11"} height={15} />
            <SView col={"xs-12"} center  >
                <SText center color={STheme.color.darkGray} style={{ fontSize: 18, fontWeight: "bold" }}>Debes AGREGAR UBICACIÓN para concretar la visita.</SText>
            </SView>
            <SHr height={10} />
            {/* <SView col={"xs-12"} center  >
                <SButtom onPress={this.hanldeRequest_categorias.bind(this)}>AÑADIR</SButtom>
            </SView> */}
            <SView col={"xs-11"} height={30} />
        </SView>
    }

    render() {
        if (!this.state?.data) return <SLoad />;
        var clientes_data = this.state?.data
        var clientes_filter = [];
        var visitas = this.state.visitas ?? {};

        clientes_filter = clientes_data;
        if (this.state?.ubicacion) {
            (this.state?.ubicacion == "true") ?
                clientes_filter = clientes_data.filter(a => !!a.clilat && !!a.clilon) :
                clientes_filter = clientes_data.filter(a => !a.clilat || !a.clilon)
        }
        if (this.state?.datas) {
            // clientes_filter = this.state?.datas;

            clientes_filter = this.state?.datas.map(item => ({
                "idcli": item.id,
                "clinom": item.clinom,
                "clilat": item.location.latitude,
                "clilon": item.location.longitude
            }));
        }

        return <SPage
            title={(this.state?.ubicacion) ? ((this.state?.ubicacion == "true") ? "CLIENTES CON UBICACIÓN" : "CLIENTES SIN UBICACIÓN") : "MIS CLIENTES"}
            disableScroll
        >
            <Container flex>
                <SList
                    initSpace={8}
                    space={5}
                    buscador
                    // limit={20}
                    data={clientes_filter}
                    order={[{ key: "clinom", order: "asc" }]}
                    render={(vd) => {
                        return <>
                            <SView col={"xs-12"} row center
                                style={{
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: STheme.color.gray,
                                    borderRadius: 4
                                }}
                                onPress={() => {
                                    if (!vd.clilat || !vd.clilon) {
                                        SPopup.open({ content: <Popups.AgregarUbicacion /> });
                                    }
                                    SNavigation.navigate("/tbcli/profile", {
                                        pk: vd.idcli + "",
                                        idemp: this.props?.state?.idemp,
                                        visitaType: "venta",
                                        visita: visitas[vd.idcli],
                                    })
                                }}
                            >
                                <SView col={"xs-9"} >
                                    <SText fontSize={12}>{vd?.clinom}</SText>
                                </SView>
                                <SView col={"xs-3"} style={{ alignItems: "flex-end" }}>
                                    {this.state.visitas[vd.idcli] ?
                                        <SView center>
                                            <SIcon name='VisitSi' height={25} width={25} fill={STheme.color.success} />
                                            <SHr height={2} />
                                            <SText fontSize={7.5}>YA VISITADO</SText>
                                        </SView>
                                        :
                                        <SView center>
                                            <SIcon name='VisitNo' height={25} width={25} fill={STheme.color.danger} />
                                            <SHr height={2} />
                                            <SText fontSize={7.5}>POR VISITAR</SText>
                                        </SView>
                                    }
                                </SView>
                            </SView>
                        </>
                    }}
                />
                <SHr height={30} />
            </Container>
            <SLoad type='window' hidden={!this.state.loading} />
        </SPage>
    }
}
