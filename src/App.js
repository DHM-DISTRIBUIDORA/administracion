import React from 'react';
import { Platform } from 'react-native';
import { SComponentContainer, SNavigation, SText, STheme } from 'servisofts-component';
import SSocket, { setProps } from 'servisofts-socket';
import Redux, { store } from './Redux';
import Config from "./Config";
import Assets from './Assets';
import Pages from './Pages';
import Firebase from './Firebase';
import DeviceKey from "./Firebase/DeviceKey"
import { NavBar, TopBar } from './Components';
import StatusBar from './Components/StatusBar';
import BackgroundImage from './Components/BackgroundImage';
import Model from './Model';
import { version } from "../package.json"
import BackgroundLocation from './BackgroundLocation';
import SDB from 'servisofts-db'

setProps(Config.socket);
Firebase.init();
DeviceKey.init();
BackgroundLocation();
const App = (props) => {
    // SDB.init({
    //     dbName: "namedb",
    //     version: 1,
    //     tables: {
    //         "usuarios": { keyPath: "key" }
    //     }
    // })
    return <Redux>
        <SComponentContainer
            debug
            socket={SSocket}
            background={<BackgroundImage />}
            assets={Assets}
            inputs={Config.inputs}
            theme={{ themes: Config.theme, initialTheme: "default" }}
        >
            <SNavigation
                linking={{
                    prefixes: ["https://dhm.servisofts.com/app/", "http://dhm.servisofts.com/app/", 'dhm://app/'],
                    getInitialURL: () => {
                        Firebase.getInitialURL();
                    }
                }}
                props={{
                    navBar: TopBar,
                    title: 'DHM', pages: Pages
                }}
            />
            <SSocket
                store={store}
                identificarse={(props) => {
                    var usuario = props.state.usuarioReducer.usuarioLog;
                    // if(usuario){
                    //     Model.usuario.Action.syncUserLog();
                    // }
                    return {
                        data: usuario ? usuario : {},
                        deviceKey: DeviceKey.getKey(),
                        // firebase: {
                        //     platform: Platform.OS,
                        //     token: DeviceKey.getKey(),
                        //     key_usuario: usuario?.key,
                        //     app: "client"
                        // }
                    };
                }}
            />
            <NavBar />
            <SText style={{ position: "absolute", bottom: 2, right: 2, }} fontSize={10} color={STheme.color.lightGray}>v{version}</SText>
        </SComponentContainer>
    </Redux>
}
export default App;