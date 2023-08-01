import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import Model from '../../../Model';
import item from '../item';
import { SHr, SImage, SInput, SList, SLoad, SNavigation, SStorage, SText, STheme, SView, SIcon } from 'servisofts-component';
import SSocket from "servisofts-socket"


class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: []

        });
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
    $item(obj) {

        // console.log(Model.tbemp._get_image_download_path(SSocket.api, this.pk) + "__lll")
        return <SView col={"xs-12"} center>
            <SHr />
            <SView col={"xs-12"} height={200} center>
                <SView width={100} height={100} card style={{
                    borderRadius: 28,
                    overflow: "hidden",
                }}>
                     <SImage src={require('../../../Assets/img/sinFoto.png')} style={{
                        resizeMode: "cover"
                    }} />
                    <SImage src={Model.tbemp._get_image_download_path(SSocket.api, this.pk)} style={{
                        resizeMode: "cover"
                    }} />
                </SView>
                <SHr />
                <SText bold fontSize={16}>{`${obj.clinom}`}</SText>
                <SText>{`${obj.idcli} - ${obj.clicod}`}</SText>
            </SView>
            <SHr />
        </SView>
    }
}
export default connect(index);