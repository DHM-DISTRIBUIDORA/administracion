import React from 'react';
import { Platform, Text } from 'react-native';
import { SComponentContainer, SNavigation, SText, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Redux, { store } from './Redux';
import Config from "./Config";
import Assets from './Assets';
import Pages from './Pages';
import Firebase from './Firebase';
import { NavBar, TopBar } from './Components';
import StatusBar from './Components/StatusBar';
import BackgroundImage from './Components/BackgroundImage';
import packageInfo from "../package.json"
import BackgroundLocation from './BackgroundLocation';
import Socket from './Socket';

Firebase.init();
// BackgroundLocation();
function App(): JSX.Element {
    // @ts-ignore
    return <Redux><SComponentContainer
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
                props={{ navBar: TopBar, title: 'DHM', pages: Pages }}
            />
            <Socket store={store} />
            <NavBar />
            <SText style={{ position: "absolute", bottom: 2, right: 2, }} fontSize={10} color={STheme.color.lightGray}>v{packageInfo.version}</SText>
        </SComponentContainer>
    </Redux>
}

export default App;