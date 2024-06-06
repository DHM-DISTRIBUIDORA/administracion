import { TableAbstract } from "servisofts-db"
import SSocket from "servisofts-socket"
import DataBase from "."
import { SDate, SNotification, SPopup, SStorage, STheme, SThread } from "servisofts-component"
import Model from "../Model"
import { Data } from "servisofts-background-location"

export const sincronizar_productos = async () => {
    const tables = [DataBase.tbprd, DataBase.tbprdlin, DataBase.tbemp]
    tables.map((t) => {
        syncWithNotify(t);
    })
}
export const sicronizar_usuario = async () => {
    const tables = [DataBase.usuario, DataBase.usuarioPage]
    tables.map((t) => {
        syncWithNotify(t);
    })
}
export const sicronizar_vendedor = async () => {
    const tables = [DataBase.tbzon, DataBase.tbcat, DataBase.dm_cabfac, DataBase.visita_vendedor, DataBase.zona_empleado]
    let fecha = new SDate().toString("yyyy-MM-dd") + ""
    await DataBase.enviroments.insert({
        key: "fecha_vendedor",
        value: fecha
    })
    tables.map((t) => {
        syncWithNotify(t);
    })
    DataBase.tbcli.fecha = fecha;
    syncWithNotify(DataBase.tbcli);

}
export const sincronizar_transportista = async () => {
    SPopup.date("Selecciona la fecha", async (e: any) => {
        await DataBase.enviroments.insert({
            key: "fecha",
            value: e.fecha
        })
        const tables = [DataBase.visita_transportista, DataBase.ventas_factura]
        tables.map((t) => {
            t.fecha = e.fecha;
            syncWithNotify(t);
        })
    })

}

export const sincronizar_admin = async () => {
    const tables = [DataBase.tbzon, DataBase.zona_empleado, DataBase.almacen_empleado, DataBase.tbcli, DataBase.tbcat]
    tables.map((t) => {
        syncWithNotify(t);
    })
}

const syncWithNotify = async (t: any) => {
    const notify = await SNotification.send({
        title: t.scheme.name,
        body: "Cargando datos...",
        type: "loading"
    })
    try {
        await t.sync();
        notify.close()
    } catch (error: any) {
        notify.close()
        SNotification.send({
            title: t.scheme.name,
            body: error?.error ?? error,
            color: STheme.color.danger,
            time: 10000
        })

    }


}

const tablesLoading: any = {};

export const SaveChanges = async (table: TableAbstract) => {
    if (tablesLoading[table.scheme.name]) return;
    const _insert = await table.filtered("sync_type == 'insert' || sync_type == 'update' || sync_type == 'delete'");
    if (_insert.length > 0) {

        if (table.scheme.name == "dm_cabfac") {
            const _changes_tbcli = await DataBase.tbcli.filtered("sync_type == 'insert' || sync_type == 'update' || sync_type == 'delete'");
            if (_changes_tbcli.length > 0) {
                SNotification.send({
                    title: table.scheme.name,
                    body: "Se esperara a guardar tbcli.",
                    color: STheme.color.warning,
                    time: 10000,
                })
                return;
            }
        }
        const notify = await SNotification.send({
            title: table.scheme.name,
            body: "Guardando cambios...",
            color: STheme.color.warning,
            type: "loading"
        })
        for (const key in _insert) {
            const obj = _insert[key];
            try {
                tablesLoading[table.scheme.name] = true;
                new SThread(5000, "no_murio_" + table.scheme.name, true).start(() => {
                    tablesLoading[table.scheme.name] = false;
                })
                const resp = await SSocket.sendHttpAsync(SSocket.api.root + "api", {
                    component: table.scheme.name,
                    type: "save",
                    data: obj,
                    key_usuario: Model.usuario.Action.getUsuarioLog()?.key,
                    idvendedor: Model.usuario.Action.getUsuarioLog()?.idvendedor,
                    idtransportista: Model.usuario.Action.getUsuarioLog()?.idtransportista,
                })
                if (resp.estado != "exito") throw resp;
                resp.data.sync_type = "";


                const old_cli_cod = obj.clicod + ""
                try {
                    await table.delete(obj[table.scheme.primaryKey]);
                } catch (error) {
                    console.log("Ya no se encontraba en la base.")
                }
                if (obj.sync_type != "delete") {
                    await table.insert(resp.data)
                }
                if (table.scheme.name == "tbcli" && obj.sync_type == "insert") {
                    try {
                        const arr = await DataBase.dm_cabfac.filtered(`clicod == $0`, old_cli_cod)
                        // const arr = await DataBase.dm_cabfac.all();
                        console.log("pedidos con este clicod", arr);
                        for (let i = 0; i < arr.length; i++) {
                            const o = arr[i];
                            o.clicod = resp.data.clicod;
                            await DataBase.dm_cabfac.update(o);
                        }
                    } catch (error) {
                        console.error("Error al buscar pedidos", error);
                    }
                }
                //     SStorage.getItem("cliente_dhm", (cli: string) => {
                //         if (cli) {
                //             let client = JSON.parse(cli);
                //             if (obj[table.scheme.primaryKey] == client.idcli) {
                //                 SStorage.setItem("", resp.data)
                //             }
                //         }
                //     })
                // }
            } catch (error: any) {
                tablesLoading[table.scheme.name] = false;
                SNotification.send({
                    title: table.scheme.name,
                    body: "Error al guardar cambios " + (JSON.stringify(error?.error) ?? JSON.stringify(error)) ?? "",
                    color: STheme.color.danger,
                    time: 10000,
                })
                console.error(error)
            }
        }
        notify.close();
    }
}

export const TimeHilo = 1000 * 45;
export const saveAllChanges = async () => {

    try {
        const version = await SSocket.sendHttpAsync(SSocket.api.root + "api", {
            component: "enviroments",
            type: "getVersion",
        })
    } catch (error) {
        // SNotification.send({
        //     title: "Error al guardar cambios",
        //     body: "Verifique la conexion a internet.",
        //     color: STheme.color.danger,
        //     time: 6000,
        // })
        return;
    }

    const tables = [DataBase.tbcli, DataBase.dm_cabfac, DataBase.visita_vendedor, DataBase.visita_transportista, DataBase.zona_empleado, DataBase.almacen_empleado]
    for (let i = 0; i < tables.length; i++) {
        const element = tables[i];
        await SaveChanges(element);
    }
    // SNotification.send({
    //     title: "Virificando cambios",
    //     time: 2000,
    // })
    // tables.map(t => SaveChanges(t))

}
