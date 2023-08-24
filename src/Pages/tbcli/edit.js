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
        console.log(this.state?.ubicacion?.clilat + " / " + this.state?.ubicacion?.clilon)
        if (this.state?.ubicacion?.clilat) inp["clilat"].value = this.state?.ubicacion?.clilat;
        if (this.state?.ubicacion?.clilon) inp["clilon"].value = this.state?.ubicacion?.clilon;
        inp["clilat"].onPress = (evt) => {
            let newLat;
            let newLon;
            if (inp["clilat"].value == "") {
                newLat = 0;
                newLon = 0;
            } else if (this.state?.ubicacion?.clilat) {
                newLat = this.state?.ubicacion?.clilat;
                newLon = this.state?.ubicacion?.clilon;
            } else {
                newLat = this.data?.clilat;
                newLon = this.data?.clilon;
            }
            SNavigation.navigate("/tbcli/mapa",
                {
                    callback: (resp) => {
                        this.setState({ ubicacion: resp })
                    },
                    lat: newLat,
                    lon: newLon,
                    pk: this.pk
                },
            )
        }
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