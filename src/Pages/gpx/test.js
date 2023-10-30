import { Text, View } from 'react-native'
import React, { Component, useState } from 'react'


import { SMapView, SPage, SText } from 'servisofts-component';
export default class test extends Component {

    state = {
        url:"https://repo.dhm.servisofts.com/dhm/gpx"
    };

    componentDidMount() {

        console.log("ENTRO AQUI EJEUCATO")
        // this.init("04759652-b279-40ea-817d-dbfbfc39ffa5","2023-8-28");
        //this.init();
        //this.init("c6960922-79a8-4d22-8774-3336a2718f41", "2023-9-19");
        //this.init("7929777a-8cea- 4c34-aec8-a22bb7439fac","2023-9-27");
        let json = Function.getGPXDiaUsuario("27c58652-991d-435a-9207-e6bd5db16896","2023-10-27");
        console.log(json)

    }

  

    getMarkers = () => {
        if (!this.state?.data) return null;
        // console.log(this.state?.data)
        let ITEMS = [];
        
        this.state.data.map((o) => {
            ITEMS.push({
                latitude: parseFloat(o.lat),
                longitude: parseFloat(o.lon)
            })
            // ITEMS.push(<SMapView.SMarker latitude={o.lat} longitude={o.lon} onPress={() => {
            //     alert(o.fecha_on)
            // }}>
            // </SMapView.SMarker>)
        })
        return <SMapView.SPolyline
            coordinates={ITEMS}
            strokeColor='#f0f'
            strokeWidth={5}
        ></SMapView.SPolyline>
    }
    render() {
        return (
            <SPage disableScroll>
                <SMapView initialRegion={{
                    latitude: -17.783799,
                    longitude: -63.180,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}>
                    <></>
                    {this.getMarkers()}
                </SMapView>
            </SPage>
        )

    }
}