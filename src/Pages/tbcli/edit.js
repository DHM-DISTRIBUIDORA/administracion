import React, { Component } from 'react';

import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup, SText } from 'servisofts-component';
import Model from '../../Model';
import SSocket from 'servisofts-socket'

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: [],
            title: "Editar " + Parent.title,
        });
        this.state = {
            ubicacion: null
        };
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }

    $inputs() {
        var inp = super.$inputs();
        inp["clilat"].onPress = (evt) => {
            SNavigation.navigate("/tbcli/mapa", {
                callback: (resp) => {
                    console.log(resp)
                    this.setState({ ubicacion: resp })
                }
            });
        }
        if (this.state?.ubicacion?.clilat) inp["clilat"].value = this.state?.ubicacion?.clilat;
        if (this.state?.ubicacion?.clilon) inp["clilon"].value = this.state?.ubicacion?.clilon;

        return inp;
    }

    $onSubmit(data) {
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