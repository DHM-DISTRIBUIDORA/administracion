import { SThemeThemes } from 'servisofts-component';
import MapStyle from './mapStyle'

const theme: SThemeThemes = {
    default: {
        barStyle: "light-content",
        barColor: "#31C2F1",
        text: "#151813 ",
        primary: "#31C2F1",
        secondary: "#ffffff",
        info: "#151813",
        background: "#F5F5F5",
        card: "#ffffff99",
        accent:"#151813",
        mapStyle: MapStyle,
        font:"OpenSans-SemiBold"

    },
    dark: {
        barStyle: "light-content",
        barColor: "#31C2F1",
        text: "#ffffff",
        primary: "#31C2F1",
        secondary: "#ffffff",
        info: "#151813",
        background: "#05253F",
        card: "#11304990",
        accent:"#151813",
        mapStyle: MapStyle,
        font:"OpenSans-SemiBold"
    }
}
export default theme;