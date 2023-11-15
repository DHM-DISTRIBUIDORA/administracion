import { TableAbstract } from "servisofts-db"
import SSocket from "servisofts-socket"
import DataBase from "."
import { SNotification, SPopup, STheme } from "servisofts-component"

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
    const tables = [DataBase.tbzon, DataBase.tbcat, DataBase.dm_cabfac, DataBase.tbcli, DataBase.visita_vendedor]
    tables.map((t) => {
        syncWithNotify(t);
    })
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
    const tables = [DataBase.tbcli, DataBase.tbzon]
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
    tablesLoading[table.scheme.name] = true;
    const _insert = await table.filtered("sync_type == 'insert' || sync_type == 'update' || sync_type == 'delete'");
    if (_insert.length > 0) {
        const notify = await SNotification.send({
            title: table.scheme.name,
            body: "Guardando cambios...",
            color: STheme.color.warning,
            type: "loading"
        })
        for (const key in _insert) {
            const obj = _insert[key];
            try {
                const resp = await SSocket.sendHttpAsync(SSocket.api.root + "api", {
                    component: table.scheme.name,
                    type: "save",
                    data: obj
                })
                if (resp.estado != "exito") throw resp;
                resp.data.sync_type = "";
                await table.delete(obj[table.scheme.primaryKey]);
                if (obj.sync_type != "delete") {
                    await table.insert(resp.data)
                }
            } catch (error: any) {
                SNotification.send({
                    title: "Error al guardar cambios",
                    body: JSON.stringify(error?.error) ?? JSON.stringify(error),
                    color: STheme.color.danger,
                    time: 10000,
                })
                console.error(error)
            }
        }
        notify.close();
    }
    tablesLoading[table.scheme.name] = false;
}

export const TimeHilo = 1000 * 45;
export const saveAllChanges = async () => {

    try {
        const version = await SSocket.sendHttpAsync(SSocket.api.root + "api", {
            component: "enviroments",
            type: "getVersion",
        })
    } catch (error) {
        SNotification.send({
            title: "Error al guardar cambios",
            body: "Verifique la conexion a internet.",
            color: STheme.color.danger,
            time: 6000,
        })
        return;
    }

    const tables = [DataBase.tbcli, DataBase.dm_cabfac, DataBase.visita_vendedor, DataBase.visita_transportista]
    // SNotification.send({
    //     title: "Virificando cambios",
    //     time: 2000,
    // })
    tables.map(t => SaveChanges(t))

}
