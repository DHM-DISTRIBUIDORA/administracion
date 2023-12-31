import React, { Component } from 'react';
import { SLoad, SNotification, SText, STheme, SView } from 'servisofts-component';

import { Animated, Platform } from 'react-native';

import { SBLocation } from 'servisofts-background-location';
import { Linking } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';

type _SwitchRastreoProps = {
    colors: {
        active?: string,
        inactive?: string,
        acent?: string,
    },
    width?: number,
    height?: number,
}

export default class SwitchRastreo extends Component<_SwitchRastreoProps> {
    state;
    animValue;


    constructor(props: any) {
        super(props);
        this.state = {
            active: "error",
            colors: {
                active: this.props.colors?.active ?? "#2FC25F",
                inactive: this.props.colors?.inactive ?? "#B7B7B7",
                acent: this.props.colors?.acent ?? "#ffffff"
            },
        };
        this.animValue = new Animated.Value(this.state.active == "exito" ? 1 : 0);
    }
    componentDidMount() {
        if (Platform.OS == "web") return;
        SBLocation.isActive().then(e => {
            if (e.estado == "exito") {
                this.fadeIn(1)
            } else {
                this.fadeIn(0)
            }
            this.setState({ active: e.estado })
        }).catch(e => {
            this.setState({ active: e.estado })
            this.fadeIn(0)
        })
    }
    fadeIn(val) {
        this.state.active = SBLocation.isStarted();
        this.animValue.stopAnimation();
        Animated.timing(this.animValue, {
            toValue: val,
            duration: 250,
            useNativeDriver: false
        }).start(() => {
            // this.state.active = SBLocation.isStarted();
            // this.setState({
            //     active: this.state.active
            // });
        });
    }

    callback = () => {
        if (this.state.active != "exito") {
            SBLocation.start({
                nombre: "Ubicación en tiempo real de DHM",
                label: "Compartiendo ubicación en tiempo real",
                minTime: 1000,
                minDistance: 1,
                // key_usuario: "04759652-b279-40ea-817d-dbfbfc39ffa5",
                key_usuario: Model.usuario.Action.getKey(),
                url: SSocket.api.root + "api",
                // url: "http://192.168.2.1:30049/api",
                // url: "https://dhm.servisofts.com/images/api",
                component: "background_location",
                type: "onLocationChange"
            }).then(e => {
                if (e.estado == "exito") {
                    this.fadeIn(1)
                } else {
                    this.fadeIn(0)
                    SNotification.send({
                        title: "Error al iniciar el rastreo.",
                        body: e?.error,
                        color: STheme.color.danger,
                        time: 10000,
                    })
                }

                this.setState({ active: e.estado })

            }).catch(e => {
                this.fadeIn(0)
                SNotification.send({
                    title: "Error al iniciar el rastreo.",
                    body: e?.error,
                    color: STheme.color.danger,
                    time: 10000,

                })
                // if (e.error == "permision") {
                // Linking.openSettings();
                // }
            })
        } else {
            SBLocation.stop();
            this.fadeIn(0)
            this.setState({ active: "error" })

        }

    }

    render() {
        // console.log("SBLocation.isStarted()?")
        // console.log(SBLocation.isStarted())
        return <SView animated style={{
            width: this.props.width ?? 115,
            height: this.props.height ?? 40,
            borderRadius: 18,
            justifyContent: 'center',
            backgroundColor: this.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.colors["inactive"], this.state.colors["active"]]
            }),
        }}
            onPress={() => {
                // this.fadeIn();
                if (this.props.callback) {
                    this.props.callback({ active: this.state.active })
                    return;
                }
                this.callback();
            }}
        >
            <SView animated center style={{
                width: 115,
                height: 33,
                position: "absolute",
                transform: [{
                    translateX: this.animValue.interpolate({ inputRange: [0, 1], outputRange: [0, -(this.props.width / 2)] })
                }]
                // right: ,
            }}
            ><SText col={"xs-12"} center color={"#fff"} bold fontSize={12}>{this.state.active == "exito" ? "On" : "Off"}</SText></SView>
            <SView animated style={{
                width: 33,
                height: 33,
                borderRadius: 100,
                position: "absolute",
                transform: [{
                    translateX: this.animValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [4, (this.props.width ?? 100) - 37]
                    })
                }]
            }}
                backgroundColor={this.state.colors["acent"]}
            ></SView>
        </SView>
        return <SView animated style={{
            width: this.props.width ?? 115,
            height: this.props.height ?? 40,
            borderRadius: 18,
            justifyContent: 'center',
            backgroundColor: this.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.colors["inactive"], this.state.colors["active"]]
            }),
        }}
            onPress={() => {
                this.fadeIn();
                this.props.callback({ active: this.state.active })
            }}

        ><SView animated center style={{
            width: 115,
            height: 33,
            position: "absolute",
            right: this.animValue.interpolate({ inputRange: [0, 1], outputRange: [0, (this.props.width ?? 100) - 70] }),
        }}
        ><SText col={"xs-12"} center color={"#fff"} bold fontSize={12}>{this.state.active ? "On" : "Offline"}</SText></SView>
            <SView animated style={{
                width: 33,
                height: 33,
                borderRadius: 100,
                position: "absolute",
                left: this.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [4, (this.props.width ?? 100) - 33 - 4]
                }),
            }}
                backgroundColor={this.state.colors["acent"]}
            ></SView>
        </SView>
    }
}
