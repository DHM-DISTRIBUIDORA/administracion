import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { SHr, SIcon, SLoad, SNavigation, SPopup, SText, STheme, SView } from "servisofts-component"
import SDB, { TableAbstract } from 'servisofts-db';
import DataBase from "../../DataBase";
import SSocket from "servisofts-socket";
import STable from "servisofts-table";
import { Dimensions } from "react-native";
let times: any = {};

const time = (key: any) => {
    console.log("start time " + key)
    times[key] = new Date().getTime();
}
const timeEnd = (key: any) => {
    console.log(key + ":", new Date().getTime() - times[key], "ms");
    delete times[key]
}

const BTN = forwardRef(({ onPress, label }: any, ref) => {
    const [state, setState] = useState({ loading: false, color: STheme.color.text });
    const handleOnPress = async () => {
        setState({ loading: true, color: "#990" })
        try {
            await onPress();
            setState({ loading: false, color: "#090" })
        } catch (error) {
            setState({ loading: false, color: "#900" })
        }
    }

    useImperativeHandle(ref, () => ({
        handleOnPress: handleOnPress
    }))
    return <SView width={100} style={{
        borderColor: state.color,
        borderWidth: 1,
    }} center height={40} card onPress={handleOnPress}>
        {!state.loading ? <SText center color={state.color} >{label}</SText> : <SLoad />}
    </SView>
});



const subirCambios = async (table: TableAbstract) => {
    const _insert = await table.filtered("sync_type == 'insert'");
    const _update = await table.filtered("sync_type == 'update'");
    const _delete = await table.filtered("sync_type == 'delete'");

    const respuesta = await SSocket.sendPromise({
        component: table.scheme.name,
        type: "uploadChanges",
        insert: _insert,
        update: _update,
        delete: _delete,
    }, 1000 * 60 * 5)

    return true;
}
const TableItem = forwardRef((props: { table: TableAbstract }, ref) => {
    const syncRef = useRef<any>();
    const [cantidad, setCantidad] = useState("");
    const { table } = props;

    const sync = async () => {
        await syncRef.current.handleOnPress();
        return true;
    }

    useImperativeHandle(ref, () => ({
        sync: sync
    }))

    table.filtered("sync_type == 'insert' || sync_type == 'update' || sync_type == 'delete'").then(e => {
        if (e.length > 0) setCantidad(e.length+"");
        else setCantidad("");
    })
    return <SView col={"xs-12"} padding={8} row center style={{
        borderTopWidth: 1,
        borderTopColor: "#666"
    }}>
        <SView flex onPress={() => {
            SNavigation.navigate("/storage/table", { table: table.scheme.name })
        }}>
            <SText bold fontSize={20}>{table.scheme.name}</SText>
            <SText fontSize={10}>{cantidad}</SText>
        </SView>
        <BTN ref={syncRef} label={"sync"} onPress={async () => {
            await table.sync()
            return true;
        }} />
        <SView width={8} />
        <BTN label={"Upload"} onPress={async () => {
            time("subirCambios")
            await subirCambios(table)
            timeEnd("subirCambios")
            // time("table.sync")
            // await table.sync()
            // timeEnd("table.sync")
            // DataBase.init();
            // setCantidad("");
            return true;
        }} />
    </SView>
})

export const DBComponent = () => {
    const inputRefs = useRef([]);
    const syncRef = useRef<any>();
    const tables = SDB.props.tables;

    useEffect(() => {
        // syncRef.current.handleOnPress()
    }, [])

    return <SView col={"xs-12"} center >
        <BTN ref={syncRef} label={"Sincronizar todos"} onPress={async () => {
            for (let i = 0; i < inputRefs.current.length; i++) {
                const re: any = inputRefs.current[i]
                await re.sync();
            }
            DataBase.init();
            // inputRefs.current.map((ref: any) => ref.sync())
        }} />
        <SHr h={50} />
        {tables.map((table, i) => <TableItem ref={(el: never) => inputRefs.current[i] = el} table={table} />)}
    </SView>
}


