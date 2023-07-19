import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SIcon, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';

class index extends DPA.profile {
    constructor(props) {
        super(props, { Parent: Parent, excludes: [] });
    }
    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        return <SView col={"xs-12"} >
            <SHr />
            <SText fontSize={16} bold>Menú</SText>
            <SHr />
            {/* <MenuPages path={Parent.path+"/profile/"} permiso={"ver"} params={{
                pk: this.pk
            }}>
            </MenuPages> */}

            <MenuPages path={Parent.path + "/profile/"} permiso={"view"} params={{
                pk: this.pk
            }} >
                <MenuButtom url={Parent.path + "/profile/tbzon"} params={{ pk: this.pk }}
                    icon={<SIcon name={"Zonas"} />}  label={"Zonas"}  />
            </MenuPages>
        </SView>
    }

}
export default connect(index);