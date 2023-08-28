import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SHr, SNavigation, SText, STheme, SView } from 'servisofts-component'
import SwitchRastreo from '../../../../Components/SwitchRastreo'
import { Btn } from '../../../../Components'

export default class IniciarTransporte extends Component {
    render() {
        const curDate = new SDate().toString("DAY, dd de MONTH.")
        return (
            <SView col={"xs-12"} center card>
                <SHr />
                <SText bold fontSize={20}>{curDate}</SText>
                <SHr />
                {/* <SView col={"xs-12"} center card padding={8}>
                    <SwitchRastreo />
                </SView> */}
                <Btn col={"xs-11"} type='default' onPress={() => {
                    SNavigation.navigate("/vendedor", { idemp: this.props.idemp })
                }}>INICIAR TRANSPORTE</Btn>
                <SHr />
                <SText fontSize={12} center color={STheme.color.lightGray} >{"Al activarse se utilizara su ubicacion para guiarlo a realizar sus visitas."}</SText>
                <SHr />
            </SView>
        )
    }
}