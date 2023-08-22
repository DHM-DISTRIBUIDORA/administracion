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

        if (this.state?.ubicacion?.clilat) inp["clilat"].value = this.state?.ubicacion?.clilat;
        if (this.state?.ubicacion?.clilon) inp["clilon"].value = this.state?.ubicacion?.clilon;
        // if (this.state?.ubicacion?.clilat) this.data?.clilat = this.state?.ubicacion?.clilat;
        // if (this.state?.ubicacion?.clilon) this.data?.clilon= this.state?.ubicacion?.clilon;
        console.log(this.data?.clilat + " / " + this.state?.ubicacion?.clilat)
        console.log("lll")
        inp["clilat"].onPress = (evt) => {
            SNavigation.navigate("/tbcli/mapa",
                {

                    // lon:this.state?.ubicacion?.clilon,
                    callback: (resp) => {
                        this.setState({ ubicacion: resp })
                    },
                    lat: (this.data?.clilat == 0) ? this.state?.ubicacion?.clilat : this.data?.clilat,
                    lon: (this.data?.clilon == 0) ? this.state?.ubicacion?.clilon : this.data?.clilon,


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