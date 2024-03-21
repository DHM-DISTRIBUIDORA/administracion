import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SLoad, SMapView, SNavigation, SPage, SRangeSlider, SText, STheme, SThread } from 'servisofts-component';
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
      let arr = Object.values(e.data);

      this.setState({ activaciones: arr, loading: false })
    }).catch(e => {
      console.error(e);
    })
  }
  loadData(fecha) {
    this.loadActivaciones(fecha)
    this.setState({ data: null, error: "" })
    getGPXDiaUsuario({ fecha: fecha, key_usuario: this.state.key_usuario }).then(e => {
      e.sort((a, b) => a.fecha_on > b.fecha_on ? 1 : -1)
      console.log(e);
      this.setState({ data: e, error: "" })
    }).catch(e => {
      if (!e) {
        e = {
          error: "No hay datos en esta fecha."
        }
      }
      this.setState({ data: null, error: e?.message ?? e?.error })
      console.error(e);
    })
  }

  getActivaciones = () => {
    if (!this.state?.activaciones) return null;
    return this.state.activaciones.map((o) => {
      if (!o.latitude || !o.longitude) return null;
      let color = "";
      switch (o.tipo) {
        case "start":
          color = STheme.color.success
          break;
        case "provider_enabled":
          color = STheme.color.success
          break;
        case "provider_disabled":
          color = STheme.color.warning
          break;
        case "stop":
          color = STheme.color.danger
          break;
      }
      return <SMapView.SMarker latitude={parseFloat(o.latitude)} longitude={parseFloat(o.longitude)} fill={color}>

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
    if (!this.state?.activaciones) return null;

    // console.log(this.state?.data)
    const colores = ['#85BFD0', '#9B9AD9', '#90D598', '#F5AD76', '#F18684', '#E36188', '#76DEFC', '#D289E1', '#5097F8', '#17C3A5', '#A7C1D4', '#87e4ec'];


    let last_start = null
    let last_stop = null
    return this.state.activaciones.filter(a => a.tipo == "stop" || a.tipo == "provider_disabled" || a.tipo == "start").sort((a, b) => a.fecha_on > b.fecha_on ? 1 : -1).map((activacion, i) => {

      if(activacion.tipo =="start"){
        last_start = activacion;
      }
      let ITEMS = [];
      const fact = new SDate(activacion?.fecha_on);
      this.state.data.map((o) => {
        if (o.fecha_on.substring(0, 18) <= last_start?.fecha_on.substring(0, 18)) return;
        if (!last_stop) {
          // if (o.fecha_on.substring(0, 18) > activacion.fecha_on.substring(0, 18)) return;
        } else {
          if (o.fecha_on.substring(0, 18) > activacion?.fecha_on.substring(0, 18)) return;
          if (o.fecha_on.substring(0, 18) <= last_stop?.fecha_on.substring(0, 18)) return;
        }
        ITEMS.push({
          latitude: parseFloat(o.lat),
          longitude: parseFloat(o.lon)
        })
      })
      last_stop = activacion;

      return <SMapView.SPolyline key={this.state.index}
        coordinates={ITEMS}
        strokeColor={colores[i]}
        strokeWidth={5}
      ></SMapView.SPolyline>

    })
    // return <SMapView.SPolyline key={this.state.index}
    //   coordinates={ITEMS}
    //   strokeColor={STheme.color.primary}
    //   strokeWidth={5}
    // ></SMapView.SPolyline>
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
    if (this.state.error) return <SText>{JSON.stringify(this.state.error)}</SText>
    if (!this.state.data) return <><SLoad /> <SText>Buscando rutas...</SText></> 
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
            if (this.mapa) {
              // this.mapa.animateToRegion({
              //   latitude: parseFloat(this.state.data[this.state.index].lat),
              //   longitude: parseFloat(this.state.data[this.state.index].lon),
              //   latitudeDelta: 0.01,
              //   longitudeDelta: 0.01
              // }, 0)
            }

            this.mensaje.setLabel(new SDate(this.state.data[this.state.index]?.fecha_on,"yyyy-MM-ddThh:mm:ss").toString("yyyy-MM-dd hh:mm:ss"))
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
        }}
          ref={ref => this.mapa = ref}>
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