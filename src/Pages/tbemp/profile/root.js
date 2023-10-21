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
import { SelectEntreFechas } from '../../../Components/Fechas';
import DataBase from '../../../DataBase';
class index extends DPA.profile {
    state = {
        cantidad_clientes: 0,
        cantidad_zonas: 0,
        cantidad_compras: 0,
        cantidad_ventas: 0,
        cantidad_pedidos: 0,
        monto_total_pedidos: 0,
        monto_total_ventas: 0
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
        this.setState({ fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, loading: true })
        // SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
        //     const obj = e.data[0]
        //     console.log(obj)
        //     this.setState({ ...obj })
        // }).catch(e => {
        //     console.error(e)
        // })
        console.log(fecha_inicio, fecha_fin)
        DataBase.dm_cabfac.all().then(e => {
            console.log(e.length);
        });
        DataBase.dm_cabfac.filtered(`vfec >= $0 && vfec <= $1`, fecha_inicio + " 00:00:00.0", fecha_fin + " 00:00:00.0").then((e) => {
            this.setState({ cantidad_pedidos: e.length })
        })
        DataBase.tbzon.filtered(`idemp == ${this.idemp}`).then((e) => {
            this.setState({ cantidad_zonas: e.length })
        })
        DataBase.tbcli.filtered(`cliidemp == ${this.idemp}`).then((e) => {
            this.setState({ cantidad_clientes: e.length })
        })

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

    getDataTransportista({ fecha_inicio, fecha_fin }) {
        const request = {
            component: "dhm",
            type: "perfilTransportista",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
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
        return <SView col={"xs-6"} height={100} padding={6} onPress={onPress} >
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
                    {(montoOk == "")
                        ?
                        <SText bold fontSize={14}>{cant}</SText>
                        :
                        <SText bold fontSize={14}>({cant})</SText>}
                    <SText fontSize={14}>{montoOk}</SText>
                    <SText fontSize={12} color={STheme.color.gray}>{label}</SText>
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
                // monto: SMath.formatMoney(this.state.monto_pedidos ?? 0),
                monto: "",
                onPress: () => SNavigation.navigate("/tbemp/profile/pedidos", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                // onPress: () => SNavigation.navigate("/tbemp/profile/pedidosEmpresa", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                icon: 'Ipedidos',
                color: '#FF5A5F',
            })}
            {this.ItemCard({
                label: "Pedidos",
                cant: this.state.cantidad_pedidos,
                // monto: SMath.formatMoney(this.state.monto_pedidos ?? 0),
                monto: "",
                // onPress: () => SNavigation.navigate("/tbemp/profile/pedidos", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                onPress: () => SNavigation.navigate("/tbemp/profile/pedidosEmpresa", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                icon: 'Ipedidos',
                color: '#FF5A5F',
            })}
            {this.ItemCard({
                label: "Ventas",
                cant: this.state.cantidad_ventas,
                monto: SMath.formatMoney(this.state.monto_total_ventas ?? 0),
                onPress: () => SNavigation.navigate("/tbemp/profile/tbven", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                icon: 'Iventas',
                color: '#DE6D3B',
            })}

        </SView>
    }
    getCardsTransportista(obj) {
        return <SView col={"xs-12"} center row style={{
            justifyContent: "space-between"
        }}>
            {this.ItemCard({
                label: "Clientes con pedidos",
                cant: this.state.cantidad_clientes_con_pedido ?? 0,
                monto: "",
                icon: 'Iclients',
                color: '#1DA1F2',
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
                label: "Productos",
                cant: this.state.cantidad_total_items ?? 0,
                monto: SMath.formatMoney(this.state.monto_total_items ?? 0),
                icon: 'Ipedidos',
                color: '#FF5A5F',
            })}
        </SView>
    }
    $item(obj) {
        // console.log(this.state?.fecha_inicio + " AQUII")
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
            {obj.idemt == 4 ? <IniciarTransporte idemp={this.pk} fecha_inicio={this.state?.fecha_inicio} fecha_fin={this.state?.fecha_fin} /> : null}
            <SHr h={30} />
            {obj.idemt == 1 ? <SelectEntreFechas onChange={e => this.getDataVendedor(e)} /> : null}
            {obj.idemt == 1 ? this.getCardsClient(obj) : null}
            {/* {obj.idemt == 4 ? <SelectEntreFechas onChange={e => this.getDataTransportista(e)} /> : null}
            {obj.idemt == 4 ? this.getCardsTransportista(obj) : null} */}
            <SHr />
        </SView>
    }

    getUser() {

        if (!this.data) return <SLoad />
        const idemt = this.data.idemt;

        let key = "";
        if (idemt == 1) {
            key = "idvendedor"
        } else if (idemt == 4) {
            key = "idtransportista"
        }
        if (!key) return <SText>Usuario no configurado.</SText>
        let users = Model.usuario.Action.getAll();
        if (!users) return <SLoad />
        // console.log(users)
        let user = Object.values(users).find(o => o[key] == this.pk)
        return <SView col={"xs-12"}>
            <SText >Usuario:</SText>
            <Usuario.Select
                defaultValue={user}
                onChange={(usr) => {
                    if (user) {
                        Model.usuario.Action.editar({
                            data: { ...user, [key]: "" }, key_usuario: Model.usuario.Action.getKey()
                        })
                    }
                    Model.usuario.Action.editar({
                        data: { ...usr, [key]: this.pk }, key_usuario: Model.usuario.Action.getKey()
                    })
                }} />
        </SView>
    }
    $footer() {
        return <SView col={"xs-12"} center>
            <SHr />
            {this.getUser()}
            <SHr />
            <MenuPages path={Parent.path + "/profile/"} permiso={"view"} params={{
                pk: this.pk
            }} >
                {/* <MenuButtom url={Parent.path + "/profile/tbzon"} params={{ pk: this.pk }}
                    icon={<SIcon name={"Zonas"} />} label={"Zonas"} />
                <MenuButtom url={Parent.path + "/profile/tbcli"} params={{ pk: this.pk }}
                    icon={<SIcon name={"Clientes"} />} label={"Clientes"} /> */}
            </MenuPages>
        </SView>
    }

}
export default connect(index);