import React, { Component } from 'react';

import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
import { Data } from 'servisofts-background-location';
import DataBase from '../../DataBase';
import { Trigger } from 'servisofts-db';
import { SNavigation } from 'servisofts-component';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            title: "Lista de " + Parent.title + "s",
            item: item,
            params: ["idemp?"],
            excludes: [],
            onRefresh: (resolve) => {
                Parent.model.Action.CLEAR();
                if (resolve) resolve();
            }
        });

    }
    componentDidMount() {

        this.t1 = Trigger.addEventListener({
            on: ["insert", "update", "delete"],
            tables: ["tbcli"]
        }, (evt) => {
            console.log("ENTRO EN EL TRIGGERRRRRR", evt)
            this.loadData();
        });
        this.loadData();

    }
    componentWillUnmount() {
        Trigger.removeEventListener(this.t1);
    }

    async loadData() {
        if (this?.$params?.idemp) {
            DataBase.tbcli.filtered("idemp = ?", [this.$params.idemp]).then((res) => {
                this.setState({ data: res })
            })
        } else {
            DataBase.tbcli.all().then((res) => {
                this.setState({ data: res })
            })
        }
        //     const cantidad_zonas = await DataBase.tbzon.filtered(`idemp == ${this.props?.pi?.pk}`)
        //     let query = "";
        //     cantidad_zonas.map((z, i) => {
        //         if (i > 0) query += " || "
        //         query += `idz == ${z.idz}`
        //     })
        //     const cantidad_clientes = await DataBase.tbcli.filtered(query)
        //     this.setState({ data: cantidad_clientes })
        //     console.log("cantidad_clientes")
        //     console.log(cantidad_clientes)

        // const clientes = await DataBase.tbcli.all()
        // this.setState({ data: clientes })
    }


    onNew() {
        if(!this.onSelect){
            return super.onNew();
        }
        SNavigation.navigate("/tbcli/new", { onSelect: (cli)=>{
            if(this.onSelect){
                this.onSelect(cli)
            }
            SNavigation.goBack();
        } });
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
    $filter(data) {
        return data.estado != 0
    }


    $getData() {
        return this.state.data;
        // return Parent.model.Action.getAll({ ...this.$params });
    }
}
export default connect(index);