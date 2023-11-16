import React, { Component } from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SImage, SInput, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
// import ListaUsuarios from './Components/ListaUsuarios';
import item from "../item"
import item2 from '../../tbzon/item';
import DataBase from '../../../DataBase';
import ZonaEmpleadoComponent from './components/ZonaEmpleadoComponent';
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
    $allowAccess() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return this.state.data;
        // return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        return (<SView col={"xs-12"}>
             <ZonaEmpleadoComponent idemp={this.pk}/>
        </SView>
        )
    }

}
export default connect(index);
