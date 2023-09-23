import React, { Component } from 'react';

import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SIcon, SImage, SInput, SList, SLoad, SNavigation, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';
// import ListaUsuarios from './Components/ListaUsuarios';
import item from "../item"
import item2 from '../../tbven/item';
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            params: ["onSelect?"],
            item: item,
            excludes: []
        });
        
      
    }
    $allowBack() {
        return true;
    }
    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        return (<SView col={"xs-12"}>
            <Lista pi={this} onSelect={this.$params.onSelect} />
        </SView>
        )
    }

    optionItem({ key, label, color, icon, root }) {
        // var select = !!this.state.select[key]
        return <SView height={35} center style={{
            paddingLeft: 8,
            paddingRight: 8,
            opacity: 1,
            backgroundColor: color + "AA"
        }} onPress={() => {
            SNavigation.navigate(root, { pk: this.pk })
        }} row>
            <SIcon name={icon} width={12} height={12} fill={STheme.color.text} /> <SView width={8} />
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



const Parent2 = {
    name: "Ventas del empleado",
    path: `/tbven`,
    model: Model.tbven
}
class Lista extends DPA.list {
    constructor(props) {
        Parent2.model.Action.CLEAR();
        super(props, {
            type: "componentTitle",
            Parent: Parent2,
            title: Parent2.name,
            item: item2,
            excludes: []
        });
        this.fecha_inicio = SNavigation.getParam("fecha_inicio");
        this.fecha_fin = SNavigation.getParam("fecha_fin");
    }

    $filter(data) {
        if (this.fecha_inicio) {
            return data.idemp == this.props.pi.pk && data.vfec >= this.fecha_inicio && data.vfec <= this.fecha_fin
        } else {
            return data.idemp == this.props.pi.pk
        }
        
    }
    $order() {
        return [{ key: "vfec", order: "desc" }]
    }
    $getData() {
        return Parent2.model.Action.getAll({ idemp: this.props.pi.pk })
    }
}