import React, { Component } from 'react'
import { Platform, Switch } from 'react-native'
import { request, PERMISSIONS, check, checkNotifications, requestNotifications } from 'react-native-permissions'
import PermisoItem from './Components/PermisoItem'


export default class WriteExternalStorage extends Component {
    state = {
        status: "",
        settings: {}
    }
    componentDidMount() {
        Platform.select({
            android: () => {
                check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((e) => {
                    this.setState({ status: e })
                })
            },
            ios: () => {
                check(PERMISSIONS.IOS.MEDIA_LIBRARY).then((e) => {
                    this.setState({ status: e })
                })
            },
            web: () => {
                // if (navigator.geolocation) {
                //     navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                //         this.setState({ status: result.state });
                //     });
                // } else {
                this.setState({ status: 'unsupported' });
                // }
            }
        }).apply();

    }

    handleRequest() {
        Platform.select({
            android: () => {
                request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((e) => {
                    this.setState({ status: e })
                });
            },
            ios: () => {
                request(PERMISSIONS.IOS.MEDIA_LIBRARY).then((e) => {
                    this.setState({ status: e })
                });
            },
            web: () => {
                // if (navigator.geolocation) {
                //     navigator.geolocation.getCurrentPosition(
                //         (position) => {
                //             console.log(position);
                //             this.setState({ status: 'granted' });
                //         },
                //         (error) => {
                //             console.error(error);
                //             this.setState({ status: 'denied' });
                //         }
                //     );
                // } else {
                this.setState({ status: "unavailable", settings: {} });
                // }
            }
        }).apply();


    }
    render() {
        return <PermisoItem name={"Write External Storage"} status={this.state.status} onPress={this.handleRequest.bind(this)} />
    }
}
