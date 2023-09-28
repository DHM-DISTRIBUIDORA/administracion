import React, { Component } from 'react'
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: []
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

        inp["idemp"].label = "Id empleado"
        inp["idemp"].editable = false;
        inp["idemp"].value = this.state.idemp;
        inp["idemp"].onPress = () => {
            SNavigation.navigate("/tbemp", {
                onSelect: (emp) => {
                    console.log(emp);
                    this.setState({ idemp: emp.idemp })
                }
            })
        }

        inp["almncarga"].type = "select"
        inp["almncarga"].options = [{ key: "", content: "SELECCIONAR" }, { key: "SI", content: "SI" }, { key: "NO", content: "NO" }]

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