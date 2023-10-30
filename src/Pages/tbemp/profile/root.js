import React, { Component } from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SDate, SGradient, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
import SSocket from "servisofts-socket"
import SChart from "servisofts-charts"
import { Header, Usuario } from '../../../Components';
import ZonasDelDia from './components/ZonasDelDia';
import IniciarTransporte from './components/IniciarTransporte';
import { SelectEntreFechas, SelectFecha } from '../../../Components/Fechas';
import DataBase from '../../../DataBase';
class index extends DPA.profile {
    state = {
        cantidad_clientes: 0,
        cantidad_zonas: 0,
        cantidad_compras: 0,
        cantidad_ventas: 0,
        cantidad_pedidos: 0,
        monto_total_pedidos: 0,
        monto_total_ventas: 0,
        fecha: DataBase.ventas_factura.fecha
    }
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: [],
            title: "Perfil de " + Parent.title,
        });
        this.idemp = SNavigation.getParam("pk")


    }

    componentDidMount() {
        console.log("nSASA DAKJS DASD JASD");
    }
    // componentDidMount() {
    //     this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //         // Tu código aquí será ejecutado cada vez que la pantalla esté enfocada

    //         // ...
    //     });
    // }
    // componentWillUnmount() {
    //     this._unsubscribe();
    // }


    async getDataVendedor({ fecha_inicio, fecha_fin }) {
        // const request = {
        //     component: "dhm",
        //     type: "perfilEmp",
        //     fecha_inicio: fecha_inicio,
        //     fecha_fin: fecha_fin,
        //     idemp: this.idemp
        //     // idemp: this.pk + ""
        // }
        this.setState({ fecha_inicio: fecha_inicio, fecha_fin: fecha_fin })
        // SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
        //     const obj = e.data[0]
        //     console.log(obj)
        //     this.setState({ ...obj })
        // }).catch(e => {
        //     console.error(e)
        // })
        const cantidad_pedidos = await DataBase.dm_cabfac.filtered(`vfec >= $0 && vfec <= $1 && sync_type != 'delete'`, fecha_inicio + " 00:00:00.0", fecha_fin + " 00:00:00.0")

        let monto = 0;
        cantidad_pedidos.map(a => {
            a.detalle.map((d) => {
                monto += d.vdcan * d.vdpre
            })
        })
        // this.setState({ cantidad_pedidos: cantidad_pedidos.length })
        const cantidad_zonas = await DataBase.tbzon.filtered(`idemp == ${this.idemp}`)
        // this.setState({ cantidad_zonas: cantidad_zonas.length })
        const cantidad_clientes = await DataBase.tbcli.filtered(`cliidemp == ${this.idemp}`)
        // this.setState({ cantidad_clientes: cantidad_clientes.length })
        this.setState({ cantidad_clientes: cantidad_clientes.length, cantidad_zonas: cantidad_zonas.length, cantidad_pedidos: cantidad_pedidos.length, monto_pedidos: monto, load_cant: true })

        // const zonas = await DataBase.tbzon.filtered(`idemp == ${this.idemp}`)
        // let query = "";
        // zonas.map((z, i) => {
        //     if (i > 0) query += " || "
        //     query += `idz == ${z.idz}`
        // })
        // DataBase.tbcli.filtered(query).then((e) => {
        //     this.setState({ cantidad_clientes: e.length })
        // })
    }

    getDataTransportista({ fecha }) {
        // DataBase.ventas_factura.fecha = fecha;
        DataBase.ventas_factura.setFecha(fecha);
        this.setState({ load_cant: true, fecha: fecha });
        return null;
        const request = {
            component: "dhm",
            type: "perfilTransportista",
            fecha_inicio: fecha,
            fecha_fin: fecha,
            idemp: this.idemp
            // idemp: this.pk + ""
        }
        this.setState({ fecha_inicio: fecha_inicio, fecha_fin: fecha_fin })
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            const obj = e.data[0]
            console.log(obj)
            this.setState({ ...obj })
        }).catch(e => {
            console.error(e)
        })
    }

    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        if (Model.usuario.Action.getUsuarioLog()?.idvendedor == this.pk) return true;
        if (Model.usuario.Action.getUsuarioLog()?.idtransportista == this.pk) return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }


    ItemCard = ({ label, cant, monto, icon, color, onPress }) => {
        var montoOk = "";
        if (monto != "") montoOk = "Bs. " + monto;
        return <SView col={"xxs-12 xs-6 sm-6 md-6 lg-6 xl-6 xxl-6"} height={100} padding={6} onPress={onPress} >
            <SView card flex col={"xs-12"} style={{
                borderRadius: 14,
                borderBottomWidth: 4,
                borderLeftWidth: 3,
                borderRightWidth: 1,
                borderColor: STheme.color.card,
                padding: 15
            }} row center>
                {/* <SView width={50} center padding={4} height>
                    {icon ? icon : null}
                </SView> */}
                <SView width={50} center padding={4} height
                    style={{
                        backgroundColor: color + "40",
                        borderRadius: 50
                    }}
                >
                    <SIcon name={icon} fill={color} height={30} />
                </SView>
                <SView width={4} />
                <SView flex height style={{
                    justifyContent: "center"
                }}>
                    {!this.state.load_cant ? <SLoad /> : ((montoOk == "")
                        ?
                        <SText bold fontSize={14} style={{ lineHeight: 20 }}>{cant}</SText>
                        :
                        <SText bold fontSize={14} style={{ lineHeight: 20 }}>( {cant} )</SText>)}
                    <SText fontSize={14} style={{ lineHeight: 20 }}>{montoOk}</SText>
                    <SText fontSize={12} color={STheme.color.gray} style={{ lineHeight: 15 }}>{label}</SText>
                </SView>
            </SView>
        </SView>
    }

    $render() {
        return <>
            <Header.Modulo
                width={120}
                titulo="EMPLEADOS"
                icon="Empleados"
            />
            {super.$render()}
        </>
    }

    getCardsClient(obj) {
        return <SView col={"xs-12"} center row style={{
            justifyContent: "space-between"
        }}>
            {this.ItemCard({
                label: "Clientes",
                cant: this.state.cantidad_clientes,
                monto: "",
                icon: 'Iclients',
                color: '#1DA1F2',
                onPress: () => SNavigation.navigate("/tbemp/profile/tbcli", { pk: this.pk })
            })}
            {this.ItemCard({
                label: "Zonas",
                cant: this.state.cantidad_zonas,
                monto: "",
                icon: 'Izonas',
                color: '#833AB4',
                onPress: () => SNavigation.navigate("/tbemp/profile/tbzon", { pk: this.pk }),
            })}
            {this.ItemCard({
                label: "Pedidos",
                cant: this.state.cantidad_pedidos,
                monto: SMath.formatMoney(this.state.monto_pedidos ?? 0),
                // monto: "",
                onPress: () => SNavigation.navigate("/tbemp/profile/pedidos", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                // onPress: () => SNavigation.navigate("/tbemp/profile/pedidosEmpresa", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                icon: 'Ipedidos',
                color: '#FF5A5F',
            })}
            {this.ItemCard({
                label: "Pedidos",
                cant: "Categorías",
                monto: "",
                // onPress: () => SNavigation.navigate("/tbemp/profile/pedidos", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                onPress: () => SNavigation.navigate("/tbemp/profile/pedidosEmpresa", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                icon: 'Icategoria',
                color: '#61AD02',
            })}
            {/* {this.ItemCard({
                label: "Ventas",
                cant: this.state.cantidad_ventas,
                monto: SMath.formatMoney(this.state.monto_total_ventas ?? 0),
                onPress: () => SNavigation.navigate("/tbemp/profile/tbven", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                icon: 'Iventas',
                color: '#DE6D3B',
            })} */}

        </SView>
    }
    getCardsTransportista(obj) {
        return <SView col={"xs-12"} center row style={{
            justifyContent: "space-between"
        }}>
            {this.ItemCard({
                label: "",
                cant: "Pick List",
                monto: "",
                icon: 'Ilist',
                color: '#1DA1F2',
                onPress: () => SNavigation.navigate("/transporte/picklist", { pk: this.pk, fecha: this.state?.fecha }),
                // onPress: () => (this.state.cantidad_clientes != 0) ? SNavigation.navigate("/tbemp/profile/tbcli", { pk: this.pk }) : null
            })}
            {/* {this.ItemCard({
                label: "Entregas",
                cant: this.state.cantidad_zonas,
                monto: "",
                icon: 'Izonas',
                color: '#833AB4',
            })} */}
            {this.ItemCard({
                label: "",
                cant: "Entregas",
                monto: "",
                icon: 'Ientregas',
                color: '#FF5A5F',
                onPress: () => SNavigation.navigate("/transporte/list", { pk: this.pk }),
            })}
            {/* <SHr height={15} />
            {this.ItemCard({
                label: "",
                cant: "Detalle Pedido",
                monto: "",
                icon: 'Ientregas',
                color: '#FF5A5F',
                onPress: () => SNavigation.navigate("/transporte/pedidoDetalle"),
            })} */}
        </SView>
    }
    $item(obj) {
        // console.log(this.state?.fecha_inicio + " AQUII")
        console.log(this.state)
        return <SView col={"xs-12"} center>
            <SHr h={30} />
            <SView col={"xs-12"} center>
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
                    <SImage src={Model.tbemp._get_image_download_path(SSocket.api, this.pk)} style={{
                        resizeMode: "cover",
                        zIndex: 99,
                    }} />
                </SView>
                <SHr />
                <SText bold fontSize={16}>{`${obj.empnom}`}</SText>
                <SText>{`${obj.idemp} - ${obj.empcod}`}</SText>
                {/* <SText>{`${obj.}`}</SText> */}
            </SView>
            <SHr h={30} />
            {obj.idemt == 1 ? <ZonasDelDia idemp={this.pk} /> : null}
            {obj.idemt == 4 ? <IniciarTransporte idemp={this.pk} fecha={this.state?.fecha} /> : null}
            <SHr h={30} />
            {obj.idemt == 1 ? <SelectEntreFechas onChange={e => this.getDataVendedor(e)} /> : null}
            {obj.idemt == 1 ? this.getCardsClient(obj) : null}
            {obj.idemt == 4 ? <SelectFecha fecha={this.state.fecha} onChange={e => this.getDataTransportista(e)} /> : null}
            {obj.idemt == 4 ? this.getCardsTransportista(obj) : null}
            <SHr />
        </SView>
    }

    getUser() {
        return <>

            <SView col={"xs-12"} >
                <SText >Usuario:</SText>
                <SView col={"xs-12"} card center row
                    onPress={() => {
                        SNavigation.navigate("/tbemp/profile/usuario", { pk: this.pk })
                    }}
                >
                    <SHr height={15} />
                    <SIcon name={"Iuser"} height={20} width={22} />
                    <SView width={5} />
                    <SText>Ver Usuario</SText>
                    <SHr height={15} />

                </SView>
            </SView>
        </>
    }

    $footer() {
        return <SView col={"xs-12"} center>
            <SHr />
            {this.getUser()}
            <SHr />
            {/* <MenuPages path={Parent.path + "/profile/"} permiso={"view"} params={{
                pk: this.pk
            }} >
            </MenuPages> */}
        </SView>
    }

}
export default connect(index);