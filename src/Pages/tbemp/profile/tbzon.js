import React, { Component } from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SImage, SInput, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
// import ListaUsuarios from './Components/ListaUsuarios';
import item from "../item"
import item2 from '../../tbzon/item';
import DataBase from '../../../DataBase';
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
        DataBase.tbemp.objectForPrimaryKey(parseInt(this.pk)).then(e => {
            this.setState({ data: e })
        }).catch(e => {
            console.error(e)
        })
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
        return this.state.data;
        // return Parent.model.Action.getByKey(this.pk);
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
    name: "Zonas del empleado",
    path: `/tbzon`,
    model: Model.tbzon
}
class Lista extends DPA.list {
    constructor(props) {
        super(props, {
            type: "componentTitle",
            Parent: Parent2,
            title: Parent2.name,
            item: item2,
            excludes: []
        });
    }

    componentDidMount() {
        DataBase.tbzon.filtered(`idemp == ${this.props.pi.pk}`).then((data) => {
            this.setState({ data: data })
        })
    }
    $filter(data) {
        return data.zest == "0"
    }
    $getData() {
        return this.state.data;
    }
}