import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
// import item from './item';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            title: "Lista de " + Parent.name,
            excludes: ['zterr','idterr','zest','zdia','zdmsest','zdesfin','znsuc','idgz','zmarc','sucreg'],
            onRefresh: (resolve) => {
                Parent.model.Action.CLEAR();
                resolve();
            }
        });
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $filter(data) {
        return data.estado != 1
    }
    $getData() {
        return Parent.model.Action.getAll();
    }
}
export default connect(index);