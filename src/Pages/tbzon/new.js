import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["idz", "zterr","ztipo", "idterr", "zest","zdia","zdmsest","zdesfin","znsuc","idgz","zmarc","sucreg","zusumod","zfecmod"]
        });
    }

    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }

    $inputs() {
        var inp = super.$inputs();
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
        return inp;
    }

    $onSubmit(data) {
        data.zterr = ""
        data.ztipo = "ZONE"
        data.idterr = 0
        data.zest = 0
        data.zdia = 0
        data.zdesfin = 0
        data.znsuc = 0
        data.idgz = 0
        data.sucreg = 0
        data.zfecmod = ""
        
        

        console.log(data)

        Parent.model.Action.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            // this.$submitFile(resp.data.idcli);
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);