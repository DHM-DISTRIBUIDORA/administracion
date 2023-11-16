import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SIcon, SImage, SNavigation, SText, STheme, SView } from 'servisofts-component'
import { Container } from '..'
import SSocket from 'servisofts-socket'
import Model from '../../Model'

const Card = ({ label, backgroundColor, onPress }) => {
   return <SView width={95} height={35} center >
      <SView col={"xs-12"} flex style={{
         backgroundColor: backgroundColor ?? STheme.color.card,
         borderWidth: 2,
         borderColor: backgroundColor,
      }} onPress={onPress}>
         <SText center fontSize={14} bold color={STheme.color.white}>{label}</SText>
         <SHr height={15} />
      </SView>
   </SView>
}

export default class Cliente extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   onChange(e) {
      if (this.props.onChange) this.props.onChange(e);
   }
   botones() {
      return <SView col={"xs-12"} row>
         <Card label={"Nuevo"} backgroundColor={STheme.color.success + "AA"} onPress={() => {
            SNavigation.navigate("/tbcli/new",
               // {
               //    onSelect: (cliente) => {
               //       console.log("clienteeeeee");
               //       console.log(cliente);
               //       // this.setState({ idz: cliente.idcli + "" })
               //    }
               // },
               { pk: Model.usuario.Action.getUsuarioLog()?.idvendedor, ubicacion: "true" })
         }} />
         <Card label={"Seleccionar"} backgroundColor={"#85BFD0" + "AA"} onPress={() => {
            SNavigation.navigate("/tbcli", { onSelect: (e) => { this.onChange(e); } })
         }} />
      </SView>
   }

   render() {
      if (!this.props.data) return this.botones();
      if (!this.props.data) return <SText>No hay cliente seleccionado.</SText>
      return (
         <SView col={"xs-12"} >
            {/* <SText>TODO: Colocar boton para seleccinar el cliente.</SText> */}
            {/* <Text>{JSON.stringify(this.props)} </Text> */}
            <SHr height={10} />
            <SView col={"xs-12"} row style={{
               borderTopLeftRadius: 8,
               overflow: "hidden"
            }}>
               <Card label={"Nuevo"} backgroundColor={STheme.color.success + "AA"} onPress={() => {
                  SNavigation.navigate("/tbcli/new",
                     // {
                     //    onSelect: (cliente) => {
                     //       console.log("clienteeeeee");
                     //       console.log(cliente);
                     //       // this.setState({ idz: cliente.idcli + "" })
                     //    }
                     // },
                     { pk: parseInt(Model.usuario.Action.getUsuarioLog()?.idvendedor), ubicacion: "true" })
               }} />
               <Card label={"Editar"} backgroundColor={"#F5AD76" + "AA"} onPress={() => {
                  SNavigation.navigate("/tbcli/edit", { pk: this.props.data?.idcli, ubicacion: "true" })
               }} />
               <Card label={"Seleccionar"} backgroundColor={"#85BFD0" + "AA"} onPress={() => {
                  SNavigation.navigate("/tbcli",
                     {
                        onSelect: (client) => {
                           this.onChange(client)
                        }
                     })
               }} />
            </SView>
            <SView col={"xs-12"} card row style={{
            }}>
               <SView col={"xs-3.5"} center style={{ padding: 8 }}>
                  <SView width={80} height={80} card style={{ overflow: "hidden" }}>
                     <SImage src={require('../../Assets/img/foto.png')}
                        style={{
                           position: "absolute",
                           zIndex: 90,
                           top: 0,
                        }}
                     />
                     <SImage enablePreview src={SSocket.api.root + "tbcli/" + this.props.data?.idcli}
                        style={{
                           position: "absolute",
                           zIndex: 99,
                           top: 0,
                           backgroundColor: "#ffffff50"
                        }}
                     />
                  </SView>
                  <SText col={"xs-12"} center>NIT: {this.props.data.clinit}</SText>
               </SView>
               <SView col={"xs-8.5"} style={{ padding: 8, }} center>
                  <SText col={"xs-12"} style={{ lineHeight: 25 }}>Nombre: {this.props.data.clinom}</SText>
                  <SText col={"xs-12"} style={{ lineHeight: 25 }}>Telefono: {this.props.data.clitel}</SText>
                  <SText col={"xs-12"} style={{ lineHeight: 25 }}>Dirección: {this.props.data.clidir}</SText>
               </SView>
            </SView>
         </SView >
      )
   }
}