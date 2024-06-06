import React, { Component } from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SImage, SInput, SList, SLoad, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
// import ListaUsuarios from './Components/ListaUsuarios';
import item from "../item"
import DataBase from '../../../DataBase';
import AlmacenEmpleadoComponent from './components/AlmacenEmpleadoComponent';
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
            {/* <SText bold>Almacenes</SText> */}
            {/* <SText >Estos son los almacenes de los que puede ver productos un empleado</SText> */}
            <AlmacenEmpleadoComponent idemp={this.pk}/>
        </SView>
        )
    }

}
export default connect(index);
