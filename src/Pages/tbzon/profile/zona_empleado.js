
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



const Parent2 = {
    name: "Empleados en la zona",
    path: `/zona_empleado`,
    model: Model.tbemp
}
class Lista extends DPA.list {
    constructor(props) {
        Model.tbcli.Action.CLEAR();
        super(props, {
            type: "componentTitle",
            Parent: Parent2,
            title: Parent2.name,
            item: item2,
            excludes: []
        });
    }
    state = {}
    componentDidMount() {
        DataBase.zona_empleado.filtered("idz == $0", this.props.pi.pk).then(arr_zonas_empleados => {
            let query = "";
            arr_zonas_empleados.map((a, i) => {
                if (i > 0) query += " || "
                query += `idemp == ${a.idemp}`
            })
            if (!query) {
                this.setState({ data: [] })
                return
            }
            DataBase.tbemp.filtered(query).then((e) => {
                this.setState({ data: e })
            })
        })

    }

    $allowNew() {
        return true;
    }
    onNew() {
        SNavigation.navigate("/tbemp", {
            onSelect: (tbemp) => {
                DataBase.zona_empleado.insert({
                    key: SUuid(),
                    idemp: tbemp.idemp,
                    idz: this.props.pi.pk,
                    estado: 1,
                    key_usuario: Model.usuario.Action.getKey(),
                }).then(e => {
                    console.log("Succes", e)
                }).catch(e => {
                    console.error(e);
                })

            }
        })
    }

    // $filter(data) {
    //     return data.zest == "0"
    // }
    // $order() {
    //     return [{ key: "pedidos", order: "desc" }]
    // }
    $getData() {
        return this.state.data
    }
}