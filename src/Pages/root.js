import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SImage, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
import SSocket from "servisofts-socket"
import Model from '../Model';
export default class index extends Component {
    getIconProfile() {
        return <SView col={"xs-12"} height>
            <SView col={"xs-12"} height style={{
                padding: 8
            }} >
                <SIcon name={"profile2"} fill={STheme.color.card} />
            </SView>
            <SImage
                src={SSocket.api.root + "usuario/" + Model.usuario.Action.getKey()}
                style={{ position: "absolute", resizeMode: "cover", borderWidth: 2, borderRadius: 12, borderColor: STheme.color.card, overflow: 'hidden', }}
            />
        </SView>
    }
    render() {
        return <SPage preventBack >
            <SHr />
            <MenuPages path={"/"} permiso={"page"}>
                <MenuButtom label={"Public"} url={"/public"} />
                <MenuButtom label={"Mi perfil"} url={"/perfil"} icon={this.getIconProfile()} />
            </MenuPages>
        </SPage>
    }
}
