import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SLoad, SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';
import SSocket from 'servisofts-socket'


class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ['idprd', 'prdstmax', 'prdstmin', 'prdcom', 'prdmrc', 'barracod', 'barratipo', 'barramio', 'prdice', 'prddes', 'prdprec', 'prdest', 'prddesc', 'prdcms', 'prdtip', 'prdcb1', 'prdcb2', 'prdcb3', 'prdcb4', 'prdcb5', 'prdcb6', 'prdcb7', 'prdcb8', 'prdctaing', 'prdctacos', 'prdcms2', 'idanp', 'prdkxu', 'prduvdef', 'prdcodunilever', 'prdtvol', 'prdklxc', 'prduniua', 'prdskxc', 'idunicat', 'prdunides', 'idpg', 'prddim', 'prdvol', 'prdmed', 'prusumod', 'prfecmod', 'prdfoto', 'prdpxgr', 'prdeqpt', 'prdcap', 'idmarca', 'idmotor', 'prdmedidarep', 'prdbal', 'prdancho', 'prdalto', 'sucreg', 'idlinea', 'prdpmaycon', 'prdpmaycre', 'prdpmincon', 'prdpmincre', 'prdpespcon', 'prdpespcre', 'prdpsmcon', 'prdpsmcre', 'prdpagcon', 'prdpagcre', 'prdpagcre', 'prdabs', 'prdabs', 'prddst', 'prdpxv', 'prduxcdes', 'prduxd', 'prduxddes', 'prdpoficialUS', 'prdpmayconUS', 'prdpmaycreUS', 'prdpminconUS', 'prdpmincreUS', 'prdpespconUS', 'prdpespcreUS', 'prdpsmconUS', 'prdpsmcreUS', 'prdpagconUS', 'prdpagcreUS', 'prdp6con', 'prdp6cre', 'prdp7con', 'prdp7cre', 'prdp6conus', 'prdp6creus', 'prdp6creus', 'prdp7conus', 'prdp7creus']

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
        // inp["idprd"].label = "Id"
        inp["foto"] = {
            label: "Foto",
            key: "foto",
            type: "image",
            defaultValue: SSocket.api.root + "tbprd/" + this.pk,
            col: "xs-12",
            style: {
                height: 350
            }
        }
        inp["prdcod"].label = "Código"
        inp["prdcod"].style = { pointerEvents: "none" }
        inp["prdnom"].label = "Nombre producto"
        inp["prdnom"].style = { pointerEvents: "none" }
        inp["prdunid"].label = "Unidad producto"
        inp["prdunid"].style = { pointerEvents: "none" }
        inp["prdcxu"].label = "Unidad por caja"
        inp["prdcxu"].style = { pointerEvents: "none" }

        // inp["idlinea"].label = "Id línea"
        inp["prdpoficial"].label = "Precio Oficial"
        inp["prdpoficial"].style = { pointerEvents: "none" }


        // inp["prdpmaycon"].label = "Precio por mayor al contado"
        // inp["prdpmaycre"].label = "Precio por mayor al crédito"
        // inp["prdpmincon"].label = "Precio mínimo al contado"
        // inp["prdpmincre"].label = "Precio mínimo al crédito"
        // inp["prdpespcon"].label = "Precio especial al contado"
        // inp["prdpespcre"].label = "Precio especial al crédito"
        // inp["prdpsmcon"].label = "Precio prdpsmcon al contado"
        // inp["prdpsmcre"].label = "Precio prdpsmcre al crédito"
        // inp["prdpagcon"].label = "Precio prdpagcon al contado"
        // inp["prdpagcre"].label = "Precio prdpagcre al crédito"
        inp["prdcor"].label = "Detalle producto"
        inp["prdcor"].style = { pointerEvents: "none" }


        // inp["prdabs"].label = "Nose prdabs"
        // inp["prdabs"].type = "select"
        // inp["prdabs"].options = [{ key: "", content: "SELECCIONAR" }, { key: "SI", content: "SI" }, { key: "NO", content: "NO" }]

        // inp["prddst"].label = "Nose prddst"
        // inp["prddst"].type = "select"
        // inp["prddst"].options = [{ key: "", content: "SELECCIONAR" }, { key: "SI", content: "SI" }, { key: "NO", content: "NO" }]

        // inp["prdpxv"].label = "Nose prdpxv"
        // inp["prdpxv"].type = "select"
        // inp["prdpxv"].options = [{ key: "", content: "SELECCIONAR" }, { key: "SI", content: "SI" }, { key: "NO", content: "NO" }]

        // inp["prduxcdes"].label = "Nose prduxcdes"
        // inp["prduxd"].label = "Nose prduxd"
        // inp["prduxddes"].label = "Nose prduxddes"
        // inp["prdpoficialUS"].label = "Precio oficial en US"
        // inp["prdpmayconUS"].label = "Precio por mayor al contado en US"
        // inp["prdpmaycreUS"].label = "Precio por mayor al contado en US"
        // inp["prdpminconUS"].label = "Precio mínimo al contado en US"
        // inp["prdpmincreUS"].label = "Precio mínimo a crédito en US"
        // inp["prdpespconUS"].label = "Precio especial al contado en US"
        // inp["prdpespcreUS"].label = "Precio especial a crédito en US"
        // inp["prdpsmconUS"].label = "Precio prdpsmconUS en US"
        // inp["prdpsmcreUS"].label = "Precio prdpsmcreUS en US"
        // inp["prdpagconUS"].label = "Precio prdpagconUS en US"
        // inp["prdpagcreUS"].label = "Precio prdpagcreUS en US"
        // inp["prdp6con"].label = "Precio 6 al contado"
        // inp["prdp6cre"].label = "Precio 6 al crédito"
        // inp["prdp7con"].label = "Precio 7 al contado"
        // inp["prdp7cre"].label = "Precio 7 al crédito"
        // inp["prdp6conus"].label = "Precio 6 al contado en US"
        // inp["prdp6creus"].label = "Precio 6 al crédito en US"
        // inp["prdp7conus"].label = "Precio 7 al contado en US"
        // inp["prdp7creus"].label = "Precio 7 al crédito en US"

        return inp;
    }

    $onSubmitFile() {
        super.$onSubmitFile();
        this.form.uploadFiles(
            SSocket.api.root + "upload/tbprd/" + this.pk,
            "foto"
        );
    }

    $onSubmit(data) {

        data.prdest = 1
        data.prduvdef = 1
        data.prddim = 0
        data.prdvol = 0
        data.prdmed = 0
        data.prusumod = ""
        data.prfecmod = ""
        data.prdeqpt = 1

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