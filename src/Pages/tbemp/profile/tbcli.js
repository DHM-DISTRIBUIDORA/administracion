import React, { Component } from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SImage, SInput, SList, SLoad, SNavigation, SStorage, SText, STheme, SView, SIcon } from 'servisofts-component';
import Model from '../../../Model';
// import ListaUsuarios from './Components/ListaUsuarios';
import item from "../item"
import item2 from '../../tbcli/item';
import { Text, TouchableOpacity, View } from 'react-native';
import StoreTemp from '../../../StoreTemp';
import DataBase from '../../../DataBase';
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            // itemType:"",
            params: ["onSelect?"],
            item: item,
            title: "Clientes del empleado",
            excludes: []
        });
        this.state = {
            select: {
                "mapa": true,
                "new": true,
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
            flexDirection: "row"
        }} onPress={() => {
            SNavigation.navigate(root, { pk: this.pk })
        }} >
            {!icon ? null : <><SView width={12} height={12}>
                <SIcon name={icon} fill={STheme.color.text} />
            </SView>
                <SView width={8} /></>}
            <SText color={STheme.color.text} >{label}</SText>
        </TouchableOpacity>
    }
    $menu() {
        let menu = super.$menu();
        menu.push({ children: this.optionItem({ key: "new", label: "+ Crear cliente", color: STheme.color.card, root: "/tbcli/new" }) })
        menu.push({ children: this.optionItem({ key: "mapa", label: "En Mapa", color: STheme.color.card, icon: 'Imap', root: "/tbemp/profile/tbclimapa" }) })
        return menu;
    }

}
export default connect(index);
const Parent2 = {
    name: "Clientes del empleado",
    path: `/tbcli`,
    model: Model.tbcli
}
class Lista extends DPA.list {
    constructor(props) {
        // Model.tbcli.Action.CLEAR();
        super(props, {
            type: "componentTitle",
            Parent: Parent2,
            title: Parent2.name,
            item: item2,
            excludes: []
        });
        this.state = {}
    }

    // $allowNew() {
    //     return true
    //     return Parent2.model.Action.getPermiso({ url: Parent.path, permiso: "new" });
    // }
    componentDidMount() {
        console.log(`cliidemp == ${this.props?.pi?.pk}`)
        DataBase.tbcli.filtered(`cliidemp == ${this.props?.pi?.pk}`).then((e) => {
            this.setState({ data: e })
        })
    }
    // $filter(data) {
    //     return data.cliest == "0"
    // }

    // $onSelect(data) {
    //     SStorage.setItem("tbcli_a_comprar", JSON.stringify(data))
    //     SNavigation.navigate("/public")
    // }
    $order() {
        return [{ key: "pedidos", order: "desc" }]
    }
    $onSelect(data) {
        // SStorage.setItem("tbcli_a_comprar", JSON.stringify(data))
        SNavigation.navigate("/tbcli/profile", { pk: data.idcli })
    }
    $getData() {
        if (!this.state.data) this.componentDidMount();
        // DataBase.tbcli.filtered(`cliidemp == ${this.idemp}`).then((e) => {
        //     this.setState({ cantidad_clientes: e.length })
        // })
        return this.state?.data;
        // return Parent2.model.Action.getAll({ cliidemp: this.props.route.params.pk})
    }
}