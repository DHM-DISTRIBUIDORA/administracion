import React, { Component } from 'react';

import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SLoad, SNavigation, SPopup, SText } from 'servisofts-component';
import Model from '../../Model';
import SSocket from 'servisofts-socket'

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["cliape","clizona","climpid", "clidocid", "clicicompl", "clireprsci", "clireprs", "idrg", "cliidcta", "sucreg", "climpdoc", "cliico", "cliote", "fecmod", "usumod", "dmsest",
                "clifax", "clicom", "clidep", "idclir", "clisic", "idloc", "cliloc", "idciu", "cliinter", "cliidemp", "clidirnro", "clidesfin", "iddepcli", "cliadic",
                "clitlimcre", "clilimau", "cliplazo", "cliest", "clicuo","climz", "clifing","idconf","cliuv","idds","climon","idcat","idcanal","clicel"],
            title: "Editar " + Parent.title,
        });
        this.state = {
            ubicacion: null
        };
    }
    $allowAccess() {
        return true;
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
        inp["clicod"].label = "Código de cliente"
        inp["clinom"].label = "Nombre completo"
        inp["clinit"].label = "NIT"
        inp["clidir"].label = "Dirección"
        inp["clitel"].label = "Teléfono"
        inp["cliemail"].label = "Correo electrónico"
        inp["clitipgar"].label = "Tipo de Garantía"
        inp["cliforpag"].label = "Forma de pago"
        inp["clitipdoc"].label = "Tipo de documento"
        inp["clirazon"].label = "Razón"
        inp["clilat"].label = "Latitud"
        inp["clilon"].label = "Longitud"
        inp["cliidtipo"].label = "Id Tipo"

        inp["idz"].label = "Id zona"
        inp["idz"].editable = false;
        inp["idz"].value = this.state.idz;
        inp["idz"].onPress = () => {
            SNavigation.navigate("/tbzon", {
                onSelect: (zona) => {
                    console.log(zona);
                    this.setState({ idz: zona.idz })
                }
            })
        }

        return inp;
    }

    $onSubmit(data) {
        if (this.state.loading) return;
        this.setState({ loading: true })
        Parent.model.Action.editar({
            data: {
                ...this.data,
                ...data
            },
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            this.setState({ loading: false })
            SNavigation.goBack();
        }).catch(e => {
            this.setState({ loading: false })
            console.error(e);

        })
    }
    $submitName() {
        return !this.state.loading ? "Aceptar" : <SLoad />
    }


}

export default connect(index);