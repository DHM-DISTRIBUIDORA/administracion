import React, { Component } from 'react'
import { SHr, SText, SView } from 'servisofts-component'

export default class ReportButtom extends Component {
    render() {
        console.log(this.props)
        return (
            <SView col={"xs-12"} padding={16} backgroundColor='#666'>
                <SText>REPORTAR</SText>
            </SView>
        )
    }
}