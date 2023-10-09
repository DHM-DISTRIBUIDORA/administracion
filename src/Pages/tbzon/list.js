import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
// import item from './item';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            title: "Lista de " + Parent.name,
            item: item,
            excludes: ['zterr','ztipo','idterr','zest','zdia','zdmsest','zdesfin','znsuc','idgz','zmarc','sucreg'],
            onRefresh: (resolve) => {
                Parent.model.Action.CLEAR();
                resolve();
            }
        });
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        if (Model.usuario.Action.getUsuarioLog()?.idvendedor) return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $filter(data) {
        return data.zest != 1
    }
    $order() {
        // return [{ key: "pedidos", order: "desc" }]
        return [{ key: "ventas", order: "desc" }]
    }
    $getData() {
        return Parent.model.Action.getAll();
    }
}
export default connect(index);