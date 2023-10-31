import { Text, View } from 'react-native'
import React, { Component, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import DataBase, { DB } from '.';
import { SIcon, SLoad, SText, STheme, SView, SNotification, SThread, SPopup, SDate } from 'servisofts-component';
import SDB, { TableAbstract } from 'servisofts-db';
import SSocket from 'servisofts-socket';
import SaveTop from '../Components/SaveTop';
import Model from '../Model';

type DataBaseContainerPropsType = {
    children?: any
}
export default class DataBaseContainer extends Component<DataBaseContainerPropsType> {
    state = {
        ready: false
    }
    private static INSTANCE: any;
    static __runsync = false;
    static sync = async () => {
        console.log("Entro al sync")
        if (!DataBaseContainer.INSTANCE) return;
        try {
            await DataBaseContainer.testConnection();
        } catch (error) {
            console.error(error);
            return;
        }
        if (this.__runsync) {
            SNotification.send({
                title: "Error",
                body: "Hay otra sincornizacion en curso",
                color: STheme.color.danger,
                time: 5000,
            })
            return;
        }
        this.__runsync = true;

        for (let i = 0; i < DB.tables.length; i++) {
            const t = DB.tables[i];
            try {
                await DataBaseContainer.syncTable(t.scheme.name)
            } catch (error) {
                console.error(error);
            }
        }
        DataBase.sync_data.insert({ tbname: "all", fecha_sync: new SDate().toString(), sync_type: "all" })
        SNotification.send({
            title: "Sync",
            body: "Se sincronizaron los datos con exito.",
            color: STheme.color.success,
            time: 5000,
        })
        this.__runsync = false;
    }
    static syncTable = async (name: string) => {
        if (!DataBaseContainer.INSTANCE) return;
        return await DataBaseContainer.INSTANCE.syncTable(name);
    }
    static testConnection = async (hidden = false) => {
        const notify = await SNotification.send({
            title: "Base de datos",
            body: `Verificando conexion a internet`,
            color: STheme.color.warning,
            type: "loading"
        })
        try {

            const data = await SSocket.sendPromise2({
                component: "enviroments",
                type: "getVersion"
            }, 5000)
            if (!data) throw "error"
            console.log(data);
            notify.close();
            return data;
        } catch (e: any) {
            notify.close();
            await SNotification.send({
                title: "Base de datos",
                body: `Sin conexion con el servidor. Verifique su internet.`,
                color: STheme.color.danger,
                time: 5000
            })
            throw "no server"
        }
    }

    isRun;
    constructor(props: DataBaseContainerPropsType) {
        super(props);

        this.isRun = true;
        // DataBaseContainer.INSTANCE = this;
    }

    hilo() {
        if (!this.isRun) return;
        // new SThread(1000 * 60 * 1, "hilo_verificador", true).start(async () => {
        //     if (!this.isRun) return;

        //     await DataBaseContainer.saveChanges();

        //     this.hilo();
        // })
    }

    static __runsave = false;
    static saveChanges = async () => {

        if (this.__runsave) {
            SNotification.send({
                title: "Error",
                body: "Hay otra sincornizacion en curso",
                color: STheme.color.danger,
                time: 5000,
            })
            return;
        }
        this.__runsave = true;

        const notify = await SNotification.send({
            title: "Base de datos",
            body: `Guardando cambios...`,
            color: STheme.color.warning,
            type: "loading"
        })

        let isConnect: any = false;
        if (!isConnect) {
            try {
                isConnect = await SSocket.sendPromise2({
                    component: "enviroments",
                    type: "getVersion"
                }, 5000)
            } catch (error) {
                this.__runsave = false;
                notify.close();
                SNotification.send({
                    title: "Error de conexion",
                    body: "Verifique su conexion a internet.",
                    color: STheme.color.danger,
                    time: 5000
                })
                return;
                // throw "Sin conexion a internet"
            }

        }
        for (let i = 0; i < DB.tables.length; i++) {
            const table = DB.tables[i];
            try {

                const changes = await table.filtered("sync_type == 'insert' || sync_type == 'update' || sync_type == 'delete'");
                if (changes.length > 0) {
                    await subirCambios(table);
                    changes.map(tr => {
                        tr.sync_type = "";
                        table.update(tr)
                    })
                    await table.sync();
                }

            } catch (error: any) {
                let e = error;
                if (typeof error == "object") {
                    e = error?.error;
                }
                SNotification.send({
                    title: table.scheme.name,
                    body: e,
                    color: STheme.color.danger,
                    // time: 5000
                })
                console.error(error)
            }
        }
        this.__runsave = false;
        notify.close()

    }
    componentDidMount(): void {
        DataBase.init().then(() => {
            console.log("listo");
            this.setState({ ready: true })
        }).catch(e => {
            this.setState({ ready: true })
            console.error(e);
        })
        this.isRun = true;
        this.hilo();
    }
    componentWillUnmount(): void {
        this.isRun = false;
    }
    render() {
        const nameIcon: any = "LogoClear"
        if (!this.state.ready) return <SView col={"xs-12"} flex center >
            <SView col={"xs-6 sm-5 md-4 lg-3 xl-2 xxl-1.5"}>
                <SIcon name={nameIcon} fill={STheme.color.text} stroke={STheme.color.text} />
            </SView>
        </SView>
        return <>
            {this.props.children}
            <AlertBar ref={ref => {
                DataBaseContainer.INSTANCE = ref;
            }} />
            {/* <SaveTop /> */}
        </>
    }
}


const subirCambios = async (table: TableAbstract) => {
    const _insert = await table.filtered("sync_type == 'insert'");
    const _update = await table.filtered("sync_type == 'update'");
    const _delete = await table.filtered("sync_type == 'delete'");

    let cantidad = _insert.length + _update.length + _delete.length
    if (cantidad <= 0) throw "No hay cambios";
    console.log(cantidad)
    const respuesta: any = await SSocket.sendPromise2({
        component: table.scheme.name,
        type: "uploadChanges",
        key_usuario: Model.usuario.Action.getKey(),
        insert: _insert,
        update: _update,
        delete: _delete,
    }, 1000 * ((cantidad+1) * 10))
    // }, 1000 * 40)

    if (respuesta?.estado != "exito") throw "No respondio exito";
    return respuesta;
}

const AlertBar = forwardRef((props, ref) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // DB.tables.map((a) => syncTable(a.scheme.name))
        // syncTable();
    }, [])

    useImperativeHandle(ref, () => ({
        syncTable: syncTable
    }))
    const syncTable = async (table_name: string) => {
        // if (loading) return;
        // setLoading(true);
        const notification = await SNotification.send({
            title: "Base de datos - " + table_name,
            body: `Sincronizando datos.`,
            color: STheme.color.warning,
            type: "loading",
        })

        let totalChanges = 0;
        let syncChanges = 0;
        // DB.tables
        // for (let i = 0; i < DB.tables.length; i++) {
        const t = DB.tables.find(a => a.scheme.name == table_name);
        if (!t) return;
        try {
            setMessage(t.scheme.name + " verificando cambios.")
            const changes = await t.filtered("sync_type == 'insert' || sync_type == 'update' || sync_type == 'delete'");
            totalChanges += changes.length;
            if (changes.length > 0) {
                setMessage(t.scheme.name + " guardando cambios.")
                await subirCambios(t);
                changes.map(tr => {
                    tr.sync_type = "";
                    t.update(tr)
                })
            }
            syncChanges += changes.length;
            setMessage(t.scheme.name + " cargando datos.")
            await t.sync();
            setMessage(t.scheme.name + " guardando en reducer.")
            await t.loadToReducer();
        } catch (error: any) {
            // setMessage(error);
            if (error?.code != 200) {
                SNotification.send({
                    title: t.scheme.name,
                    body: error?.error ?? JSON.stringify(error),
                    color: STheme.color.danger,
                    // time: 5000
                })
            }

            // setLoading(false);
            console.error(t.scheme.name, error)
        }
        // }
        notification.close();
        if (totalChanges > 0) {
            const porcent = (syncChanges / totalChanges * 100).toFixed(0);
            SNotification.send({
                title: "Base de datos - " + t.scheme.name,
                body: `Se subieron el ${porcent}% de los cambios.`,
                color: STheme.color.success,
                time: 5000
            })
        }

        setMessage("");
        // setLoading(false);
    }
    if (!message) return null
    return <SView style={{
        width: "100%",
        height: 30,
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#ffff0066"
    }} center row>
        <SText >{message}</SText>
        <SView width={50}>
            <SLoad />
        </SView>

    </SView>
})