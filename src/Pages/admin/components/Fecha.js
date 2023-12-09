import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SHr, SNavigation, SText, STheme, SView } from 'servisofts-component'
import { Btn } from '../../../Components'

export default class Fecha extends Component {
    render() {
        const curDate = new SDate(this.props.fecha_inicio, "yyyy-MM-dd").toString("DAY, dd de MONTH.")
        let curDate2 = null;
        let fecha = ""
        if (this.props.fecha_fin) {
            curDate2 = new SDate(this.props.fecha_fin, "yyyy-MM-dd").toString("DAY, dd de MONTH.")
            if (curDate == curDate2) {
                fecha = curDate;
            } else {
                fecha = curDate + " - " + curDate2;
            }
        } else {
            fecha = curDate;
        }
        return (
            <SView col={"xs-12"} center card>
                <SHr />
                <SText bold fontSize={20}>
                    {/* {curDate}
                    {curDate2 ? " - " + curDate2 : ""} */}
                    {fecha}
                </SText>
                <SHr />
                {/* <SView col={"xs-12"} center card padding={8}>
                </SView> */}

                <SHr />
            </SView>
        )
    }
}