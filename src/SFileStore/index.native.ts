import RNFS from 'react-native-fs';

import { SFileStoreInterface } from "./type"

class SFileStore implements SFileStoreInterface {
    setItem(key: string, value: object, props: IDBObjectStoreParameters): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getItem(key: string): Promise<object> {
        throw new Error('Method not implemented.');
    }
    // setItem(key: string, value: object): Promise<void> {
    //     const path = RNFS.DocumentDirectoryPath + "/" + key + ".json";
    //     return RNFS.writeFile(path, value, 'utf8')
    // }
    // getItem(key: string): Promise<object> {
    //     const path = RNFS.DocumentDirectoryPath + "/" + key + ".json";
    //     return RNFS.readFile(path, 'utf8');
    // }

}
export default new SFileStore();