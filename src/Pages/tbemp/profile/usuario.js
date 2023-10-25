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
   


    async getDataVendedor({ fecha_inicio, fecha_fin }) {
       
        this.setState({ fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, loading: true })
       
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

    $item(obj) {
        // console.log(this.state?.fecha_inicio + " AQUII")
        return <SView col={"xs-12"} center>
            <SHr h={30} />
           
            <SHr h={30} />
            {this.getUser2()}
            <SHr />
        </SView>
    }

    getUser2() {

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

}
export default connect(index);