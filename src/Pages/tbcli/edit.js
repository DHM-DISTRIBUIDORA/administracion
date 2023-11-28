import React, { Component } from 'react';

import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SLoad, SNavigation, SPopup, SText } from 'servisofts-component';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
import DataBase from '../../DataBase';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["cliape", "clizona", "climpid", "clidocid", "clicicompl", "clireprsci", "clireprs", "idrg", "cliidcta", "sucreg", "climpdoc", "cliico", "cliote", "fecmod", "usumod", "dmsest",
                "clifax", "clicom", "clidep", "idclir", "clisic", "idloc", "cliloc", "idciu", "cliinter", "cliidemp", "clidirnro", "clidesfin", "iddepcli", "cliadic",
                "clitlimcre", "clilimau", "cliplazo", "cliest", "clicuo", "climz", "clifing", "idconf", "cliuv", "idds", "climon", "idcanal", "clicel", "clitipgar", "cliforpag", "clitipdoc", "idclit", "cliidtipo"],
            title: "Editar " + Parent.title,
        });
        this.state = {
            ubicacion: null
        };
    }

    componentDidMount() {
        DataBase.tbcli.objectForPrimaryKey(parseInt(this.pk)).then(e => {
            this.setState({ data: e })
        }).catch(e => {

        })
    }
    $allowAccess() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return this.state?.data;
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
        // console.log(this.state?.ubicacion?.clilat + " / " + this.state?.ubicacion?.clilon)
        // if (this.state?.ubicacion?.clilat) inp["clilat"].value = this.state?.ubicacion?.clilat;
        // if (this.state?.ubicacion?.clilon) inp["clilon"].value = this.state?.ubicacion?.clilon;
        // inp["clilat"].onPress = (evt) => {
        //     let newLat;
        //     let newLon;
        //     if (inp["clilat"].value == "") {
        //         newLat = 0;
        //         newLon = 0;
        //     } else if (this.state?.ubicacion?.clilat) {
        //         newLat = this.state?.ubicacion?.clilat;
        //         newLon = this.state?.ubicacion?.clilon;
        //     } else {
        //         newLat = this.data?.clilat;
        //         newLon = this.data?.clilon;
        //     }
        //     SNavigation.navigate("/tbcli/mapa",
        //         {
        //             callback: (resp) => {
        //                 this.setState({ ubicacion: resp })
        //             },
        //             lat: newLat,
        //             lon: newLon,
        //             pk: this.pk
        //         },
        //     )
        // }
        inp["clicod"].label = "Código de cliente"
        inp["clinom"].label = "Nombre completo"
        inp["clinit"].label = "NIT"
        inp["clidir"].label = "Dirección"
        inp["clitel"].label = "Teléfono"
        inp["clitel"].type = "phone"
        inp["cliemail"].label = "Correo electrónico"
        inp["idcat"].label = "Tipo de cliente o Categoria"
        inp["idcat"].editable = false;
        inp["idcat"].defaultValue = this.state?.data?.idcat + "";
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
        // inp["clitipgar"].label = "Tipo de Garantía"
        // inp["cliforpag"].label = "Forma de pago"
        // inp["clitipdoc"].label = "Tipo de documento"
        inp["clirazon"].label = "Razón"

        inp["clilat"].label = "Latitud"
        inp["clilat"].col = "xs-5.5"
        inp["clilat"].editable = false
        inp["clilat"].defaultValue = this.state?.data?.clilat + "";
        inp["clilat"].onPress = (evt) => {
            this.selectDir()
        }
        inp["clilon"].label = "Longitud"
        inp["clilon"].col = "xs-5.5"
        inp["clilon"].editable = false
        inp["clilon"].defaultValue = this.state?.data?.clilon + "";
        inp["clilon"].onPress = (evt) => {
            this.selectDir()
        }

        inp["idz"].label = "Zona de cliente"
        inp["idz"].editable = false;
        inp["idz"].defaultValue = this.state?.data?.idz + "";
        inp["idz"].onPress = () => {
            let idemp = ""
            if (Model.usuario.Action.getUsuarioLog().idvendedor) idemp = Model.usuario.Action.getUsuarioLog().idvendedor
            SNavigation.navigate("/tbzon", {
                onSelect: (zona) => {
                    console.log(zona);
                    this.form.setValues({
                        idz: zona.idz + "",
                    })
                    // this.setState({ idz: zona.idz })
                },
                idemp: idemp
            })
        }

        return inp;
    }

    $onSubmit(data) {
        // data.cliest = 0;
        if (this.state.loading) return;
        this.setState({ loading: true })
        data.idz = parseInt(data.idz)
        data.idcat = parseInt(data.idcat)
        data.clilat = parseFloat(data.clilat ?? 0)
        data.clilon = parseFloat(data.clilon ?? 0)

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