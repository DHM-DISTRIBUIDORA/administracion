import { SThemeThemes } from 'servisofts-component';
import MapStyle from './mapStyle'
import MapStyleDark from './mapStyleDark';


// ------- Version blanco y negro -------
// const theme: SThemeThemes = {
//     default: {
//         barStyle: 'dark-content',
//         barColor: '#ffffff',
//         text: '#000000',
//         primary: '#ffffff',
//         secondary: '#000000',
//         info: '#97989d',
//         background: '#ffffff',
//         // card: '#00000010',
//         card: '#00000015',
//         font: "Roboto"
//     },
//     dark: {
//         barStyle: 'light-content',
//         barColor: '#000000',
//         text: '#ffffff',
//         primary: '#000000',
//         secondary: '#ffffff',
//         info: '#6E6F74',
//         background: '#000000',
//         card: '#ffffff15',
//         font: "Roboto"
//         // card: '#ffffff10'
//     }
// }

// ------- Version Prueba1 -------
const theme: SThemeThemes = {
    default: {
        barStyle: "dark-content",
        barColor: "#F5F5F5",
        text: "#151813",
        primary: "#31C2F1",
        secondary: "#ffffff",
        info: "#151813",
        background: "#F5F5F5",
        card: "#ffffff99",
        accent: "#151813",
        mapStyle: MapStyle,
        font: "AcherusGrotesque-Regular"

    },
    dark: {
        barStyle: "light-content",
        barColor: "#000000",
        text: "#ffffff",
        primary: "#31C2F1",
        secondary: "#ffffff",
        info: "#151813",
        background: "#000000",
        card: "#11304990",
        accent: "#151813",
        mapStyle: MapStyleDark,
        font: "AcherusGrotesque-Regular"
    }
}


// //----- Version Liceth -------
// const theme: SThemeThemes = {
//     default: {
//         barStyle: "light-content",
//         barColor: "#31C2F1",
//         text: "#151813 ",
//         primary: "#31C2F1",
//         secondary: "#ffffff",
//         info: "#151813",
//         background: "#F5F5F5",
//         card: "#ffffff99",
//         accent: "#151813",
//         mapStyle: MapStyle,
//         font: "OpenSans-SemiBold"

//     },
//     dark: {
//         barStyle: "light-content",
//         barColor: "#31C2F1",
//         text: "#ffffff",
//         primary: "#31C2F1",
//         secondary: "#ffffff",
//         info: "#151813",
//         background: "#05253F",
//         card: "#11304990",
//         accent: "#151813",
//         mapStyle: MapStyle,
//         font: "OpenSans-SemiBold"
//     }
// }
export default theme;