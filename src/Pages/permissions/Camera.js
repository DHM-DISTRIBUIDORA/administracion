import React, { Component } from 'react'
import { Platform, Switch } from 'react-native'
import { PERMISSIONS, check, request } from 'react-native-permissions'
import PermisoItem from './Components/PermisoItem'

export default class Camera extends Component {
    state = {
        status: "",
        settings: {}
    }

    componentDidMount() {
        Platform.select({
            android: () => {
                check(PERMISSIONS.ANDROID.CAMERA).then((status) => {
                    this.setState({ status: status })
                })
            },
            ios: () => {
                check(PERMISSIONS.IOS.CAMERA).then((status) => {
                    this.setState({ status: status })
                })
            },
            web: () => {
                if (navigator.mediaDevices) {
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then((stream) => {
                            this.setState({ status: 'granted' });
                            stream.getTracks().forEach(track => track.stop());
                        })
                        .catch((error) => {
                            if (error.name === "NotAllowedError") {
                                this.setState({ status: 'denied' });
                            } else if (error.name === "NotFoundError") {
                                this.setState({ status: 'unavailable' });
                            }
                        });
                } else {
                    this.setState({ status: 'unsupported' });
                }
            }
        }).apply();
    }

    handleRequest() {
        Platform.select({
            android: () => {
                request(PERMISSIONS.ANDROID.CAMERA).then((status) => {
                    this.setState({ status: status })
                });
            },
            ios: () => {
                request(PERMISSIONS.IOS.CAMERA).then((status) => {
                    this.setState({ status: status })
                });
            },
            web: () => {
                if (navigator.mediaDevices) {
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then((stream) => {
                            this.setState({ status: 'granted' });
                            stream.getTracks().forEach(track => track.stop());
                        })
                        .catch((error) => {
                            if (error.name === "NotAllowedError") {
                                this.setState({ status: 'denied' });
                            } else if (error.name === "NotFoundError") {
                                this.setState({ status: 'unavailable' });
                            }
                        });
                } else {
                    this.setState({ status: 'unsupported' });
                }
            }
        }).apply();
    }

    render() {
        return <PermisoItem name={"Camera"} status={this.state.status} onPress={this.handleRequest.bind(this)} />
    }
}
