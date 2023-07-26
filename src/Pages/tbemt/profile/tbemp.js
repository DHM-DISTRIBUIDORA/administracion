import React, { Component } from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SImage, SInput, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
// import ListaUsuarios from './Components/ListaUsuarios';
import item from '../../tbemp/item';
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            params: ["onSelect?"],
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

}
export default connect(index);



const Parent2 = {
    name: "Empleados del tipo",
    path: `/tbemp`,
    model: Model.tbemp
}
class Lista extends DPA.list {
    constructor(props) {
        super(props, {
            type: "componentTitle",
            Parent: Parent2,
            title: "Empleados",
            item: item,
            excludes: []
        });
    }

    $filter(data) {
        return data.empest == "0"
    }
    $getData() {
        return Parent2.model.Action.getAllBy({ idemt: this.props.pi.pk })
    }
}