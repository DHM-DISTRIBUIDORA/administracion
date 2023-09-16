import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: [ "empmarc"]
        });
    }

    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
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
        delete data["empmarc"]
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