import { SThemeThemes } from 'servisofts-component';
import MapStyle from './mapStyle'

const theme: SThemeThemes = {
    default: {
        barStyle: "light-content",
        barColor: "#FA790E",
        text: "#000000",
        primary: "#FA790E",
        secondary: "#ffffff",
        info: "#DE5738",
        background: "#ffffff",
        card: "#eeeeee99",
        accent:"#99CC00",
        mapStyle: MapStyle,
        font:"OpenSans-SemiBold"

    },
    dark: {
        barStyle: "light-content",
        barColor: "#FA790E",
        text: "#000000",
        primary: "#FA790E",
        secondary: "#ffffff",
        info: "#DE5738",
        background: "#ffffff",
        card: "#eeeeee99",
        accent:"#99CC00",
        mapStyle: MapStyle,
        font:"OpenSans-SemiBold"
    }
}
export default theme;