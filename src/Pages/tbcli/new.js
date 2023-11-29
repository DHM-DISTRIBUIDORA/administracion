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
        this.onSelect = SNavigation.getParam("onSelect");
        console.log("pk - ", this.pk);
    }

    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    selectDir() {
        const values = this.form.getValues();
        SNavigation.navigate("/tbcli/mapa", {
            callback: (resp) => {
                this.form.setValues({
                    clidir: resp.clidir,
                    clilat: resp.clilat + "",
                    clilon: resp.clilon + "",
                })
                console.log(resp);
                this.setState({ ubicacion: resp })
            },
            obj: {
                clidir: values?.clidir,
            },
            lat: parseFloat(values?.clilat ?? 0),
            lon: parseFloat(values?.clilon ?? 0),
        });
    }
    $inputs() {
        var inp = super.$inputs();
        inp["clidir"].label = "Dirección"
        inp["clidir"].editable = false

        inp["clidir"].onPress = (evt) => {
            this.selectDir()
        }
        // if (this.state?.ubicacion?.clilat) inp["clilat"].value = this.state?.ubicacion?.clilat;
        // if (this.state?.ubicacion?.clilon) inp["clilon"].value = this.state?.ubicacion?.clilon;

        // inp["clicod"].label = "Código de cliente"
        inp["clinom"].label = "Nombre completo"
        inp["clinom"].onSubmitEditing = (evt) => {
            this.form.focus("clirazon");
        }
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
        inp["clirazon"].onSubmitEditing = (evt) => {
            this.form.focus("clinit");
        }
        inp["clinit"].label = "NIT"
        inp["clinit"].onSubmitEditing = (evt) => {
            this.form.focus("clitel");
        }
        inp["clitel"].label = "Teléfono"
        inp["clitel"].type = "phone"
        inp["clitel"].onSubmitEditing = (evt) => {
            this.form.focus("cliemail");
        }
        inp["cliemail"].label = "Correo electrónico"
        inp["cliemail"].type = "text"
        // inp["cliemail"].required = true
        // inp["cliemail"].onKeyPress = (evt) => {
        //     if (evt.key === "Enter") {

        //     }
        // }
        inp["idcat"].label = "Tipo de cliente o Categoria"
        inp["idcat"].editable = false;
        inp["idcat"].required = true;
        inp["idcat"].defaultValue = (this.state?.idcat ?? "") + "";
        inp["idcat"].onPress = () => {
            SNavigation.navigate("/tbcli/listCliCat", {
                onSelect: (cat) => {
                    console.log(cat);
                    this.form.setValues({
                        idcat: cat.idcat + "",
                    })
                    // this.setState({ idcat: cat.idcat })
                }
            })
        }
        // inp["clinom"].on
        // inp["clitipgar"].label = "Tipo de Garantía"
        // inp["cliforpag"].label = "Forma de pago"
        // inp["clitipdoc"].label = "Tipo de documento"
        inp["clilat"].label = "Latitud"
        inp["clilat"].col = "xs-5.5"
        inp["clilat"].editable = false
        inp["clilat"].onPress = (evt) => {
            this.selectDir()
        }
        inp["clilon"].label = "Longitud"
        inp["clilon"].col = "xs-5.5"
        inp["clilon"].editable = false
        inp["clilon"].onPress = (evt) => {
            this.selectDir()
        }
        // inp["cliidtipo"].label = "Id Tipo"

        inp["idz"].label = "Zona del cliente"
        inp["idz"].editable = false;
        inp["idz"].defaultValue = (this.state.idz ?? "") + "";
        inp["idz"].required = true;
        inp["idz"].onPress = () => {
            SNavigation.navigate("/tbzon", {
                onSelect: (zona) => {
                    console.log(zona);
                    this.form.setValues({
                        idz: zona.idz + "",
                    })
                    // this.setState({ idz: zona.idz + "" })
                }
            })
        }

        return inp;
    }
    $onSubmit(data) {
        // console.log("aaaaaa");
        // console.log(data);

        data.idz = parseInt(data.idz)
        data.idcat = parseInt(data.idcat)
        data.clilat = parseFloat(data.clilat ?? 0)
        data.clilon = parseFloat(data.clilon ?? 0)

        if (this.pk) data.cliidemp = this.pk;

        data.cliest = 0;

        // console.log("bbbbbb");
        console.log(data);


        Parent.model.Action.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            console.log("asdasdasdad")
            // this.$submitFile(resp.data.key);
            if (this.onSelect) {
                this.onSelect(resp)
                SNavigation.goBack();
            } else {
                SNavigation.replace("/tbcli/profile", { pk: data.idcli })
            }


        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);