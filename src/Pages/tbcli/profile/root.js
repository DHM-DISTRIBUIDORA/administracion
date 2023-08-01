import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import Model from '../../../Model';
import item from '../item';
import { SHr, SImage, SInput, SList, SLoad, SNavigation, SStorage, SText, STheme, SView, SIcon } from 'servisofts-component';
import SSocket from "servisofts-socket"


class index extends DPA.profile {
    state = {
        cantidad_compras: 0,
        maxima_compra: 0,
        cantidad_pedidos: 0,
        minima_compra: 0
    }
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: []

        });

    }

    componentDidMount() {
        SSocket.sendPromise({
            component: "tbcli",
            type: "getPerfil",
            idcli: this.pk + ""
        }).then((e) => {
            const obj = e.data[0]
            this.setState({ ...obj })
        }).catch(e => console.error(e))
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

    ItemCard = ({ label, cant, icon, color, onPress }) => {
        return <SView col={"xs-12 md-6"} height={100} padding={6} onPress={onPress} >
            <SView card flex col={"xs-12"} style={{
                borderRadius: 14,
                borderBottomWidth: 4,
                borderLeftWidth: 3,
                borderRightWidth: 1,
                borderColor: STheme.color.card,
                padding: 15
            }} row center>
                <SView width={50} center padding={4} height
                    style={{
                        backgroundColor: color + "40",
                        borderRadius: 50
                    }}
                >
                    <SIcon name={icon} fill={color} height={30} />
                    {/* {icon ? icon : null} */}
                </SView>
                <SView width={4} />
                <SView flex height style={{
                    justifyContent: "center"
                }}>
                    <SText bold fontSize={18}>{cant}</SText>
                    <SText fontSize={12} color={STheme.color.gray}>{label}</SText>
                </SView>
            </SView>
        </SView>
    }

    $item(obj) {

        // console.log(Model.tbemp._get_image_download_path(SSocket.api, this.pk) + "__lll")
        return <SView col={"xs-12"} center>
            <SHr />
            <SView col={"xs-12"} height={200} center>
                <SView width={100} height={100} card style={{
                    borderRadius: 28,
                    overflow: "hidden",
                    backgroundColor: STheme.color.white
                }} center>


                    <SImage src={require('../../../Assets/img/sinFoto.png')} style={{
                        resizeMode: "contain",
                        position: "absolute",
                        zIndex: 90,
                        top: 0,
                        width: 50
                    }} />
                    <SImage src={Model.tbcli._get_image_download_path(SSocket.api, this.pk)} style={{
                        resizeMode: "cover",
                        zIndex: 99,
                        // backgroundColor:STheme.color.white
                    }} />
                </SView>
                <SHr />
                <SText bold fontSize={16}>{`${obj.clinom}`}</SText>
                <SText>{`${obj.idcli} - ${obj.clicod}`}</SText>
            </SView>
            <SHr />
            <SView col={"xs-12"} center row style={{
                justifyContent: "space-between"
            }}>
                {this.ItemCard({
                    label: "Cantidad de compras",
                    cant: this.state.cantidad_compras,
                    // icon: <SIcon name='Icompras' />,
                    icon: 'Icompras',
                    color: '#8CB45F',
                    onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbcli", { pk: this.pk }) : null
                })}
                {this.ItemCard({
                    label: "Cantidad de pedidos",
                    cant: this.state.cantidad_pedidos,
                    // icon: <SIcon name='Ipedidos' />,
                    icon: 'Ipedidos',
                    color: '#FF5A5F',
                    onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })}
                {this.ItemCard({
                    label: "Máxima compra",
                    cant: (this.state.maxima_compra).toFixed(2),
                    // icon: <SIcon name='Ipedidos' />,
                    icon: 'ImaxCompra',
                    color: '#A5236E',
                    onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })}
                {this.ItemCard({
                    label: "Mínima compra",
                    cant: (this.state.minima_compra).toFixed(2),
                    // icon: <SIcon name='Ipedidos' />,
                    icon: 'IminCompra',
                    color: '#00A0AA',
                    onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })}



            </SView>
            <SHr />
        </SView>
    }
}
export default connect(index);