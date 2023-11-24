import React, { Component } from 'react'
import { SHr, SInput, SPage, SText, SView } from 'servisofts-component'
import { openSettings } from "react-native-permissions"
import { Container } from '../../Components'
import Notifications from './Notifications'
import Location from './Location'
import BackgroundLocation from './BackgroundLocation'
import Camera from './Camera'
import PermisoItem from './Components/PermisoItem'
import WriteExternalStorage from './WriteExternalStorage'


export default class root extends Component {


    render() {
        return <SPage title={"Permissions"}>
            <Container>
                <Notifications />
                <Camera />
                <WriteExternalStorage />
                <Location />
                <BackgroundLocation />

                <SHr h={50} />
                <PermisoItem name={"Open settings"} onPress={() => {
                    openSettings().then(e => {

                    }).catch(e => {

                    })
                }} />
            </Container>
        </SPage>
    }
}