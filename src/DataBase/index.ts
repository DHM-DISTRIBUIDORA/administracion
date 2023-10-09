import SDB, { DBProps, TableAbstract } from 'servisofts-db'
import usuarioPage from './usuarioPage'
import usuario from './usuario'
import tbemp from './tbemp'
import tbprd from './tbprd'
import tbprdlin from './tbprdlin'
import tbzon from './tbzon'
import dm_cabfac from './dm_cabfac'
import tbcli from './tbcli'
import tbcat from "./tbcat";

import { SThread } from 'servisofts-component'
const DB: DBProps = {
    db_name: "dhm",
    version: 1,
    tables: [usuarioPage, usuario, tbemp, tbprd, tbprdlin, tbzon, dm_cabfac, tbcli, tbcat]
}

export default {
    init: () => {
        SDB.open(DB).then((e: any) => {
            new SThread(200, "esperando_test", false).start(() => {
                usuarioPage.loadToReducer();
                usuario.loadToReducer();
                tbemp.loadToReducer();
                tbprd.loadToReducer();
                tbprdlin.loadToReducer();
                tbzon.loadToReducer();
                dm_cabfac.loadToReducer();
                tbcli.loadToReducer();
                tbcat.loadToReducer();
            })

        })
    },
    clear: () => {
        DB.tables.map(t => t.deleteAll())
    },
    usuarioPage,
    usuario,
    tbemp,
    tbprd,
    tbprdlin,
    tbzon,
    dm_cabfac,
    tbcli,
    tbcat
}


