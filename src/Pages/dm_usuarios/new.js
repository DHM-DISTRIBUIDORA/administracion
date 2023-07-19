import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ['idus', 'usumod', 'fecmod', 'usest', 'modpreven', 'idcentro', 'suctod', 'usultsuc', 'verval', 'selcob', 'pcpred', 'facauto']
        });
    }

    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $inputs() {
        var inp = super.$inputs();
        inp["usuario"].label = "Usuario"
        inp["pass"].label = "Password"
        inp["nombre"].label = "Nombre Completo"
        return inp;
    }
    $onSubmit(data) {
        data.usest = 0
        data.modpreven = 1
        data.verval = 1
        data.selcob = 1
        data.fecmod = ""

        Parent.model.Action.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            this.$submitFile(resp.data.key);
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);