import React, { Component } from 'react';
import { SLoad, SText, STheme, SView } from 'servisofts-component';
import { check, request, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';

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

        };
    }
    handlePress() {
        this.checkBackgroundLocation()
    }

    checkBackgroundLocation() {
        request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        openSettings();
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                console.error(error)
            });
    }
    render() {
        return (
            <SView onPress={this.handlePress.bind(this)}>
                <SText>ACTIVARSE</SText>
            </SView>
        );
    }
}
