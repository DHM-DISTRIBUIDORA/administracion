import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SPopup } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { AccentBar, Btn, PButtom } from '../../Components';
import { MenuButtom } from 'servisofts-rn-roles_permisos';
// import usuario_dato from '../../Model/tapeke/usuario_dato';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    load_data() {
        // this.data = Model.direccion_usuario.Action.getAll();
        this.data = Model.usuario.Action.getUsuarioLog();
        return this.data;
    }

    getPerfil() {

        if (!this.load_data()) return <SLoad />
        var usuario = this.data;
        // var usuario = this.props.state.usuarioReducer.usuarioLog;
        // if (!usuario) {
        //     SNavigation.navigate('login');
        //     return <SView />
        // }

        // var usuario = Model.usuario.Action.getUsuarioLog();
        // if (!usuario) return <SView col={"xs-12"} center height onPress={() => {
        // 	SNavigation.navigate("/login")
        // 	this.fadeOut();
        // }}></SView>
        return (
            <SView center>
                <SView style={{
                    width: 140,
                    height: 140,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SView style={{
                        position: "absolute"
                    }}>
                        {/* <SIcon name='InputUser' width={139} height={139} /> */}
                    </SView>

                    <SView style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: STheme.color.primary,
                        borderRadius: 100,
                        overflow: "hidden",
                    }} border={STheme.color.card}>
                        <SImage src={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()}

                            style={{ resizeMode: 'cover', }} />


                    </SView>
                </SView>
                <SHr />
                <SView >
                    <SView center>
                        <SText style={{
                            // flex: 5,
                            fontSize: 18,
                            // fontWeight: "bold",
                            // color: "#fff"
                        }} font='LondonBetween'>{usuario["Nombres"] + " " + usuario["Apellidos"]} </SText>
                    </SView>


                </SView>
            </SView>
        )
    }
    getDato(key, icon) {
        // var text = usuario_dato
        if (!this.data) return null;
        var text = this.data[key] ?? '--';
        if (key == "Password") {
            text = "************"
        }
        return <SView row col={"xs-12"} center>
            <SHr />
            <SHr />
            <SIcon name={icon} width={25} height={25} fill={STheme.color.text} />
            <SView width={16} />
            <SText>{text}</SText>
            <SView flex />
        </SView>
    }
    getDatos() {
        return <SView col={"xs-12"} center>
            {/* {this.getDato("Nombres", "InputUser")} */}
            {/* {this.getDato("Apellidos", "InputUser")} */}
            {/* {this.getDato("CI", "InputUser")} */}
            {/* {this.getDato("Fecha de nacimiento", "Calendar")} */}
            {this.getDato("Telefono", "InputPhone")}
            {this.getDato("Correo", "InputEmail")}
            {this.getDato("Password", "InputPassword")}
            {/* {this.getDato("Direccion", "InputLocation")} */}

        </SView>
    }

    render() {
        return (<SPage title={'Editar perfil'} onRefresh={(resolve) => {
            // Model.usuario.Action.CLEAR();
            Model.usuario.Action.syncUserLog()
            // console.log
            if (resolve) {
                resolve();
            }

        }}>
            <SView col={"xs-12"} center>
                <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                    {/* <SView height={80}></SView> */}
                    <SHr height={10} />
                    {this.getPerfil()}
                    <SView height={10}></SView>
                    {this.getDatos()}
                    <SHr h={50} />
                    <Btn col={"xs-11"} onPress={() => {
                        SNavigation.navigate("/perfil/editar", { key: this.data.key });
                    }}>EDITAR</Btn>
                    <SHr h={16} />
                    <Btn col={"xs-11"} row onPress={() => {
                        STheme.change()
                    }}>{STheme.getTheme() == "default" ? <SIcon name='Moon' width={20} /> : <SIcon name='Sun' width={20} fill={"#fff"} />} {`CAMBIAR A TEMA ${STheme.getTheme() == "default" ? "OSCURO" : "CLARO"}`}</Btn>
                    <SHr h={16} />
                    <Btn col={"xs-11"} type='danger' onPress={() => {
                        Model.usuario.Action.unlogin();
                    }}>CERRAR SESIÓN</Btn>
                    <SHr height={100} />
                    {/* <MenuButtom label={STheme.getTheme() == "default" ? "Oscuro" : "Claro"} icon={} onPress={() => {
                        STheme.change()
                    }} /> */}
                    <Btn col={"xs-11"} type='danger' backgroundColor={STheme.color.danger + "44"} onPress={() => {
                        SPopup.confirm({
                            title: "Eliminar cuenta", message: "¿Estás seguro de eliminar la cuenta?", onPress: () => {
                                Model.usuario.Action.editar({
                                    data: {
                                        ...this.data,
                                        estado: 0
                                    },
                                }
                                );
                                Model.usuario.Action.CLEAR() //Limpiar caché
                                Model.usuario.Action.unlogin();
                            }
                        })
                    }}>ELIMINAR CUENTA</Btn>
                </SView>
            </SView>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);