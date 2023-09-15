import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
import VentaItem from '../tbven/item';
import { SHr, SList, SLoad, SMath, SNavigation, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: [],

        });
    }

    componentDidMount() {
        SSocket.sendPromise({
            component: "tbven",
            type: "getVenta",
            idtg: this.pk
        }).then(e => {
            this.setState({ ventas: e.data })
        }).catch(e => {
            console.error(e);
        })
        // Model.tbvd.Action.CLEAR();
    }

    $allowEdit() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return true;
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
        if (!this.state.ventas) return <SLoad />
        return <SView col={"xs-12"} center>
            <SHr />
            <SList
                buscador
                data={this.state.ventas}
                render={o => <VentaItem data={o} onPress={() => {
                    SNavigation.navigate("/tbven/recibo", { pk: o.idven })
                }} />}
            />
        </SView>
    }


}
export default connect(index);