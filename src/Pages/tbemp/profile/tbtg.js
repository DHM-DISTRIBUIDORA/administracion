import React, { Component } from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SImage, SInput, SList, SLoad, SNavigation, SStorage, SText, STheme, SView, SIcon } from 'servisofts-component';
import Model from '../../../Model';
// import ListaUsuarios from './Components/ListaUsuarios';
import item from "../item"
import item2 from '../../tbtg/item';
import { Text, TouchableOpacity, View } from 'react-native';
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            // itemType:"",
            params: ["onSelect?"],
            item: item,
            excludes: []
        });
        this.state = {
            select: {
                "mapa": true,
            },
            // ...this.state,
        }
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
        if (Model.usuario.Action.getUsuarioLog()?.idvendedor == this.pk) return true;
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
        var select = !!this.state.select[key]
        return <TouchableOpacity style={{
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 8,
            height: 35,
            paddingRight: 8,
            opacity: select ? 1 : 0.5,
            backgroundColor: color + "AA",
            // flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            flexDirection: "row"
        }} onPress={() => {
            SNavigation.navigate(root, { pk: this.pk })
        }} >

            <SView width={12} height={12}>
                <SIcon name={icon} fill={STheme.color.text} />
            </SView>
            <SView width={8} />
            <SText width={(((label + "").length) * 10)}>{label}</SText>
        </TouchableOpacity>
    }
    $menu() {
        let menu = super.$menu();
        menu.push({ children: this.optionItem({ key: "mapa", label: "En Mapa", color: STheme.color.card, icon: 'Imap', root: "/tbemp/profile/tbclimapa" }) })
        return menu;
    }

}
export default connect(index);
const Parent2 = {
    name: "Pedidos de Transportista",
    path: `/tbtg`,
    model: Model.tbtg
}
class Lista extends DPA.list {
    constructor(props) {
        Model.tbtg.Action.CLEAR();
        super(props, {
            type: "componentTitle",
            Parent: Parent2,
            title: Parent2.name,
            item: item2,
            excludes: []
        });
    }

    // $filter(data) {
    //     return data.cliest == "0"
    // }

   
    $order() {
        return [{ key: "pedidos", order: "desc" }]
    }
    $onSelect(data) {
        SNavigation.navigate("/tbtg/profile", { pk: data.idepm })
    }
    $getData() {
        return Parent2.model.Action.getAll({ idemp: this.props.pi.pk })
    }
}