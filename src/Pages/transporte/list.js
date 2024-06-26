import { Platform, Text, View } from 'react-native'
import React, { Component } from 'react'
import { SBuscador, SButtom, SDate, SHr, SIcon, SInput, SList, SLoad, SMapView, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component'
import { Btn, Container, Popups } from '../../Components'
import DataBase from '../../DataBase'
import { Trigger } from 'servisofts-db'
import SBLocation from 'servisofts-background-location'
export default class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // curdate: new SDate("2023-08-28", "yyyy-MM-dd"),
            curdate: new SDate(),
            idemp: SNavigation.getParam("pk"),
            ubicacion: SNavigation.getParam("ubicacion"),
            datas: SNavigation.getParam("datas"),
            fecha: SNavigation.getParam("fecha"),
        }
    }


    componentDidMount() {
        this.loadDataAsync();
        this.t1 = Trigger.addEventListener({
            on: ["insert", "update", "delete"],
            tables: ["visita_transportista"]
        }, (evt) => {
            this.loadDataAsync();
        });
    }
    componentWillUnmount() {
        Trigger.removeEventListener(this.t1);
    }

    async loadDataAsync() {
        this.setState({ loading: true })
        try {
            const ventas = await DataBase.ventas_factura.all()
            const visitas = await DataBase.visita_transportista.all();
            this.setState({
                loading: false,
                data: ventas,
                visitas: visitas
            })

        } catch (error) {
            this.setState({ loading: false })
            console.error(error);
        }
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
        var visitas = this.state.visitas ?? [];

        clientes_filter = clientes_data;
        if (this.state?.ubicacion) {
            if (this.state?.ubicacion == "true") {
                clientes_filter = clientes_data.filter(a => !!a.clilat && !!a.clilon)
            } else {
                clientes_filter = clientes_data.filter(a => !a.clilat || !a.clilon)

            }

        }
        if (this.state?.datas) {
            // clientes_filter = this.state?.datas;
            console.log("sadsad", this.state.datas, clientes_filter)
            clientes_filter = clientes_filter.filter(a => {
                let itm = this.state.datas.find(b => b.id == a.idven);
                return !!itm
            })
            // clientes_filter = this.state?.datas.map(item => ({
            //     "idcli": item.id,
            //     "clinom": item.clinom,
            //     "clidir": item.clidir,
            //     "clicod": item.clicod,
            //     "clilat": item.location.latitude,
            //     "clilon": item.location.longitude
            // }));
        }

        console.log(this.state.visitas, clientes_filter)

        return <SPage
            title={(this.state?.ubicacion) ? ((this.state?.ubicacion == "true") ? "CLIENTES CON UBICACIÓN" : "CLIENTES SIN UBICACIÓN") : "MIS CLIENTES"}
            disableScroll
        >
            <Container flex>
                <SView col={"xs-12"}>
                    <Btn padding={4} onPress={() => {
                        SNavigation.navigate("/transporte", { idemp: this.props.idemp, fecha: this.state.fecha })
                    }}>Ver en mapa</Btn>
                </SView>
                <SHr />
                <SList
                    initSpace={8}
                    space={5}
                    buscador
                    limit={10}
                    data={clientes_filter}
                    order={[{ key: "clinom", order: "asc" }]}
                    render={(vd) => {
                        // console.log(vd)
                        const curvisita = (this.state.visitas ?? []).find(a => a.idven == vd.idven);

                        return <>
                            <SView col={"xs-12"} row center
                                card
                                style={{
                                    padding: 8,
                                    // borderWidth: 1,
                                    // borderColor: STheme.color.gray,
                                    borderRadius: 4
                                }}
                                onPress={() => {
                                    // if (!vd.clilat || !vd.clilon) {
                                    //     SPopup.open({ content: <Popups.AgregarUbicacion /> });
                                    // }
                                    if (Platform.OS == "web") {
                                        SNavigation.navigate("/transporte/pedidoDetalle", {
                                            idven: vd.idven + "",
                                            idemp: this.props?.state?.idemp,
                                            visitaType: "transporte",
                                            visita: curvisita,
                                            pk: vd.idcli + "",
                                        })
                                        return;
                                    };
                                    SBLocation.isActive().then(e => {
                                        if (e.estado == "exito") {
                                            SNavigation.navigate("/transporte/pedidoDetalle", {
                                                idven: vd.idven + "",
                                                idemp: this.props?.state?.idemp,
                                                visitaType: "transporte",
                                                visita: curvisita,
                                                pk: vd.idcli + "",
                                            })
                                            return;
                                        }
                                        SPopup.alert("Debe activarse en el inicio para realizar pedidos.")
                                    }).catch(e => {
                                        SPopup.alert("Debe activarse en el inicio para realizar pedidos.")
                                    })



                                    // SNavigation.navigate("/transporte/pedidoDetalle", {
                                    //     idven: vd.idven + "",
                                    //     idemp: this.props?.state?.idemp,
                                    //     visitaType: "transporte",
                                    //     visita: curvisita,
                                    //     pk: vd.idcli + "",
                                    // })
                                }}
                            >

                                <SView col={"xs-8"} >
                                    <SText fontSize={14} bold>{vd?.codigo} - {vd?.clinom}</SText>
                                    <SText fontSize={12}>{vd?.clidir}</SText>
                                    <SText fontSize={12} color={STheme.color.gray}>Vend.: {vd?.empnom}</SText>
                                </SView>
                                <SView col={"xs-2"} >
                                    {(curvisita?.monto == null) ?
                                        // <SView center>
                                        //     <SIcon name='NoEntregado2' height={30} width={30} fill={STheme.color.gray} />
                                        // </SView>
                                        null
                                        : (curvisita?.monto > 0) ?
                                            <SView center>
                                                <SIcon name='Entregado' height={30} width={30} fill={STheme.color.success} />
                                                <SHr height={2} />
                                                <SText fontSize={7.5}>{curvisita?.tipo}</SText>
                                            </SView>
                                            :
                                            <SView center>
                                                <SIcon name='NoEntregado' height={30} width={30} fill={STheme.color.danger} />
                                                <SHr height={2} />
                                                <SText center fontSize={7.5}>{curvisita?.tipo}</SText>
                                            </SView>

                                    }
                                </SView>
                                <SView col={"xs-2"} style={{ alignItems: "flex-end" }}>
                                    {curvisita ?
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
            </Container>
            <SLoad type='window' hidden={!this.state.loading} />
        </SPage>
    }
}
