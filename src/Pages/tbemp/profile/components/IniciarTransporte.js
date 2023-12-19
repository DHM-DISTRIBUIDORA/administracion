import { Platform, Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SHr, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component'
import { Btn } from '../../../../Components'
import SBLocation from 'servisofts-background-location'

export default class IniciarTransporte extends Component {
    render() {
        const curDate = new SDate(this.props.fecha, "yyyy-MM-dd").toString("DAY, dd de MONTH.")
        return (
            <SView col={"xs-12"} center card>
                <SHr />
                <SText bold fontSize={20}>{curDate}</SText>
                <SHr />
                {/* <SView col={"xs-12"} center card padding={8}>
                </SView> */}
                <Btn col={"xs-11"} type='default' onPress={() => {
                    if (Platform.OS == "web") {
                        SNavigation.navigate("/transporte", { idemp: this.props.idemp, fecha: this.props.fecha })
                        return;
                    };
                    SBLocation.isActive().then(e => {
                        if (e.estado == "exito") {
                            SNavigation.navigate("/transporte", { idemp: this.props.idemp, fecha: this.props.fecha })
                            return;
                        }
                        SPopup.alert("Debe activarse en el inicio para realizar pedidosss.")
                    }).catch(e => {
                        SPopup.alert("Debe activarse en el inicio para realizar pedidos.")
                    })
                }}>INICIAR TRANSPORTE</Btn>
                <SHr />
                <SText fontSize={12} center color={STheme.color.lightGray} >{"Al activarse se utilizará su ubicación para guiarlo a realizar sus visitas."}</SText>
                <SHr />
            </SView>
        )
    }
}