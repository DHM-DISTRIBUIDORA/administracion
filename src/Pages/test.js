import { Text, View } from 'react-native'
import React, { Component, useState } from 'react'
import { SButtom, SHr, SMapView, SNavigation, SPage, SText, SView } from 'servisofts-component';
import SwitchRastreo from '../Components/SwitchRastreo';
import { SBLocation } from 'servisofts-background-location';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default class test extends Component {
    state = {
    };

    componentDidMount() {
        SBLocation.isActive().then(e => {
            this.setState(e)
        }).catch(e => {
            this.setState(e)
        })
    }
    render() {

        return (
            <SPage title={"Test"}>
                <SView row col={"xs-12"} style={{
                    justifyContent:"space-around"
                }}>
                    <SButtom type='danger' onPress={() => {
                        if (this.state.estado == "exito") {
                            SBLocation.stop()
                            this.setState({ estado: "error" })
                            return;
                        }
                        SBLocation.start({
                            nombre: "Ubicación en tiempo real de DHM",
                            label: "Compartiendo ubicación en tiempo real",
                            minTime: 100,
                            minDistance: 0,
                            key_usuario: "04759652-b279-40ea-817d-dbfbfc39ffa5",
                            url: "http://192.168.2.1:30049/api",
                            
                            // url: "https://dhm.servisofts.com/images/api",
                            component: "background_location",
                            type: "onLocationChange"
                        }).then(e => {
                            console.log(e)
                            this.setState(e)
                        }).catch(e => {
                            this.setState(e)
                            console.error(e)
                        })
                    }}>{this.state.estado == "exito" ? "STOP" : "START"}</SButtom>
                    <SButtom type='danger' onPress={() => {
                        SBLocation.isActive().then(e => {
                            this.setState(e)
                        }).catch(e => {
                            this.setState(e)
                        })
                    }}>STATUS</SButtom>
                    <SButtom type='danger' onPress={() => {
                        SNavigation.navigate("/permissions")
                    }}>Permsiso</SButtom>
                </SView>

                <SText>{JSON.stringify(this.state)}</SText>
                <SView flex col={"xs-12"}>
                    <SMapView
                        initialRegion={{
                            latitude: -17.76463961783935,
                            longitude: -63.149120288986865,
                            latitudeDelta: 0.07,
                            longitudeDelta: 0.07
                        }}
                        showsUserLocation>

                    </SMapView>
                </SView>
            </SPage>
        )

    }
}