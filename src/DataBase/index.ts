import SDB, { DBProps, TableAbstract } from 'servisofts-db'
import usuarioPage from './tables/usuarioPage'
import usuario from './tables/usuario'
import tbemp from './tables/tbemp'
import tbprd from './tables/tbprd'
import tbprdlin from './tables/tbprdlin'
import tbzon from './tables/tbzon'
import dm_cabfac from './tables/dm_cabfac'
import tbcli from './tables/tbcli'
import tbcat from "./tables/tbcat";
import background_location from './tables/background_location'
import sync_data from './tables/sync_data'
import visita_vendedor from './tables/visita_vendedor'
import visita_transportista from './tables/visita_transportista'
import ventas_factura from './tables/ventas_factura'
import enviroments from './tables/enviroments'
import zona_empleado from './tables/zona_empleado'
import { SThread } from 'servisofts-component'
import * as Funciones from "./Funciones"

export const DB: DBProps = {
    db_name: "dhm",
    version: 19,
    tables: [sync_data, usuarioPage, usuario, tbemp, tbprd, tbprdlin, tbzon, dm_cabfac, tbcli, tbcat, background_location, visita_vendedor, visita_transportista, ventas_factura, enviroments, zona_empleado]
}

export default {
    init: () => {
        return new Promise((resolve, reject) => {
            SDB.open(DB).then((e: any) => {
                console.log("ENTRO ACA")
                new SThread(50, "esperando_test", false).start(() => {
                    DB.tables.map(t => t.loadToReducer())
                    new SThread(50, "esperando_test_2", false).start(() => {
                        resolve("")
                    })
                })
            }).catch(e => {
                console.error("ENTRO EROR", e)
                reject(e)
            })
        })
    },
    clear: () => {
        DB.tables.map(t => t.deleteAll())
    },
    Funciones,
    sync_data,
    usuarioPage,
    usuario,
    tbemp,
    tbprd,
    tbprdlin,
    tbzon,
    dm_cabfac,
    tbcli,
    tbcat,
    background_location,
    visita_vendedor,
    visita_transportista,
    ventas_factura,
    enviroments,
    zona_empleado
}


