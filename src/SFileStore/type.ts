export interface SFileStoreInterface {
    setItem(key: string, value: object, props: IDBObjectStoreParameters): Promise<void>;
    getItem(key: string): Promise<object>;

}
export type SFileStorePropsType = {

}