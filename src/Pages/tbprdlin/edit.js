import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ['idprv', 'linusumod', 'linfecmod', 'idctaing', 'idctacos', 'idctaingdoc','idctacosdoc', 'linice', 'linicefv','sucreg']
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $inputs() {
        var inp = super.$inputs();
        // inp["idlinea"].label = "Id"
        inp["linnom"].label = "Nombre"
        inp["linniv"].label = "Nivel"
        inp["lincod"].label = "Código"
        return inp;
    }
    
    $onSubmit(data) {

        data.prdest = 1
        data.prduvdef = 1
        data.prddim = 0
        data.prdvol = 0
        data.prdmed = 0
        data.prusumod = ""
        data.prfecmod = ""
        data.prdeqpt = 1

        Parent.model.Action.editar({
            data: {
                ...this.data,
                ...data
            },
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);