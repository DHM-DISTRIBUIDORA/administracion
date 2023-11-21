import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SLoad, SMapView, SNavigation, SPage, SRangeSlider, SText, STheme } from 'servisofts-component';
import { getGPXDiaUsuario } from './Functions';
import { SelectFecha } from '../../Components/Fechas';
import { Container } from '../../Components';
import SSocket from 'servisofts-socket';
export default class root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key_usuario: SNavigation.getParam("key_usuario"),
      fecha: SNavigation.getParam("fecha", new SDate().toString("yyyy-MM-dd")),
      index: 0,
    }
  }
  componentDidMount() {
  }

  loadActivaciones(fecha) {
    const request = {
      component: "location_info",
      type: "getAll",
      key_usuario: this.state.key_usuario,
      fecha_inicio: fecha,
      fecha_fin: fecha,
    }

    SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
      console.log(e);
      this.setState({ activaciones: Object.values(e.data), loading: false })
    }).catch(e => {
      console.error(e);
    })
  }
  loadData(fecha) {
    this.loadActivaciones(fecha)
    getGPXDiaUsuario({ fecha: fecha, key_usuario: this.state.key_usuario }).then(e => {
      console.log(e);
      this.setState({ data: e })
    }).catch(e => {
      this.setState({ data: null })
      console.error(e);
    })
  }

  getActivaciones = () => {
    if (!this.state?.activaciones) return null;
    console.log(this.state?.activaciones)
    return this.state.activaciones.map((o) => {
      return <SMapView.SMarker latitude={parseFloat(o.latitude)} longitude={parseFloat(o.longitude)} fill={o.tipo == "start" ? STheme.color.success : STheme.color.danger}>
        
      </SMapView.SMarker>
    })
  }
  getPoints = () => {
    if (!this.state?.data) return null;
    // console.log(this.state?.data)
    return this.state.data.map((o) => {
      return <SMapView.SMarker latitude={parseFloat(o.lat)} longitude={parseFloat(o.lon)} fill={"#f0f"}>
      </SMapView.SMarker>
    })
  }
  getPolylines = () => {
    if (!this.state?.data) return null;
    // console.log(this.state?.data)
    let ITEMS = [];

    this.state.data.map((o) => {
      ITEMS.push({
        latitude: parseFloat(o.lat),
        longitude: parseFloat(o.lon)
      })
      // ITEMS.push(<SMapView.SMarker latitude={o.lat} longitude={o.lon} onPress={() => {
      //     alert(o.fecha_on)
      // }}>
      // </SMapView.SMarker>)
    })
    return <SMapView.SPolyline key={this.state.index}
      coordinates={ITEMS}
      strokeColor={STheme.color.primary}
      strokeWidth={5}
    ></SMapView.SPolyline>
  }
  getMarkers = () => {
    if (!this.state?.data) return <></>;
    if (this.state?.data.length == 0) return <></>;

    return <SMapView.SMarker key={this.state.index}
    fill='#00f'
      ref={ref => this.marker = ref}
      latitude={parseFloat(this.state.data[this.state.index].lat)}
      longitude={parseFloat(this.state.data[this.state.index].lon)}
      fecha_on={this.state.data[this.state.index].fecha_on}
    ></SMapView.SMarker >
  }

  renerWithData() {
    if (!this.state.data) return <SLoad />
    return <>
      <SRangeSlider
        range={[0, this.state.data.length - 1]}
        defaultValue={this.state.index}
        onChange={(e) => {
          this.state.index = parseInt(e);
          if (this.marker) {
            // console.log(this.state.data[this.state.index]);
            this.marker.setCoordinate({
              latitude: parseFloat(this.state.data[this.state.index].lat),
              longitude: parseFloat(this.state.data[this.state.index].lon)
            })
            //this.setState({ index: parseInt(e) })
          }
          if (this.mensaje) {
            this.mensaje.setLabel(this.state.data[this.state.index]?.fecha_on)
          }
        }} />
      <Mensajes ref={ref => this.mensaje = ref} />
      {/* <SText>{new SDate(this.state.data[this.state.index].fecha_on, "yyyy-MM-ddThh:mm:ss.SSSZ").toString("yyyy-MM-dd hh:mm:ss")}</SText> */}
    </>
  }
  render() {
    return (
      <SPage disableScroll>
        <Container>
          <SelectFecha fecha={this.state.fecha} onChange={(e) => {
            // this.state.fecha = e.fecha;
            this.loadData(e.fecha)
          }} />
          {this.renerWithData()}
          {/* <SText>Numero entre 0 y {this.state.data ? this.state.data.length : 0}</SText> */}
        </Container>
        <SMapView initialRegion={{
          latitude: -17.783799,
          longitude: -63.180,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}>
          <></>
          {this.getPolylines()}
          {this.getActivaciones()}

          {/* {this.getPoints()} */}
          {this.getMarkers()}

        </SMapView>
      </SPage>
    )
  }

}

class Mensajes extends Component {
  state = {
    label: "FECHA"
  }
  setLabel(label) {
    this.setState({ label: label })
  }
  render() {
    return <SText>{this.state.label}</SText>
  }
}