import React from "react";
import { Platform } from "react-native";
import SSocket, { setProps } from 'servisofts-socket';
import Config from "./Config";
import Model from "./Model";
import DeviceKey from "./Firebase/DeviceKey"
import packageInfo from "../package.json"

setProps(Config.socket);
DeviceKey.init();

export default ({ store }) => {
    return <SSocket
        store={store}
        identificarse={(props) => {
            
            let tags = {
                platform: Platform.OS,
                user_type: "undefined",
                app_version: packageInfo.version
            };

            let tbcli = Model.tbcli.Action.getCliente();
            if (tbcli) {
                tags["idcli"] = tbcli.idcli
                tags["user_type"] = "cliente"

            }

            var usuario = props.state.usuarioReducer.usuarioLog;
            if (usuario) {
                tags["key_usuario"] = usuario.key;
                tags["user_type"] = "admin"
                tags["idvendedor"] = usuario?.idvendedor
                tags["idtransportista"] = usuario?.idtransportista
            }

            return {
                data: usuario ? usuario : {},
                deviceKey: DeviceKey.getKey(),
                firebase: {
                    tags: tags,
                    platform: Platform.OS,
                    token: DeviceKey.getKey(),
                    key_usuario: usuario?.key,
                    app: "client",
                    descripcion: Platform.select({
                        "web": `Web ${window.navigator.userAgent}`,
                        "android": `Android ${Platform?.constants?.Version}, ${Platform?.constants?.Manufacturer} ${Platform?.constants?.Brand} ${Platform?.constants?.Model}`,
                        "ios": `IOS ${Platform?.Version}, ${Platform?.constants?.systemName}`,
                    }),
                }
            };
        }}
    />
}