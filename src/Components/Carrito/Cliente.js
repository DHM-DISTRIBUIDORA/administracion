import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SText } from 'servisofts-component'

export default class Cliente extends Component {
  render() {
    return (
      <View>
        <SText>TODO: Colocar boton para seleccinar el cliente.</SText>
        <Text>{JSON.stringify(this.props)} </Text>
      </View>
    )
  }
}