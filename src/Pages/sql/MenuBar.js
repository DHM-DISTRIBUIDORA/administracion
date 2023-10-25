import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SText, STheme, SView } from 'servisofts-component'

export default class MenuBar extends Component {
    render() {
        return <SView col={"xs-12"} height={30} backgroundColor={STheme.color.barColor} >
            <SText bold>Menu</SText>
        </SView>
    }
}