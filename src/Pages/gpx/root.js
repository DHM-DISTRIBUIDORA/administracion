import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SLoad, SMapView, SNavigation, SPage, SRangeSlider, SText, STheme } from 'servisofts-component';
import { getGPXDiaUsuario } from './Functions';
import { SelectFecha } from '../../Components/Fechas';
import { Container } from '../../Components';
export default class root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key_usuario: SNavigation.getParam("key_usuario"),
      fecha: "2023-10-27",
      index: 0,
    }
  }
  componentDidMount() {
  }
  loadData(fecha) {
    getGPXDiaUsuario({ fecha: fecha, key_usuario: this.state.key_usuario }).then(e => {
      console.log(e);
      this.setState({ data: e })
    }).catch(e => {
      this.setState({ data: null })
      console.error(e);
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
    if (this.state?.data.length==0) return <></>;

    return <SMapView.SMarker key={this.state.index}
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
            this.marker.setCoordinate({
              latitude: parseFloat(this.state.data[this.state.index].lat),
              longitude: parseFloat(this.state.data[this.state.index].lon)
            })
            //this.setState({ index: parseInt(e) })
          }
        }} />
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
          {this.getMarkers()}
        </SMapView>
      </SPage>
    )
  }

}