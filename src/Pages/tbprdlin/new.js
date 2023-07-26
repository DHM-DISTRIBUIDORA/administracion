import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ['idprv', 'linusumod', 'linfecmod', 'idctaing', 'idctacos', 'idctaingdoc','idctacosdoc', 'linice', 'linicefv','sucreg']
        });
    }

    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $inputs() {
        var inp = super.$inputs();
        inp["idlinea"].label = "Id"
        inp["linnom"].label = "Nombre"
        inp["linniv"].label = "Nivel"
        inp["lincod"].label = "Código"



        return inp;
    }
    $onSubmit(data) {

        data.linusumod = ""
        data.linfecmod = ""
        data.linicefv = ""


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