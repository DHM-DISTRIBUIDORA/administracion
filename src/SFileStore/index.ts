import { SFileStoreInterface } from "./type"

class SFileStore implements SFileStoreInterface {
    db: IDBDatabase;
    config = {
        version: 1,
        dbname: "SFileStore",
    };

    tables: { [key: string]: IDBObjectStoreParameters } = {
        "enviroments": { keyPath: "key" }
    }
    constructor() {
        this.loadVersion();
        // this.open().then((e) => this.db = e)
        // this.config.dbname = ""
    }
    loadVersion() {
        let db = localStorage.getItem(this.config.dbname);
        if (db) {
            const json = JSON.parse(db);
            this.config = json.config;
            this.tables = json.tables;
        } else {
            this.saveVersion();
        }
    }
    saveVersion() {
        localStorage.setItem(this.config.dbname, JSON.stringify({
            config: this.config,
            tables: this.tables
        }))
    }
    open() {
        return new Promise<any>(async (resolve, reject) => {
            let INSTACE = this;
            if (this.db) {
                resolve(this.db);
                return;
            }
            const request = indexedDB.open(this.config.dbname, this.config.version);
            request.onerror = async function (event) {
                console.log("Entro on error")
                // if(request.error)
                if (request.error.name == "VersionError") {
                    indexedDB.deleteDatabase(INSTACE.config.dbname);
                    resolve(await INSTACE.open());
                    return;
                }
                reject(request.error);
            };
            request.onsuccess = function (event: any) {
                console.log("Entro on succes")
                resolve(event.target.result);
            };
            request.onupgradeneeded = function (event: any) {
                console.log("Entro onupgradeneeded")
                INSTACE.db = event.target.result;
                Object.keys(INSTACE.tables).map((tbName) => {
                    if (!INSTACE.db.objectStoreNames.contains(tbName)) {
                        INSTACE.db.createObjectStore(tbName, INSTACE.tables[tbName]);
                    }
                })

            };
        })

    }

    close() {
        this.saveVersion();
        this.db.close();
        this.db = null;
    }

    async createTable(tbName, props: IDBObjectStoreParameters) {
        if (this.db.objectStoreNames.contains(tbName)) return;
        if (!this.tables[tbName]) {
            this.tables[tbName] = props;
            this.config.version += 1;
            this.close();
            await this.open()
        }

    }

    setItem(tbname: string, value: object, props?: IDBObjectStoreParameters): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.db = await this.open();
            await this.createTable(tbname, props ?? { keyPath: "id", autoIncrement: true });
            const transaction = this.db.transaction([tbname], "readwrite");
            const store = transaction.objectStore(tbname);
            console.log("Inserte objeto")
            if (Array.isArray(value)) {
                value.map(v => {
                    store.put(v);
                })
            } else {
                store.put(value);
            }
            resolve();
        })
    }
    getItem(key: string): Promise<object> {
        return new Promise<object>(async (resolve, reject) => {
            this.db = await this.open();
            const transaction = this.db.transaction([key]);
            const store = transaction.objectStore(key);
            const request = store.getAll();
            request.onerror = function (event) {
                reject("Error al obtener la tarea")
            };

            request.onsuccess = function (event) {
                resolve(request.result);
            };
        })
    }

}
export default new SFileStore();