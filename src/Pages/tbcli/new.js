import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

// TODO: CLICOD SE DEBE ARMAR SOLO
class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["idcli", "clicod", "cliape", "clizona", "climpid", "clidocid", "clicicompl", "clireprsci", "clireprs", "idrg", "cliidcta", "sucreg", "climpdoc", "cliico", "cliote", "fecmod", "usumod", "dmsest",
                "clifax", "clicom", "clidep", "idclir", "clisic", "idloc", "cliloc", "idciu", "cliinter", "cliidemp", "clidirnro", "clidesfin", "iddepcli", "cliadic",
                "clitlimcre", "clilimau", "cliplazo", "cliest", "clicuo", "climz", "clifing", "idconf", "cliuv", "idds", "climon", "idcanal", "clicel", "clitipdoc",
                "cliforpag", "clitipgar", "cliidtipo", "idclit",
                // "clilat", "clilon",
            ],
            title: "Nuevo " + Parent.title,
        });
        this.state = {
            ubicacion: null,
            clirazon: "",
        };
        this.pk = SNavigation.getParam("pk");
        console.log("pk - ", this.pk);
    }

    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    $inputs() {
        var inp = super.$inputs();
        inp["clidir"].label = "Dirección"

        inp["clidir"].onPress = (evt) => {
            const values = this.form.getValues();
            SNavigation.navigate("/tbcli/mapa", {
                callback: (resp) => {
                    this.form.setValues({
                        clidir: resp.clidir,
                        clilat: resp.clilat,
                        clilon: resp.clilon,
                    })
                    console.log(resp);
                    this.setState({ ubicacion: resp })
                },
                obj: {
                    clidir: values?.clidir,
                },
                lat: values?.clilat,
                lon: values?.clilon,
            });
        }
        // if (this.state?.ubicacion?.clilat) inp["clilat"].value = this.state?.ubicacion?.clilat;
        // if (this.state?.ubicacion?.clilon) inp["clilon"].value = this.state?.ubicacion?.clilon;

        // inp["clicod"].label = "Código de cliente"
        inp["clinom"].label = "Nombre completo"
        inp["clinom"].onChangeText = (e) => {
            if (!this.state?.clirazon) {
                this.editRazon = true;
                this.form.setValues({
                    clirazon: e
                })
            }
        }
        inp["clirazon"].label = "Razón social"
        inp["clirazon"].onChangeText = (e) => {
            if (this.editRazon) {
                this.editRazon = false;
                return;
            }
            this.state.clirazon = e;
        }
        inp["clinit"].label = "NIT"
        inp["clitel"].label = "Teléfono"
        inp["clitel"].type = "phone"
        inp["cliemail"].label = "Correo electrónico"
        inp["cliemail"].type = "email"
        inp["cliemail"].required = true
        inp["idcat"].label = "Tipo de cliente o Categoria"
        // inp["clinom"].on
        // inp["clitipgar"].label = "Tipo de Garantía"
        // inp["cliforpag"].label = "Forma de pago"
        // inp["clitipdoc"].label = "Tipo de documento"
        inp["clilat"].label = "Latitud"
        inp["clilat"].col = "xs-5.5"
        inp["clilat"].editable = false
        inp["clilon"].label = "Longitud"
        inp["clilon"].col = "xs-5.5"
        inp["clilon"].editable = false
        // inp["cliidtipo"].label = "Id Tipo"

        inp["idz"].label = "Zona del cliente"
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
        // console.log("aaaaaa");
        // console.log(data);

        if (data.clilat == null || data.clilon == null) {
            data.clilat = 0;
            data.clilon = 0;
        }

        if (this.pk) data.cliidemp = this.pk;

        data.cliest = 0;

        // console.log("bbbbbb");
        // console.log(data);


        Parent.model.Action.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            console.log("asdasdasdad")
            // this.$submitFile(resp.data.key);
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);