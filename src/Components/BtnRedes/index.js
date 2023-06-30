import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Linking, Platform } from 'react-native'
import { SPage, SText, SView } from 'servisofts-component';

export type BtnRedesPropsType = {
    latLng: {
        latitude: any,
        longitude: any
    },
    root: any
}
export default class index extends Component<BtnRedesPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _handle_ios() {
        Linking.openURL(this.props.root);
    }
    _handle_android() {
        Linking.openURL(`${this.props.root}`);
    }
    _handle_web() {
        Linking.openURL(`${this.props.root}`);
    }
    _handlePress() {
        Platform.select({
            ios: this._handle_ios.bind(this),
            android: this._handle_android.bind(this),
            default: this._handle_web.bind(this),
        })();
    }
    render() {
        console.log(this.props.root)
        return (
            <SView col={"xs-12"} row center onPress={this._handlePress.bind(this)}>
                {this.props.children ?? <SText>Navegar</SText>}
            </SView>
        );
    }
}