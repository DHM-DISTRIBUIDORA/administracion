import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["zterr", "ztipo", "idterr", "zest", "zdmsest", "zdesfin", "znsuc", "idgz", "zmarc", "sucreg", "zusumod", "zfecmod"]
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $inputs() {
        // const a = <SForm inputs={{ "idemp": {} }} />
        var inp = super.$inputs();
        console.log(inp["idemp"].defaultValue + " AQUI")
        // var dataEmpleado = Model.tbven.Action.getByKey(inp["idemp"].defaultValue);
        // console.log(dataEmpleado)
        inp["zcod"].label = "Código zona"
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
        inp["znom"].label = "Nombre zona"
        inp["zdia"].label = "Día"
        inp["zdia"].type = "select";

        const dia = [
            // { key: "", content: "Seleccione..." },
            { key: 0, content: "Domingo" },
            { key: 1, content: "Lunes" },
            { key: 2, content: "Martes" },
            { key: 3, content: "Miércoles" },
            { key: 4, content: "Jueves" },
            { key: 5, content: "Viernes" },
            { key: 6, content: "Sábado" }
        ]
        inp["zdia"].options = dia;

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