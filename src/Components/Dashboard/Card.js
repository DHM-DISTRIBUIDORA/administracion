import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView, SNavigation, SDate } from 'servisofts-component';
import SSocket from 'servisofts-socket';
export type CategoriaCardPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<CategoriaCardPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (!this.props.data) return <SView />
        // console.log(this.props.data);
        var { cantidad_clientes, cantidad_pedidos, cantidad_visitas, cantidad_zonas, idemp, visitas_exitosas, visitas_fallidas, empnom, empcod, usuario, clientes_con_ubicacion, clientes_sin_ubicacion, visita } = this.props.data;
        console.log(this.props.data.key);

        let color = "";
        let descripcion = "";
        switch (visita?.tipo) {
            case "start":
                color = STheme.color.success;
                descripcion = "Activo";
                break;
            case "provider_enabled":
                color = STheme.color.success
                descripcion = "Activo";
                break;
            case "on_location_change":
                color = STheme.color.success
                descripcion = "Activo";
                break;
            case "provider_disabled":
                color = STheme.color.warning

                descripcion = "Desactivado hace poco";
                break;
            case "stop":
                color = STheme.color.danger
                descripcion = "Inactivo";
                break;
            // case "on_location_change":
            //     color = STheme.color.danger
            //     descripcion = "Inactivo";
            //     break;
        }

        return (
            <SView col={"xs-12"} row >
                <SView col={"xs-12"} center card row
                    style={{
                        padding: 6,
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: STheme.color.lightGray,
                    }}>
                    <SView col={"xs-3"} center style={{ textAlign: "right" }} height >
                        <SView style={{
                            width: 50,
                            height: 50, borderRadius: 30, overflow: "hidden", borderWidth: 1, borderColor: "#fff"
                        }}>
                            <SView style={{
                                position: "absolute"
                            }}>
                                <SIcon name='InputUser' />
                            </SView>
                            <SImage src={require('../../Assets/img/foto.png')} style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover"
                            }} />
                        </SView>
                    </SView>
                    <SView col={"xs-7"} height>
                        <SText fontSize={15} bold style={{ lineHeight: 25 }} onPress={() => {
                            SNavigation.navigate("/admin/tbemp", { pk: idemp , fecha_inicio:this.props.fecha})
                        }}>{empnom}</SText>
                        <SText fontSize={12} style={{ lineHeight: 20 }} onPress={() => { SNavigation.navigate("/usuario/profile", { pk: usuario?.key }) }} >User: {usuario?.Correo}</SText>
                        <SText fontSize={12} style={{ lineHeight: 20 }} >Cod: {empcod}  -  # Zonas: {cantidad_zonas}</SText>
                    </SView>
                    <SView col={"xs-2"} center height onPress={() => {
                        SNavigation.navigate("/gpx/detalle", { key_usuario: usuario?.key, fecha:this.props.fecha })
                    }}>
                        {(!visita) ? <SIcon name='Iactivo' width={30} height={30} fill={STheme.color.lightGray} /> :
                            <SIcon name='Iactivo' width={30} height={30} fill={color} />
                        }
                        {(!visita) ? <SText fontSize={10} center>Ausente</SText> : <SView><SText style={{ lineHeight: 12 }} fontSize={10} center> {descripcion}</SText><SText center fontSize={10} bold >{new SDate(visita.fecha_last).toString("hh:mm:ss")}</SText></SView>}

                    </SView>
                </SView>
                <SView col={"xs-12"} center row>
                    <SView col={"xs-4"} center height
                        style={{
                            backgroundColor: "#D7D9FF85",
                            padding: 3,
                            borderBottomLeftRadius: 18,
                            borderLeftWidth: 2,
                            borderBottomWidth: 2,
                            borderTopWidth: 2,
                            borderColor: "#6C74FF55",
                        }}>
                        <SView col={"xs-12"} center row>
                            <SText fontSize={10} center bold>Clientes para visitar</SText>
                        </SView>
                        <SText fontSize={20} bold center>{cantidad_visitas}/{cantidad_clientes}</SText>
                        <SView col={"xs-12"} center flex style={{ alignItems: "flex-end", position: "absolute", bottom: 5, right: 5 }}>
                            <SIcon name='Id1' width={30} height={30} fill={"#6C74FF55"} />
                            <SView width={10} />
                        </SView>
                        <SText fontSize={10}>Con ubicacion: {clientes_con_ubicacion}</SText>
                        <SText fontSize={10}>Sin ubicacion: {clientes_sin_ubicacion}</SText>
                    </SView>
                    <SView col={"xs-2.5"} center height
                        style={{
                            backgroundColor: "#E1FFD785",
                            padding: 3,
                            borderLeftWidth: 2,
                            borderBottomWidth: 2,
                            borderTopWidth: 2,
                            borderColor: "#50B95455",
                        }}>
                        <SView col={"xs-12"} center row>
                            <SText fontSize={10} center bold>Exitosas</SText>
                        </SView>
                        <SText fontSize={22} bold center>{visitas_exitosas}</SText>
                        <SView col={"xs-12"} center flex style={{ alignItems: "flex-end", position: "absolute", bottom: 5, right: 5 }}>
                            <SIcon name='Id2' width={30} height={30} fill={"#50B95455"} />
                            <SView width={10} />
                        </SView>
                    </SView>
                    <SView col={"xs-2.5 "} center height
                        style={{
                            backgroundColor: "#FFD7D785",
                            padding: 3,
                            borderLeftWidth: 2,
                            borderBottomWidth: 2,
                            borderTopWidth: 2,
                            borderColor: "#FF4F4F55",
                        }}>
                        <SView col={"xs-12"} center row>
                            <SText fontSize={10} center bold>Sin éxito</SText>
                        </SView>
                        <SText fontSize={22} bold center>{visitas_fallidas}</SText>
                        <SView col={"xs-12"} center flex style={{ alignItems: "flex-end", position: "absolute", bottom: 5, right: 5 }}>
                            <SIcon name='Id3' width={30} height={30} fill={"#FF4F4F40"} />
                            <SView width={10} />
                        </SView>
                    </SView>
                    <SView col={"xs-3"} center height
                        style={{
                            backgroundColor: "#FFEAD785",
                            padding: 3,
                            borderWidth: 2,
                            borderColor: "#FFAA2355",
                            borderBottomRightRadius: 18

                        }}>
                        <SView col={"xs-12"} center row>
                            <SText fontSize={10} center bold>Pedidos</SText>
                        </SView>
                        <SView col={"xs-12"} center row>
                            <SText fontSize={20} bold center>{cantidad_pedidos} </SText>
                            {/* <SText fontSize={15} bold center>Bs.</SText> */}
                        </SView>
                        <SView col={"xs-12"} center flex style={{ alignItems: "flex-end", position: "absolute", bottom: 5, right: 5 }}>
                            <SIcon name='Id4' width={30} height={30} fill={"#FFAA2355"} />
                            <SView width={10} />
                        </SView>
                    </SView>
                </SView>
            </SView>
        );
    }
}
export default (index);