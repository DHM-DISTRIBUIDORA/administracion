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
import ZonaEmpleadoComponent from './components/ZonaEmpleadoComponent';
class index extends DPA.profile {
    state = {
        cantidad_clientes: 0,
        cantidad_zonas: 0,
        cantidad_compras: 0,
        cantidad_ventas: 0,
        cantidad_pedidos: 0,
        monto_total_pedidos: 0,
        monto_total_ventas: 0,
        cantidad_visitas: 0,
        fecha: DataBase.ventas_factura.fecha
    }
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: [],
            title: "Perfil de " + Parent.title,
            onRefresh: (r) => {

                if (r) r();
                this.setState({ load_cant: false })
                this.componentDidMount();
            }
        });
        this.idemp = SNavigation.getParam("pk")


    }

    componentDidMount() {
        console.log("nSASA DAKJS DASD JASD", this.idemp);
        DataBase.tbemp.objectForPrimaryKey(parseInt(this.idemp)).then(e => {
            console.log("Aqui los empleados", e)
            this.setState({ data: e })
            if (e.idemt == 4) {
                this.getDataTransportista()

            } else {
                // if (this.state?.fecha_inicio && this.state?.fecha_fin) {
                this.getDataVendedor()
                // }
            }
        }).catch(e => {
            console.error(e)
        })
    }

    async getDataVendedor() {
        try {
            const fechaEnv = await DataBase.enviroments.objectForPrimaryKey("fecha_vendedor");
            this.state.fecha = fechaEnv.value;
            this.setState({ fecha: fechaEnv.value, })
        } catch (e) {
            console.error(e)
        }

        try {
            const cantidad_pedidos = await DataBase.dm_cabfac.filtered(`sync_type != 'delete'`)
            let monto = 0;
            cantidad_pedidos.map(a => {
                a.detalle.map((d) => {
                    monto += d.vdcan * d.vdpre
                })
            })
            this.setState({ cantidad_pedidos: cantidad_pedidos.length, monto_pedidos: monto })
        } catch (error) {
            console.error("No pudimos cargar los pedidos");
        }
        let query = "";

        try {

            const cantidad_zonas = await DataBase.zona_empleado.filtered(`idemp == ${this.idemp} && dia == ${new SDate(this.state.fecha, "yyyy-MM-dd").date.getDay()}`)
            // const cantidad_zonas = await DataBase.tbzon.filtered(`idemp == ${this.idemp}`)
            this.setState({ cantidad_zonas: cantidad_zonas.length })
            cantidad_zonas.map((z, i) => {
                if (i > 0) query += " || "
                query += `idz == ${z.idz}`
            })
        } catch (error) {
            console.error("No pudimos cargar las zonas");
        }

        let cantidad_clientes = []
        if (query) {
            cantidad_clientes = await DataBase.tbcli.filtered(query)
        }
        this.setState({ cantidad_clientes: cantidad_clientes.length, load_cant: true })

    }

    async getDataTransportista() {
        try {
            const fechaEnv = await DataBase.enviroments.objectForPrimaryKey("fecha");
            this.setState({ fecha: fechaEnv.value, })
        } catch (e) {
            console.error(e)
        }

        const pedidos = await DataBase.ventas_factura.all()
        const visitas = await DataBase.visita_transportista.all()
        let monto = 0;
        visitas.map(a => {
            monto += a.monto ?? 0
        })
        const clientes_visitados = pedidos.filter(a => !!visitas.find(v => v.idven == a.idven))

        // })
        this.setState({ load_cant: true, cantidad_pedidos: pedidos.length, cantidad_visitas: clientes_visitados.length, monto_visitas: parseFloat(monto ?? 0).toFixed(2) });


        return null;
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
        return this.state.data;
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
                label: "Ventas",
                cant: this.state.cantidad_pedidos,
                monto: SMath.formatMoney(this.state.monto_pedidos ?? 0),
                // monto: "",
                onPress: () => SNavigation.navigate("/tbemp/profile/pedidos", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                // onPress: () => SNavigation.navigate("/tbemp/profile/pedidosEmpresa", { pk: this.pk, fecha_inicio: this.state?.fecha_inicio, fecha_fin: this.state?.fecha_fin }),
                icon: 'Icompras',
                color: '#F9A435',
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
                onPress: () => SNavigation.navigate("/transporte/picklist2", { pk: this.pk, fecha: this.state?.fecha }),
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
                cant: `${this.state?.cantidad_visitas} / ${this.state.cantidad_pedidos}`,
                label: "Entregas",
                monto: this.state.monto_visitas,
                icon: 'Ientregas',
                color: '#FF5A5F',
                onPress: () => SNavigation.navigate("/transporte/list", { pk: this.pk, fecha: this.state?.fecha }),
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
            {obj.idemt == 1 ? <ZonasDelDia idemp={this.pk} fecha={this.state?.fecha} /> : null}
            {obj.idemt == 4 ? <IniciarTransporte idemp={this.pk} fecha={this.state?.fecha} /> : null}
            <SHr h={30} />
            {/* {obj.idemt == 1 ? <SelectEntreFechas onChange={e => this.getDataVendedor(e)} /> : null} */}
            {obj.idemt == 1 ? this.getCardsClient(obj) : null}
            {/* {obj.idemt == 4 ? <SelectFecha fecha={this.state.fecha} onChange={e => this.getDataTransportista(e)} /> : null} */}
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
                    <SIcon name={"Iuser"} height={20} width={22} fill={STheme.color.text} />
                    <SView width={5} />
                    <SText>Ver Usuario</SText>
                    <SHr height={15} />

                </SView>
            </SView>
        </>
    }
    verZonas() {
     
        return <>
            <SView col={"xs-12"} >
                <SText >Zonas:</SText>
                <SView col={"xs-12"} card center row
                    onPress={() => {
                        SNavigation.navigate("/tbemp/profile/zonas_asignadas", { pk: this.pk })
                    }}
                >
                    <SHr height={15} />
                    <SIcon name={"Marker"} height={20} width={22} fill={STheme.color.text} />
                    <SView width={5} />
                    <SText>Zonas asignadas por día</SText>
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
            {this.verZonas()}
            <SHr />

            {/* <ZonaEmpleadoComponent idemp={this.pk}/> */}
            {/* <MenuPages path={Parent.path + "/profile/"} permiso={"view"} params={{
                pk: this.pk
            }} >
            </MenuPages> */}
        </SView>
    }

}
export default connect(index);