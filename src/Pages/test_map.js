import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SPage } from 'servisofts-component'
import { SMapView } from 'servisofts-component'

export default class test_map extends Component {
    render() {
        return (
            <SPage disableScroll>
                <SMapView showsUserLocation={true} showsMyLocationButton={true} />
            </SPage>
        )
    }
}