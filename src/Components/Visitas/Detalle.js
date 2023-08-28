import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SHr, SText, STheme, SView } from 'servisofts-component'

export default class Detalle extends Component {
  render() {
    if(!this.props.data) return null;
    const { descripcion, tipo, fecha, fecha_on, idemp, id_cli } = this.props.data;
    return (
      <SView col={"xs-12"} center card padding={8}>
        <SText >DETALLE DE LA VISITA</SText>
        <SHr h={4} />
        <SHr h={1} color={STheme.color.card} />
        <SHr h={4} />
        <SView col={"xs-12"}>
          <SText bold>{tipo}</SText>
          <SText color={STheme.color.lightGray}>{descripcion}</SText>
        </SView>
        <SHr h={4} />
        <SHr h={1} color={STheme.color.card} />
        <SHr h={4} />
        <SView col={"xs-12"} row>
          <SText color={STheme.color.lightGray} fontSize={10}>Vendedor: {idemp}</SText>
          <SView flex />
          <SText fontSize={10} color={STheme.color.lightGray}> {new SDate(fecha_on).toString("yyyy-MM-dd hh:mm")}</SText>
        </SView>
      </SView>
    )
  }
}