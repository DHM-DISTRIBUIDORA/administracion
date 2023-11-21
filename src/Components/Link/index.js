import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SText } from 'servisofts-component'

export default class Link extends Component {
    render() {
        return <SText color={"#00f"} {...this.props}>{this.props.children}</SText>
    }
}