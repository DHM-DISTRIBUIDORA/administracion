import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SHr, SNavigation, SText, STheme, SView } from 'servisofts-component'
import { Btn } from '../../../Components'

export default class Fecha extends Component {
    render() {
        const curDate = new SDate(this.props.fecha,"yyyy-MM-dd").toString("DAY, dd de MONTH.")
        return (
            <SView col={"xs-12"} center card>
                <SHr />
                <SText bold fontSize={20}>{curDate}</SText>
                <SHr />
                {/* <SView col={"xs-12"} center card padding={8}>
                </SView> */}
               
                <SHr />
            </SView>
        )
    }
}