import { SThemeThemes } from 'servisofts-component';
import MapStyle from './mapStyle'

const theme: SThemeThemes = {
    default: {
        barStyle: "light-content",
        barColor: "#31C2F1",
        text: "#151813 ",
        primary: "#31C2F1",
        secondary: "#ffffff",
        info: "#DE5738",
        background: "#ffffff",
        card: "#eeeeee99",
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
        info: "#DE5738",
        background: "#05253F",
        card: "#eeeeee99",
        accent:"#151813",
        mapStyle: MapStyle,
        font:"OpenSans-SemiBold"
    }
}
export default theme;