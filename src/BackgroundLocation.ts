import { SBLocation } from 'servisofts-background-location';
import Model from './Model';
import { Platform } from 'react-native';
export default () => {
    // console.log("******* ENTRO A BackgroundLocation *********")
    // SBLocation.stop();
    if (Platform.OS == "web") return;
    SBLocation.initEmitter((data) => {
        return Model.background_location.Action.onChange(data.data, data.type);
    })
}