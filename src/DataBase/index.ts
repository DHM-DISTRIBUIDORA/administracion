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
import { SThread } from 'servisofts-component'
export const DB: DBProps = {
    db_name: "dhm",
    version: 17,
    tables: [sync_data, usuarioPage, usuario, tbemp, tbprd, tbprdlin, tbzon, dm_cabfac, tbcli, tbcat, background_location, visita_vendedor, visita_transportista, ventas_factura]
}

export default {
    init: () => {
        return new Promise((resolve, reject) => {
            SDB.open(DB).then((e: any) => {
                new SThread(50, "esperando_test", false).start(() => {
                    DB.tables.map(t => t.loadToReducer())
                    new SThread(50, "esperando_test_2", false).start(() => {
                        resolve("")
                    })
                })
            }).catch(e => {
                reject(e)
            })
        })
    },
    clear: () => {
        DB.tables.map(t => t.deleteAll())
    },
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
    ventas_factura
}


