import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
import { SList, SLoad, SMath, SText, SView } from 'servisofts-component';
import { Carrito } from '../../Components';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: ['usest', 'iniciales', 'modpreven', 'idcentro', 'suctod', 'usultsuc', 'verval', 'selcob', 'autcred', 'pcpred', 'facauto', 'uimpr'],

        });
    }

    componentDidMount(){
        Model.tbvd.Action.CLEAR();
    }

    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        // let detalle = Model.tbvd.Action.getAll({ idven: this.pk })
        // const productos = Model.tbprd.Action.getAll();
        // if (!detalle) return <SLoad />
        // if (!productos) return <SLoad />
        // return <SView col={"xs-12"}>
        //     <SList data={detalle} render={vd => {
        //         const producto = productos[vd.idprd]
        //         return <SView>
        //             <SText>{producto?.prdnom}</SText>
        //             <SText>Bs. {SMath.formatMoney(vd?.vdpre)}   X   {vd?.vdcan}</SText>
        //         </SView>
        //     }} />
        // </SView>
        return <Carrito.DetalleVenta idven ={this.pk} />
    }


}
export default connect(index);