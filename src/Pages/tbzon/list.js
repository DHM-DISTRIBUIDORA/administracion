import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
import DataBase from '../../DataBase';
// import item from './item';

class index extends DPA.list {
    state = {}
    constructor(props) {
        super(props, {
            Parent: Parent,
            title: "Lista de " + Parent.name,
            item: item,
            excludes: ['zterr', 'ztipo', 'idterr', 'zest', 'zdia', 'zdmsest', 'zdesfin', 'znsuc', 'idgz', 'zmarc', 'sucreg'],
            onRefresh: (resolve) => {
                Parent.model.Action.CLEAR();
                resolve();
            }
        });
        this.idvendedor = Model.usuario.Action.getUsuarioLog()?.idvendedor;
    }

    componentDidMount() {
        DataBase.tbzon.all().then(e => {
            console.log(e);
            this.setState({ data: e })
        });
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
        if (this.idvendedor) {
            if ((data?.idemp != this.idvendedor)) return false;
        }
        return (data.zest != 1)
        // return (data.zest != 1) 
    }
    $order() {
        // return [{ key: "pedidos", order: "desc" }]
        return [{ key: "ventas", order: "desc" }]
    }
    $getData() {
        return this.state.data ?? Parent.model.Action.getAll();
    }
}
export default connect(index);