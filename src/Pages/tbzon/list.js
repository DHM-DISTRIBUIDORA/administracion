import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
import DataBase from '../../DataBase';
import { SDate } from 'servisofts-component';
// import item from './item';

class index extends DPA.list {
    state = {
        idvendedor: Model.usuario.Action.getUsuarioLog()?.idvendedor,
    }
    constructor(props) {
        super(props, {
            Parent: Parent,
            title: "Lista de " + Parent.name,
            item: item,
            excludes: ['zterr', 'ztipo', 'idterr', 'zest', 'zdia', 'zdmsest', 'zdesfin', 'znsuc', 'idgz', 'zmarc', 'sucreg'],
            onRefresh: (resolve) => {
                Parent.model.Action.CLEAR();
                this.componentDidMount();
                if (resolve) resolve()
            }
        });
        this.idvendedor = Model.usuario.Action.getUsuarioLog()?.idvendedor;

        console.log("VENDEDOR");
        console.log(this.idvendedor);
    }

    componentDidMount() {

        this.loadData();
        // DataBase.tbzon.all().then(e => {
        //     console.log(e);
        //     this.setState({ data: e })
        // });
    }

    async loadData() {
        let zonas_habilitadas = {};
        if (!!this.idvendedor) {
            zonas_habilitadas = await DataBase.zona_empleado.filtered(`idemp == ${this.idvendedor} && dia == ${new SDate().date.getDay()}`)
            let query = "";
            zonas_habilitadas.map((z, i) => {
                if (i > 0) query += " || "
                query += `idz == ${z.idz}`
            })
            if (!!query) {
                DataBase.tbzon.filtered(query).then((data) => {
                    this.setState({ data: data })
                })
            } else {
                this.setState({ data: [] })
            }


        } else {
            DataBase.tbzon.all().then((data) => {
                this.setState({ data: data })
            })

        }

    }

    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        // if (Model.usuario.Action.getUsuarioLog()?.idvendedor) return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $filter(data) {
        // if (this.idvendedor) {
        //     // console.log("data.idemp");
        //     // console.log(data.idemp);
        //     // if ((data?.idemp != this.idvendedor)) return false;
        // }
        return (data.zest != 1)
        // return (data.zest != 1)  
    }
    $order() {
        // return [{ key: "pedidos", order: "desc" }]
        return [{ key: "ventas", order: "desc" }]
    }
    $getData() {
        return this.state.data;
    }
}
export default connect(index);