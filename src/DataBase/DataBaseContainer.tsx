import { Text, View } from 'react-native'
import React, { Component, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import DataBase, { DB } from '.';
import { SIcon, SLoad, SText, STheme, SView } from 'servisofts-component';
import SDB, { TableAbstract } from 'servisofts-db';
import SSocket from 'servisofts-socket';

type DataBaseContainerPropsType = {
    children?: any
}
export default class DataBaseContainer extends Component<DataBaseContainerPropsType> {
    state = {
        ready: false
    }
    private static INSTANCE: any;

    static sync = () => {
        if (!DataBaseContainer.INSTANCE) return;
        DataBaseContainer.INSTANCE.syncTable();

    }
    constructor(props: DataBaseContainerPropsType) {
        super(props);
        // DataBaseContainer.INSTANCE = this;
    }
    componentDidMount(): void {
        DataBase.init().then(() => {
            console.log("listo");
            this.setState({ ready: true })
        }).catch(e => {
            console.error(e);
        })
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
            <AlertBar ref={ref => DataBaseContainer.INSTANCE = ref} />
        </>
    }
}


const subirCambios = async (table: TableAbstract) => {
    const _insert = await table.filtered("sync_type == 'insert'");
    const _update = await table.filtered("sync_type == 'update'");
    const _delete = await table.filtered("sync_type == 'delete'");

    const respuesta = await SSocket.sendPromise2({
        component: table.scheme.name,
        type: "uploadChanges",
        insert: _insert,
        update: _update,
        delete: _delete,
    }, 1000 * 60 * 5)

    return true;
}
const AlertBar = forwardRef((props, ref) => {
    const [message, setMessage] = useState("DataBase");

    useEffect(() => {
        syncTable();
    }, [])

    useImperativeHandle(ref, () => ({
        syncTable: syncTable
    }))
    const syncTable = async () => {

        for (let i = 0; i < DB.tables.length; i++) {
            const t = DB.tables[i]
            try {
                setMessage(t.scheme.name + " verificando cambios.")
                const changes = await t.filtered("sync_type == 'insert' || sync_type == 'update' || sync_type == 'delete'");
                if (changes.length > 0) {
                    setMessage(t.scheme.name + " guardando cambios.")
                    await subirCambios(t);
                }
                setMessage(t.scheme.name + " cargando datos.")
                await t.sync();
                setMessage(t.scheme.name + " guardando en reducer.")
                // if (e.length > 0) setCantidad(e.length+"");
                // else setCantidad("");
                // })
                await t.loadToReducer();
            } catch (error) {
                // setMessage(error);
                console.error(t.scheme.name, error)
            }

        }
        setMessage("");

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