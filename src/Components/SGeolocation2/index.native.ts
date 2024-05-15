import { Options, Position, SGeolocationInterface } from "./type";
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
export default new class SGeolocation2 implements SGeolocationInterface {
    getCurrentPosition(opt: Options): Promise<Position> {
        return new Promise((resolve, reject) => {
            const success = (e:any) => {
                resolve(e);
                console.log("success", e);
            }
            const error = (e:any) => {
                reject(e);
                console.log("error", e);
            }
            Geolocation.getCurrentPosition(success, error, opt);
        })
    }


}()