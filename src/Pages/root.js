import React, { Component } from 'react';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
import SSocket from "servisofts-socket"
import Model from '../Model';
import { SButtom, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SText, STheme, SView, SNotification, SDate } from 'servisofts-component';
import { connect } from 'react-redux';
import DataBaseContainer from '../DataBase/DataBaseContainer';
import DataBase from '../DataBase';
// import { SNotification } from '../Components';

class index extends Component {

    getIconProfile() {
        return <SView col={"xs-12"} height>
            <SView col={"xs-12"} height style={{
                // padding: 8
            }} >
                <SIcon name={"Perfil"} />
            </SView>
            <SImage
                src={SSocket.api.root + "usuario/" + Model.usuario.Action.getKey()}
                style={{ position: "absolute", resizeMode: "cover", borderWidth: 2, borderRadius: 12, borderColor: STheme.color.card, overflow: 'hidden', }}
            />
        </SView>
    }
    datosUser() {
        var dataUser = Model.usuario.Action.getUsuarioLog();
        if (!dataUser) return <SLoad />
        return <SView style={{ alignItems: "flex-end" }}>
            <SView
                style={{
                    backgroundColor: STheme.color.primary + "50",
                    padding: 6,
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: 15,
                    position: "relative", top: 0,
                    right: 10,
                }}
                width={165} row
            >
                <SView height={30} width={30}>
                    <SImage
                        src={SSocket.api.root + "usuario/" + Model.usuario.Action.getKey()}
                        style={{ position: "absolute", resizeMode: "cover", borderWidth: 2, borderRadius: 25, borderColor: STheme.color.card, overflow: 'hidden', }}
                    />
                </SView>
                <SView width={5} />
                <SView flex style={{ alignItems: "flex-end" }}>
                    <SText fontSize={12}>{dataUser?.Nombres}</SText>
                    <SText fontSize={10}>{dataUser?.Correo}</SText>
                </SView>
                <SView width={4} />
            </SView>
            <SView style={{ position: "absolute", top: 18 }}>
                <SIcon name='Cola' height={10} width={10} fill={STheme.color.primary + "50"} />
            </SView>
        </SView>
    }
    render() {
        if (!Model.usuario.Action.getKey()) {
            SNavigation.goBack();
            return <SLoad />
        }
        const user = Model.usuario.Action.getUsuarioLog();
        return <SPage preventBack hidden onRefresh={async (resolve) => {
            Model.usuario.Action.syncUserLog();
            // Model.usuarioPage.Action.CLEAR();
            try {
                await DataBase.usuarioPage.sync();
                await DataBase.usuarioPage.loadToReducer()
            } catch (error) {
                console.error(error)
            }

            if (resolve) resolve();
        }}  >
            <SHr height={10} />
            {/* {this.datosUser()} */}
            <SHr height={8} />
            <SView col={"xs-12"} center>
                {/* <SText center fontSize={18}>BIENVENIDO AL SISTEMA ADMINISTRATIVO</SText> */}
                <SHr />
                {/* <SText fontSize={18}>Bienvenido al sistema administrativo</SText> */}
            </SView>
            <SView col={"xs-12"} center height={100}>

                <SView width={200} flex>
                    <SIcon name={"LogoClear"} fill={STheme.color.text} stroke={STheme.color.text} />
                </SView>
            </SView>
            <SHr height={32} />
            <SView col={"xs-12"} flex >
                <MenuPages path={"/"} permiso={"page"}>
                    <MenuButtom label={"Public"} url={"/public"} icon={<SIcon name={"Home"} />} />
                    <MenuButtom label={"Storage"} url={"/storage"} icon={<SIcon name={"Istorage"} />} />
                    <MenuButtom label={"Sincronizar"} onPress={() => {
                        DataBaseContainer.sync();
                    }} icon={<SIcon name={"Ireload"} fill={STheme.color.text} />} />
                    {/* <MenuButtom label={"Notificate"} onPress={() => {
                        SNotification.send({
                            title: "Notificacion de prueba",
                            body: new SDate().toString("yyyy-MM-dd hh:mm:ss"),
                            image: "http://192.168.2.1:30049/usuario/7929777a-8cea-4c34-aec8-a22bb7439fac"
                        })
                    }} icon={<SIcon name={"Profanity"} />} /> */}
                    {/* <MenuButtom label={"Notifications Manager"} url={"/notification_manager"} icon={<SIcon name={"Profanity"} />} /> */}
                    {/* <MenuButtom label={"RECIBO"} url={"/dm_cabfac/recibo"} params={{
                        pk: 927100083
                    }} icon={<SIcon name={"Icon2"} />} /> */}
                    {/* <MenuButtom label={"Mapa"} url={"/tbcli/mapa"} icon={<SIcon name={"Map"} />} /> */}
                    {user.idvendedor ? <MenuButtom label={"Vendedor"} url={"/tbemp/profile"} params={{ pk: user.idvendedor }} icon={<SIcon name={"Vendedor"} />} /> : null}
                    {user.idtransportista ? <MenuButtom label={"Transportista"} url={"/tbemp/profile"} params={{ pk: user.idtransportista }} icon={<SIcon name={"Trasnportista"} />} /> : null}
                    <MenuButtom label={"Mi perfil"} url={"/perfil"} icon={this.getIconProfile()} />
                </MenuPages>
            </SView>
            {/* <SHr height={100} /> */}
        </SPage>
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);