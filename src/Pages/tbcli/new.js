import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.new { 
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: []
        });
        this.state = {
            ubicacion: null
        };
    }

    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $inputs() {
        var inp = super.$inputs();
        inp["clilat"].onPress = (evt) => {
            SNavigation.navigate("/tbcli/mapa", {
                callback: (resp) => {
                    this.setState({ ubicacion: resp })
                }
            });
        }
        if (this.state?.ubicacion?.clilat) inp["clilat"].value = this.state?.ubicacion?.clilat;
        if (this.state?.ubicacion?.clilon) inp["clilon"].value = this.state?.ubicacion?.clilon;

        return inp;
    }
    $onSubmit(data) {
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