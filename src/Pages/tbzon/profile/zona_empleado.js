
import React, { Component } from 'react';

import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SIcon, SImage, SInput, SList, SLoad, SNavigation, SText, STheme, SUuid, SView } from 'servisofts-component';
import Model from '../../../Model';
// import ListaUsuarios from './Components/ListaUsuarios';
import item from "../item"
import item2 from '../../tbemp/item';
import DataBase from '../../../DataBase';
import SSocket from 'servisofts-socket';
import { Trigger } from 'servisofts-db';
import ZonaEmpleadoComponent from './ZonaEmpleadoComponent';
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            params: ["onSelect?"],
            item: item,
            excludes: []
        });
    }

    componentDidMount() {
        DataBase.tbzon.objectForPrimaryKey(parseInt(this.pk)).then(data => {
            this.setState({ data: data })
        }).then(e => {
            console.error(e);
        })
    }
    $allowBack() {
        return true;
    }
    // $allowEdit() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    // }
    // $allowDelete() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    // }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return this.state?.data
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        return (<SView col={"xs-12"}>
            <ZonaEmpleadoComponent idz={this.pk} />
        </SView>
        )
    }

    optionItem({ key, label, color, icon, root }) {
        // var select = !!this.state.select[key]
        return <SView height={35} width={100} center style={{
            paddingLeft: 8,
            paddingRight: 8,
            opacity: 1,
            backgroundColor: color + "AA"
        }} onPress={() => {
            SNavigation.navigate(root, { pk: this.pk })
        }} row>
            <SIcon name={icon} width={12} height={12} fill={STheme.color.text} /><SView width={8} />
            <SText>{label}</SText>
        </SView>
    }
    $menu() {
        let menu = super.$menu();
        menu.push({ children: this.optionItem({ key: "mapa", label: "En Mapa", color: STheme.color.card, icon: 'Imap', root: "/tbzon/profile/tbclimapa" }) })
        return menu;
    }

}
export default connect(index);

