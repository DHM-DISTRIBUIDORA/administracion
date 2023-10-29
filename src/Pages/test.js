import { Text, View } from 'react-native'
import React, { Component, useState } from 'react'

import DomSelector from 'react-native-dom-parser';
import { SMapView, SPage, SText } from 'servisofts-component';
export default class test extends Component {
    state = {
        url: "https://repo.dhm.servisofts.com/dhm/gpx"
    };

    render() {
        return (
            <SPage disableScroll>
                <SMapView initialRegion={{
                    latitude: -17.783799,
                    longitude: -63.180,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
                    onPress={(e) => {
                        console.log(e);
                        if (this.marker) {
                            this.marker.setCoordinate(e.coordinate)
                        }
                    }}
                >
                    <SMapView.SMarker ref={ref => this.marker = ref} latitude={-17.78} longitude={-63.180} />
                </SMapView>

            </SPage>
        )

    }
}