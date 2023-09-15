import { SStorage } from "servisofts-component";
const MY_STORAGE_KEY = "storage";
class StoreTemp {
    store = {}

    constructor() {
        console.log("Cargo el store")
        SStorage.getItem(MY_STORAGE_KEY, (v) => {
            if (!v) return;
            this.store = JSON.parse(v);
        })
    }
    private save() {
        SStorage.setItem(MY_STORAGE_KEY, JSON.stringify(this.store));
    }

    setItem(key: string, data: object[]) {
        return new Promise<void>((resolve, reject) => {
            this.store[key] = data;
            this.save();
            resolve();
        })
    }

    getItem(key: string) {
        return new Promise<object[]>((resolve, reject) => {
            resolve(this.store[key]);
        })
    }
}
export default new StoreTemp();