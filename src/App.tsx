import React, { useEffect } from 'react';
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

import DataBaseContainer from './DataBase/DataBaseContainer';
// import { Example } from 'servisofts-charts';

try {
    Firebase.init();
} catch (e) {
    console.log(e);
}
BackgroundLocation();

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
            <DataBaseContainer>
                <SNavigation
                    linking={{
                        prefixes: ["https://dhm.servisofts.com/app/", "http://dhm.servisofts.com/app/", 'dhm://app/'],
                        getInitialURL: () => {
                            Firebase.getInitialURL();
                        }
                    }}
                    props={{ navBar: TopBar, title: 'DHM', pages: Pages }}
                />
                <NavBar />
                <SText style={{ position: "absolute", bottom: 2, right: 2, zIndex: 0, }} disabled fontSize={10} color={STheme.color.lightGray}>v{packageInfo.version}</SText>
            </DataBaseContainer>
            <Socket store={store} />
        </SComponentContainer>
    </Redux>
}


// function AppTest(): JSX.Element {
//     return <Example />
// }

// export default AppTest;
export default App;