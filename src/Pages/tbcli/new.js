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
            excludes: ["idcli","clicod","cliape","clizona","climpid", "clidocid", "clicicompl", "clireprsci", "clireprs", "idrg", "cliidcta", "sucreg", "climpdoc", "cliico", "cliote", "fecmod", "usumod", "dmsest",
            "clifax", "clicom", "clidep", "idclir", "clisic", "idloc", "cliloc", "idciu", "cliinter", "cliidemp", "clidirnro", "clidesfin", "iddepcli", "cliadic",
            "clitlimcre", "clilimau", "cliplazo", "cliest", "clicuo","climz", "clifing","idconf","cliuv","idds","climon","idcat","idcanal","clicel"],
            title: "Nuevo " + Parent.title,
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

        // inp["clicod"].label = "Código de cliente"
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