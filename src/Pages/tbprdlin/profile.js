import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: ['usest','iniciales','modpreven','idcentro','suctod','usultsuc','verval','selcob','autcred','pcpred','facauto','uimpr'],

        });
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
}
export default connect(index);