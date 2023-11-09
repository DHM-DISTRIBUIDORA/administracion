import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
import DataBase from '../../DataBase';
// import item from './item';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            title: "Lista de " + Parent.title + "s",
            item: item,
            //excludes: ['usest','iniciales','modpreven','idcentro','suctod','usultsuc','verval','selcob','autcred','pcpred','facauto','uimpr'],
            onRefresh: (resolve) => {
                Parent.model.Action.CLEAR();
                resolve();
            }
        });
    }

    componentDidMount() {
        DataBase.tbemp.all().then((res) => {
            this.setState({ data: res })
        })
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    // $filter(data) {
    //     return data.empest != "1"
    // }
    $getData() {
        // console.log(Parent.model.Action.getAll())
        return this.state.data;
    }

}
export default connect(index);