import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SList, SText, SView } from 'servisofts-component'
// import Sql from './sql'
import QueryTool from './QueryTool'

export default class TabSelection extends Component {
    render() {
        return <SView flex height>
            <QueryTool />
        </SView>
    }
}