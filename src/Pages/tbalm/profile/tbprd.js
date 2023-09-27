import React, { Component } from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SImage, SInput, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import item from '../item';
import item2 from '../../tbprd/item';
// import ListaUsuarios from './Components/ListaUsuarios';
// import item from '../../tbp/item';
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
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
    name: "Productos",
    path: `/tbprd`,
    model: Model.tbprd
}
class Lista extends DPA.list {
    constructor(props) {
        super(props, {
            type: "componentTitle",
            Parent: Parent2,
            title: "Productos",
            item: item2,
            excludes: []
        });
    }

    componentDidMount(){
        
    }
   
    $getData() {
        return Parent2.model.Action.getAllSimple({ idalm: this.props.pi.pk })
    }
}