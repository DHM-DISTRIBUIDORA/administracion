import { Text, View } from 'react-native'
import React, { Component, useState } from 'react'
import { SMapView, SPage, SText } from 'servisofts-component';

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default class test extends Component {
    state = {
    };

    componentDidMount() {
        request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
            // …
        });
    }
    render() {

        return (
            <SPage title={"Test"}>
            </SPage>
        )

    }
}