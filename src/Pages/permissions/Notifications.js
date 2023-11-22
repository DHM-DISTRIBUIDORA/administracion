import React, { Component } from 'react'
import { Platform, Switch } from 'react-native'
import { PERMISSIONS, check, checkNotifications, requestNotifications } from 'react-native-permissions'
import PermisoItem from './Components/PermisoItem'


export default class Notifications extends Component {
    state = {
        status: "",
        settings: {}
    }
    componentDidMount() {
        Platform.select({
            android: () => {
                checkNotifications().then((e) => {
                    this.setState({ ...e })
                })
            },
            ios: () => {
                checkNotifications().then((e) => {
                    this.setState({ ...e })
                })
            },
            web: () => {
                if (!("Notification" in window)) {
                    this.setState({ status: "unavailable", settings: {} });
                } else if (Notification.permission !== "denied") {
                    Notification.requestPermission().then(permission => {
                        if (permission === "granted") {
                            this.setState({ status: "granted", settings: {} });
                        } else {
                            this.setState({ status: permission, settings: {} });
                        }
                    });
                }
            }
        }).apply();

    }

    handleRequest() {
        Platform.select({
            android: () => {
                requestNotifications(['alert', 'sound', "provisional"]).then((e) => {
                    this.setState({ ...e })
                });
            },
            ios: () => {
                requestNotifications(['alert', 'sound', "provisional"]).then((e) => {
                    this.setState({ ...e })
                });
            },
            web: () => {
                if (!("Notification" in window)) {
                    this.setState({ status: "unavailable", settings: {} });
                } else {
                    Notification.requestPermission().then(permission => {
                        this.setState({ status: permission, settings: {} });
                    });
                }
            }
        }).apply();


    }
    render() {
        return <PermisoItem name={"Notifications"} status={this.state.status} onPress={this.handleRequest.bind(this)} />
    }
}
