import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SView } from 'servisofts-component'
import DataBase from '../../DataBase'
import { TableAbstract, Trigger } from 'servisofts-db'
import SSocket from 'servisofts-socket'
import DataBaseContainer from '../../DataBase/DataBaseContainer'
import Model from '../../Model'

const BtnEliminarYDescargar = ({ label, onPress }) => {
    return <SView row>
        <SText bold padding={8} fontSize={16} >{label}</SText>
        <SText padding={8}
            card
            style={{
                backgroundColor: STheme.color.warning
            }}
            onPress={() => {
                SPopup.confirm({
                    title: "¿Está seguro de volver a descargar los datos?",
                    onPress: onPress,
                    message: "Los datos no guardados se perderán y se volverá a descargar los datos del servidor."
                })
            }}  >Eliminar y descargar nuevos</SText>
    </SView>
}
export default class test extends Component {
    render() {
        const urser = Model.usuario.Action.getUsuarioLog();

        return <SPage disableScroll>
            {/* <SScrollView2 horizontal> */}
            <SScrollView2 contentContainerStyle={{
                minWidth: 850,
                width: "100%",
            }}>
                <SView row col={"xs-12"} padding={4} >
                    <SText col={"xs-4"} bold>Nombre</SText>
                    <SText col={"xs-1"} bold >#</SText>
                    <SText col={"xs-1"} bold>Cambios</SText>
                    <SText col={"xs-2.5"} bold center>Acciones</SText>
                    <SText col={"xs-2.5"} bold center>Última descarga</SText>
                </SView>

                <BtnEliminarYDescargar label={"Productos"} onPress={() => {
                    DataBase.Funciones.sincronizar_productos()
                }} />
                <Table table={DataBase.tbprd} label="Productos." />
                <Table table={DataBase.tbprdlin} label="Lineas." />
                <Table table={DataBase.tbemp} label="Empleados." />
                {!urser?.key ? null :
                    <>
                        <SHr />
                        <BtnEliminarYDescargar label={"Usuarios"} onPress={() => {
                            DataBase.Funciones.sicronizar_usuario()
                        }} />
                        <Table table={DataBase.usuario} label="Usuarios." />
                        <Table table={DataBase.usuarioPage} label="Roles y permisos." />
                        <Table table={DataBase.background_location} label="GPS del usuario." />
                    </>
                }
                {!urser?.idvendedor ? null :
                    <>
                        <SHr />
                        <BtnEliminarYDescargar label={"Vendedor"} onPress={() => {
                            DataBase.Funciones.sicronizar_vendedor()
                        }} />
                        <Table table={DataBase.tbzon} label="Zonas." />
                        <Table table={DataBase.tbcat} label="Categorias de clientes." />
                        <Table table={DataBase.dm_cabfac} label="Pedidos." save />
                        <Table table={DataBase.tbcli} label="Clientes." save />
                        <Table table={DataBase.visita_vendedor} label="Visitas del vendedor." save />
                    </>
                }
                {!urser?.idtransportista ? null :
                    <>
                        <SHr />
                        <BtnEliminarYDescargar label={"Transportista"} onPress={() => {
                            DataBase.Funciones.sincronizar_transportista()
                        }} />
                        <Table table={DataBase.visita_transportista} label="Visitas del transportista." save />
                        <Table table={DataBase.ventas_factura} label="Ventas por entregar." />
                    </>
                }
                {!urser?.idtransportista && !urser?.idvendedor ?
                    <>
                        <SHr />
                        <BtnEliminarYDescargar label={"SOLO PARA ADMIN"} onPress={() => {
                            DataBase.Funciones.sincronizar_admin()
                        }} />
                        <Table table={DataBase.tbcli} label="Clientes." save />
                        <Table table={DataBase.tbzon} label="Zonas." />
                        <Table table={DataBase.zona_empleado} label="Zonas del empleado." save/>
                    </>
                    : null
                }
                <SHr h={50} />
            </SScrollView2>
            {/* </SScrollView2> */}
        </SPage>
    }
}
class Table extends Component<{ table: TableAbstract, label: string, save?: boolean }> {
    state = {

    }

    componentDidMount() {
        this.loadData()
        this.t1 = Trigger.addEventListener({
            on: ["insert", "update", "delete"],
            tables: [this.props.table.scheme.name]
        }, (e) => {
            this.loadData();
        })
    }
    componentWillUnmount() {
        Trigger.removeEventListener(this.t1)
    }

    async loadData() {
        const table: TableAbstract = this.props.table;
        try {
            const data = await this.props.table.all();
            let fecha_sync = "";
            try {
                const lassync = await DataBase.sync_data.objectForPrimaryKey(table.scheme.name)
                fecha_sync = lassync.fecha_sync;
            } catch (error) {
                fecha_sync = "--"
            }

            let chages = await table.filtered("sync_type == 'insert' || sync_type == 'update' || sync_type == 'delete'")
            this.setState({ cantidad: data.length, changes: 0, fecha_sync: fecha_sync, changes: chages.length })
        } catch (error) {
            console.error(error)
        }

    }
    render() {
        const { table, label } = this.props;
        return <SView row col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: "#999" }} padding={2} >
            <SText col={"xs-4"} fontSize={14}>{label} ({table.scheme.name})</SText>
            <SText col={"xs-1"} onPress={() => {
                SNavigation.navigate("/storage/table", { table: table.scheme.name })
            }} >{this.state.cantidad}</SText>
            <SText col={"xs-1"} color={!this.state.changes ? STheme.color.text : STheme.color.warning}>{this.state.changes}</SText>
            <SView col={"xs-2.5"} row style={{
                justifyContent: "space-between"
            }}>
                <SText padding={4} card onPress={() => {
                    table.deleteAll()
                }}>Clear</SText>
                {!this.props.save ? null : <SText padding={4} card
                    style={{
                        backgroundColor: !this.state.changes ? STheme.color.gray : STheme.color.warning
                    }}
                    onPress={async () => {
                        DataBase.Funciones.SaveChanges(table)

                    }}>Save</SText>}
                <SText padding={4} style={{
                    backgroundColor: STheme.color.danger
                }} card onPress={() => {
                    table.sync().then(e => {
                        console.log(e);
                    }).catch(e => {
                        SPopup.alert(e?.error ?? e)
                    })
                }}>Reset</SText>

            </SView>
            <SText col={"xs-2.5"} center >{this.state.fecha_sync}</SText>
        </SView>
    }
}

