import React from 'react';
import { Platform } from 'react-native';
import { SComponentContainer, SNavigation } from 'servisofts-component';
import SSocket, { setProps } from 'servisofts-socket';
import Redux, { store } from './Redux';
import Config from "./Config";
import Assets from './Assets';
import Pages from './Pages';
// import Firebase from './Firebase';
import DeviceKey from "./Firebase/DeviceKey"
import { NavBar, TopBar } from './Components';
import StatusBar from './Components/StatusBar';


setProps(Config.socket);
// Firebase.init();
DeviceKey.init();
const App = (props) => {
    return <Redux>
        <SComponentContainer
            // debug
            socket={SSocket}
            assets={Assets}
            inputs={Config.inputs}
            theme={{ themes: Config.theme, initialTheme: "default" }}
        >
            <StatusBar />
            <SNavigation
                props={{
                    navBar: TopBar,
                    title: 'DHM', pages: Pages
                }}
            />
            <SSocket
                store={store}
                identificarse={(props) => {
                    var usuario = props.state.usuarioReducer.usuarioLog;
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
        </SComponentContainer>
    </Redux>
}
export default App;