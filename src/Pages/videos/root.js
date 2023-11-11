import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SPage, SText } from 'servisofts-component'
import { Container } from '../../Components'

export default class root extends Component {
  render() {
    return <SPage title={"Videos"}>
        <Container>
            <SText>TODO: Colocar video tutoriales.</SText>
        </Container>
    </SPage>
  }
}