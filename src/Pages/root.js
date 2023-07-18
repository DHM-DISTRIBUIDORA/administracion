import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SImage, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
import SSocket from "servisofts-socket"
import Model from '../Model';
import { connect } from 'react-redux';
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
        console.log(dataUser);
        return <SView style={{ alignItems: "flex-end" }}>
            <SView
                style={{
                    backgroundColor: STheme.color.primary + "50",
                    padding: 6,
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderTopRightRadius: 15,
                }}
                width={165} row
            >
                <SView height={30} width={30}>
                    <SImage
                        src={SSocket.api.root + "usuario/" + Model.usuario.Action.getKey()}
                        style={{ position: "absolute", resizeMode: "cover", borderWidth: 2, borderRadius: 25, borderColor: STheme.color.card, overflow: 'hidden', }}
                    />
                </SView>
                <SView width={5}/>
                <SView flex style={{ alignItems: "flex-end" }}>
                    <SText fontSize={12}>{dataUser?.Nombres}</SText>
                    <SText fontSize={10}>{dataUser?.Correo}</SText>
                </SView>
                <SView width={4}/>
            </SView>
        </SView>
    }
    render() {
        return <SPage preventBack  >
            {this.datosUser()}
            <SHr height={8} />
            <SView col={"xs-12"} center height={100}>
                <SView width={200} flex>
                    <SIcon name={"LogoClear"} fill={STheme.color.text} stroke={STheme.color.text} />
                </SView>
            </SView>
            <SHr height={32} />
            <SView col={"xs-12"} flex >
                <MenuPages path={"/"} permiso={"page"}>
                    <MenuButtom label={"Public"} url={"/public"} icon={<SIcon name={"Home"} />} />
                    <MenuButtom label={"Ajustes"} url={"/ajustes"} icon={<SIcon name={"Ajustes"} />} />
                    <MenuButtom label={"test2"} url={"/test2"} icon={<SIcon name={"Ajustes"} />} />
                    <MenuButtom label={"Mi perfil"} url={"/perfil"} icon={this.getIconProfile()} />
                </MenuPages>
            </SView>
            <SHr height={100} />
        </SPage>
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);