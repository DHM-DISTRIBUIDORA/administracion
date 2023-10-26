import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import itemCat from './itemCat';
import DataBase from '../../DataBase';
// import item from './item';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            title: "Lista de " + Parent.name,
            item: itemCat,
            // excludes: ['zterr','ztipo','idterr','zest','zdia','zdmsest','zdesfin','znsuc','idgz','zmarc','sucreg'],
            onRefresh: (resolve) => {
                Parent.model.Action.CLEAR();
                resolve();
            }
        });
    }
    componentDidMount() {
        DataBase["tbcat"].all().then(e => {
            console.log(e)
            this.setState({ dataCAtegoria: e })
        })
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        // if (Model.usuario.Action.getUsuarioLog()?.idvendedor) return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $filter(data) {
        return data.catidclit == 0
    }
    $order() {
        // return [{ key: "pedidos", order: "desc" }]
        return [{ key: "catnom", order: "desc" }]
    }
    // async $getData() {
        
    //     const e = await DataBase["tbcat"].all();
    //     console.log(e);
    //     return e;
    // }

    $getData() {
         return this.state?.dataCAtegoria;
    }
}
export default connect(index);