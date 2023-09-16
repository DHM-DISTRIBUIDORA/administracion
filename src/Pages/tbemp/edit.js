import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: [ "empmarc"],
            title: "Perfil de " + Parent.title,

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

        inp["idemt"].label = "Id tipo empleado"
        inp["idemt"].editable = false;
        inp["idemt"].value = this.state.idemt;
        inp["idemt"].onPress = () => {
            SNavigation.navigate("/tbemt", {
                onSelect: (emt) => {
                    console.log(emt);
                    this.setState({ idemt: emt.idemt })
                }
            })
        }

        return inp;
    }
    
    $onSubmit(data) {
        let dataFinal = {
            ...this.data,
            ...data
        }
        delete dataFinal["image_profile"]
        delete dataFinal["empmarc"]
        Parent.model.Action.editar({
            data: dataFinal,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);