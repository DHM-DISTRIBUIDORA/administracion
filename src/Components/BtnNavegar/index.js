import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Linking, Platform } from 'react-native'
import { SPage, SText, SView } from 'servisofts-component';

export type BtnNavegarPropsType = {
    latLng: {
        latitude: any,
        longitude: any
    }
}
export default class index extends Component<BtnNavegarPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async _handle_ios() {
        let urlScheme;
        urlScheme = `comgooglemaps://?q=${this.props.latLng.latitude},${this.props.latLng.longitude}`;
        const isAvailable = await Linking.canOpenURL(urlScheme);
        if (!isAvailable) {
            // Linking.openURL(urlScheme);
            // urlScheme = `http://maps.apple.com/?q=${this.props.latLng.latitude},${this.props.latLng.longitude}`;
            urlScheme = `maps:0,0?q=${this.props.latLng.latitude},${this.props.latLng.longitude}`;
        }

        Linking.openURL(urlScheme);
    }
    _handle_android() {
        Linking.openURL(`geo:0,0?q=${this.props.latLng.latitude},${this.props.latLng.longitude}`);
    }
    _handle_web() {
        Linking.openURL(`http://maps.google.com/maps?q=${this.props.latLng.latitude}+${this.props.latLng.longitude}`);
    }
    _handlePress() {
        Platform.select({
            ios: this._handle_ios.bind(this),
            android: this._handle_android.bind(this),
            default: this._handle_web.bind(this),
        })();
    }
    render() {
        return (
            <SView onPress={this._handlePress.bind(this)}>
                {this.props.children ?? <SText>Navegar</SText>}
            </SView>
        );
    }
}