import React, { Component } from 'react'
import { SNavigation, SText, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket'
import Model from '../../Model'
import { Platform } from 'react-native'

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

        console.log(data);
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
                    // window.history.back();
                    window.location.href = window.location.href;
                }
            })
            this.setState({ loading: false, success: true })
        }).catch(e => {
            console.error(e);
            this.setState({ loading: false, success: false })
        })
    }
    render() {
        // if (this.state.success) {
        //     return <SText>GRACIAS!</SText>
        // }
        return (
            <SView col={"xs-12"} padding={16} backgroundColor='#666' onPress={this.sendServer.bind(this)}>
                {this.state.loading ? <SText>Cargando...</SText> : <SText>REPORTAR</SText>}
            </SView>
        )
    }
}