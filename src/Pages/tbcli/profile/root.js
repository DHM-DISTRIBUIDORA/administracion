import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import Model from '../../../Model';
import item from '../item';
import { SHr, SImage, SInput, SList, SLoad, SNavigation, SStorage, SText, STheme, SView, SIcon, SDate } from 'servisofts-component';
import SSocket from "servisofts-socket"
import { PButtom } from '../../../Components';
import SCharts from 'servisofts-charts';


class index extends DPA.profile {
    state = {
        cantidad_ventas: 0,
        maxima_venta: 0,
        cantidad_pedidos: 0,
        minima_venta: 0,
        primer_venta: "0000-00-00",
        ultima_venta: "0000-00-00"
        // primer_compra: new SDate(),
        // ultima_compra: new SDate()

    }
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: []

        });
        this.pk = SNavigation.getParam("pk");

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

    getGrafo() {
        return <>
            <SView col={"xs-12"} >
                <SText>GRÁFICO DE COMPRAS Y PEDIDOS</SText>
                <SHr />
                <SView col={"xs-12 md-12"} height={300} padding={6}  >
                    <SView card flex col={"xs-12"} style={{
                        borderRadius: 14,
                        borderBottomWidth: 4,
                        borderLeftWidth: 3,
                        borderRightWidth: 1,
                        borderColor: STheme.color.card,
                        padding: 15
                    }} row center>
                        <SCharts type='torta'
                            config={{
                                // endSpace:20
                            }}
                            data={[
                                { key: "compras", val: this.state.cantidad_compras, color: "#8CB45F66" ,},
                                { key: "pedidos", val: this.state.cantidad_pedidos, color: "#FA5A5F" },
                            ]} />
                    </SView>
                </SView>
            </SView>
        </>
    }

    $item(obj) {
        // console.log("rrrr")
        // console.log(obj)
        // console.log(Model.tbemp._get_image_download_path(SSocket.api, this.pk) + "__lll")
        if(!obj) return <SLoad/>
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
                <SText>{`${obj.idcli} | ${obj.clicod}`}</SText>
            </SView>
            <SHr />
            <SView col={"xs-12"} center row style={{
                justifyContent: "space-between"
            }}>
                {this.ItemCard({
                    label: "Cantidad de ventas",
                    cant: this.state.cantidad_ventas,
                    // icon: <SIcon name='Icompras' />,
                    icon: 'Icompras',
                    color: '#8CB45F',
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbcli", { pk: this.pk }) : null
                })}
                {this.ItemCard({
                    label: "Cantidad de pedidos",
                    cant: this.state.cantidad_pedidos,
                    // icon: <SIcon name='Ipedidos' />,
                    icon: 'Ipedidos',
                    color: '#FF5A5F',
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })}
                {this.ItemCard({
                    label: "Máxima venta",
                    cant: (this.state.maxima_venta).toFixed(2),
                    // icon: <SIcon name='Ipedidos' />,
                    icon: 'ImaxCompra',
                    color: '#B622B5',
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })}
                {this.ItemCard({
                    label: "Mínima venta",
                    cant: (this.state.minima_venta).toFixed(2),
                    // icon: <SIcon name='Ipedidos' />,
                    icon: 'IminCompra',
                    color: '#00A0AA',
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })}
                {this.ItemCard({
                    label: "Primer venta",
                    cant: this.state.primer_venta.split(' ')[0],
                    // icon: <SIcon name='Ipedidos' />,
                    icon: 'Ifirst',
                    color: '#DC7D3C',
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })}
                {this.ItemCard({
                    label: "Última venta",
                    cant: this.state.ultima_venta.split(' ')[0],
                    // icon: <SIcon name='Ipedidos' />,
                    icon: 'Ilast',
                    color: '#FF64B4',
                    // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }) : null,
                })}
                <SHr height={20} />
                {this.getGrafo()}
            </SView>
            <SHr height={20} />
            <PButtom onPress={() => {
                SStorage.setItem("tbcli_a_comprar", JSON.stringify(obj))
                SNavigation.navigate("/public",{idcli: obj.idcli })
            }}>HACER PEDIDO</PButtom>
            <SHr />
        </SView>
    }
}
export default connect(index);