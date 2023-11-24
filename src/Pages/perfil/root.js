import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SPopup } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { Parent } from "."

import { AccentBar, Btn, PButtom } from '../../Components';
import { MenuButtom } from 'servisofts-rn-roles_permisos';
import DataBase from '../../DataBase';
import DataBaseContainer from '../../DataBase/DataBaseContainer';
// import usuario_dato from '../../Model/tapeke/usuario_dato';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // idcli: 21872
        };
    }

    load_data() {

        let user = Model.usuario.Action.getUsuarioLog();
        let cliente = Model.tbcli.Action.getCliente();
        // if (user || cliente) return null;
        if (user) {
            this.data = user;
        } else {
            this.data = cliente;

            this.data = {
                "Nombres": cliente?.clinom,
                "Apellidos": "",
                "Direccion": cliente?.clidir,
                "Telefono": cliente?.clitel,
                "key": cliente?.idcli,
                "idz": cliente?.idz
            };
            // this.setState({ idcli: cliente.idcli });
            this.state.idcli = cliente?.idcli;
        }
        // return this.getItem({ key: "login", title: 'Cuenta', icon: 'Login', url: '/login' })

        // this.data = Model.usuario.Action.getUsuarioLog();


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
            <SView col={"xs-12"} center>
                <SView col={"xs-12"} style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: STheme.color.lightGray }}>
                    <SHr height={10} />
                    <SText style={{ alignItems: "flex-start" }} font='AcherusGrotesque-Bold'>MIS DATOS</SText>
                    <SHr height={10} />
                </SView>
                <SHr height={10} />
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
                        <SImage src={require('../../Assets/img/foto.png')} style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            position: "absolute",
                            zIndex: 90,
                            top: 0,
                            // width: 50
                        }} />
                        <SImage enablePreview src={SSocket.api.root + (usuario?.Apellidos != "" ? "usuario/" : "tbcli/") + usuario?.key + "?date=" + new Date().getTime()}
                            style={{ resizeMode: 'cover', zIndex: 99, }} />
                    </SView>
                </SView>
                <SHr />
                <SView >
                    <SView center>
                        <SText style={{
                            // flex: 5,
                            fontSize: 18,
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
        if (!this.data[key]) return null;
        return <SView row col={"xs-12"} center>
            <SHr />
            <SHr />
            <SView col={"xs-1"}>
                <SIcon name={icon} width={25} height={25} fill={STheme.color.text} />
            </SView>
            <SView col={"xs-0.5"} />
            <SView col={"xs-10.5"}>
                <SText>{text}</SText>
            </SView>

            <SView width={16} />

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
            {this.getDato("Direccion", "InputDireccion")}

        </SView>
    }

    getVendedor() {
        let dataCliente = Model.tbcli.Action.getByKey((this.state.idcli).toString());
        if (!dataCliente) return <SLoad />;
        if (dataCliente.cliidemp == 0) return <SText>NO TIENE VENDEDOR ASIGNADO</SText>;
        let dataVendedor = Model.tbemp.Action.getByKey(dataCliente.cliidemp + "");
        if (!dataVendedor) return <SLoad />;

        return <SView col={"xs-12"}>
            <SView col={"xs-12"} style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: STheme.color.lightGray }}>
                <SHr height={10} />
                <SText style={{ alignItems: "flex-start" }} font='AcherusGrotesque-Bold'>MI VENDEDOR</SText>
                <SHr height={10} />
            </SView>
            <SHr height={20} />
            <SView col={"xs-12"} center row>
                <SView width={120} >
                    <SView width={100} height={100} card style={{
                        borderRadius: 28,
                        overflow: "hidden",
                        backgroundColor: STheme.color.white
                    }} center>
                        <SImage src={require('../../Assets/img/foto.png')} style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            position: "absolute",
                            zIndex: 90,
                            top: 0,
                            // width: 50
                        }} />
                        <SImage src={Model.tbemp._get_image_download_path(SSocket.api, dataCliente?.cliidemp)} style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            zIndex: 99,
                        }} />
                    </SView>
                </SView>
                <SView col={"xs-9"} flex>
                    <SText bold fontSize={16}>{`${dataVendedor?.empnom}`}</SText>
                    <SText>{`${dataVendedor?.idemp} - ${dataVendedor?.empcod}`}</SText>
                </SView>
                <SHr />

            </SView>
        </SView>
    }

    getRepartidor() {

        let dataZona = Model.tbzon.Action.getByKey(this.data.idz + "");
        if (!dataZona) return <SLoad />;
        if (dataZona.idemp == 0) return <SText>NO TIENE REPARTIDOR ASIGNADO</SText>;

        let dataRepartidor = Model.tbemp.Action.getByKey(dataZona.idemp + "");

        if (!dataRepartidor) return <SLoad />;

        return <SView col={"xs-12"}>
            <SView col={"xs-12"} style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: STheme.color.lightGray }}>
                <SHr height={10} />
                <SText style={{ alignItems: "flex-start" }} font='AcherusGrotesque-Bold'>MI REPARTIDOR</SText>
                <SHr height={10} />
            </SView>
            <SHr height={20} />
            <SView col={"xs-12"} center row>
                <SView width={120} >
                    <SView width={100} height={100} card style={{
                        borderRadius: 28,
                        overflow: "hidden",
                        backgroundColor: STheme.color.white
                    }} center>
                        <SImage src={require('../../Assets/img/foto.png')} style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            position: "absolute",
                            zIndex: 90,
                            top: 0,
                            // width: 50
                        }} />
                        <SImage src={Model.tbemp._get_image_download_path(SSocket.api, dataRepartidor?.idemp)} style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            zIndex: 99,
                        }} />
                    </SView>
                </SView>
                <SView col={"xs-9"} flex>
                    <SText bold fontSize={16}>{`${dataRepartidor?.empnom}`}</SText>
                    <SText>{`${dataRepartidor?.idemp} - ${dataRepartidor?.empcod}`}</SText>
                </SView>
                <SHr />
            </SView>
        </SView>
    }

    render() {
        return (<SPage title={'Editar perfil'} onRefresh={(resolve) => {
            Model.usuario.Action.syncUserLog()
            if (resolve) {
                resolve();
            }

        }}>
            <SView col={"xs-12"} center>
                <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                    <SHr height={10} />
                    {this.getPerfil()}
                    <SView height={10}></SView>
                    {this.getDatos()}
                    <SHr h={30} />
                    {(this.state?.idcli) ? this.getVendedor() : null}
                    {/* <SHr h={30} />
                    {(this.state?.idcli) ? this.getRepartidor() : null} */}

                    <SHr h={20} />

                    <Btn col={"xs-11"} onPress={() => {
                        if (this.data?.Apellidos == "") {
                            SNavigation.navigate("/tbcli/edit", { pk: this.data.key + "" });

                        } else {
                            SNavigation.navigate("/perfil/editar", { key: this.data.key });
                        }
                    }}>EDITAR</Btn>
                    <SHr h={16} />
                    <Btn col={"xs-11"} row onPress={() => {
                        STheme.change()
                    }}>{STheme.getTheme() == "default" ? <SIcon name='Moon' width={20} /> : <SIcon name='Sun' width={20} fill={"#fff"} />} {`CAMBIAR A TEMA ${STheme.getTheme() == "default" ? "OSCURO" : "CLARO"}`}</Btn>
                    <SHr h={16} />
                    <Btn col={"xs-11"} type='danger' onPress={() => {

                        SPopup.confirm({
                            title: "¿Estás seguro de cerrar sesión?\n Se eliminarán todos tus pedidos pendientes.", message: "", onPress: () => {
                                Model.tbcli.Action.setCliente(null);
                                Model.usuario.Action.unlogin();
                                Model.carrito.Action.removeAll()
                                DataBase.clear();
                                // DataBaseContainer.sync();
                                SNavigation.reset("/");
                                // NavBar.close();
                            }
                        })

                    }}>CERRAR SESIÓN</Btn>
                    <SHr height={200} />
                    {/* <MenuButtom label={STheme.getTheme() == "default" ? "Oscuro" : "Claro"} icon={} onPress={() => {
                        STheme.change()
                    }} /> */}
                    {(this.state?.idcli) ? null :
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
                    }
                </SView>
                <SHr height={30} />
            </SView>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);