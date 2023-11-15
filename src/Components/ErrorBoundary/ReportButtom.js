import React, { Component } from 'react'
import { SNavigation, SText, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket'
import Model from '../../Model'
import { Platform, Text, TouchableOpacity } from 'react-native'

export default class ReportButtom extends Component {

    state = {}
    sendServer = () => {
        const data = {
            tipo: "error",
            descripcion: this?.props?.error?.message ?? "Sin descripcion",
            data: {
                ...this.props
            },

        }
        const nav = SNavigation.lastRoute;
        if (nav?.route) {
            data.data.route = {
                name: nav?.route.name,
                params: nav?.route.params
            }
        }

        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", {
            component: "log",
            type: "registro",
            key_usuario: Model.usuario.Action.getKey(),
            data: data
        }).then(e => {
            Platform.select({
                android: () => {
                    // SPopup.success({ title: "Gracias por reportar", body: "En breve nos pondremos en contacto contigo" })
                },
                ios: () => {
                    // SPopup.success({ title: "Gracias por reportar", body: "En breve nos pondremos en contacto contigo" })
                },
                web: () => {
                    window.location.href = "/"
                }
            }).apply()
            this.setState({ loading: false, success: true })
        }).catch(e => {
            
            this.setState({ loading: false, success: false })
        })
    }
    render() {
        // if (this.state.success) {
        //     return <SText>GRACIAS!</SText>
        // }
        return <TouchableOpacity
            style={{
                backgroundColor: '#000000',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                width: 100,
                flex: 1,
                height: 50,
                justifyContent: 'center',
            }}
            onPress={this.sendServer.bind(this)}
        >
            <Text style={{
                color: '#FFF',
                fontSize: 16,
            }}>REPORTAR</Text>
        </TouchableOpacity>
    }
}