import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SHr, SIcon, SImage, SLoad, SMapView, SMath, SNavigation, SPage, SRangeSlider, SText, STheme, SThread, SView } from 'servisofts-component';
import { getGPXDiaUsuario } from './Functions';
import { SelectFecha } from '../../Components/Fechas';
import { Container } from '../../Components';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
export default class detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key_usuario: SNavigation.getParam("key_usuario"),
      fecha: SNavigation.getParam("fecha", new SDate().toString("yyyy-MM-dd")),
      // fecha: "2023-11-28",
      index: 0,
      total_cliente: 0,
      total_visitas: 0,
    }

  }

  componentDidMount() {

    this.usuario = Model.usuario.Action.getByKey(this.state.key_usuario);
    // if (this.usuario?.idvendedor) {
    // request["dia"] = 

    // SSocket.sendPromise({
    //   "component": "visita_vendedor",
    //   "type": "getAll",
    //   "estado": "cargando",
    //   "fecha": this.state.fecha,
    //   "idemp": this.usuario?.idvendedor,
    // }).then(e => {
    //   this.setState({ visitas: e.data })
    // }).catch(e => {
    //   console.error(e);
    // })
    // }
    this.loadAsyncVendedor();
  }

  getLoad() {
    return <SPage disableScroll>
      <Container>
        <SelectFecha fecha={this.state.fecha} onChange={(e) => {
          // this.state.fecha = e.fecha;
          this.loadData(e.fecha)
          // this.componentDidMount()
        }} />
        <SText>Cargando. ..</SText>

        {/* <SText>Numero entre 0 y {this.state.data ? this.state.data.length : 0}</SText> */}
      </Container>
      <SMapView initialRegion={{
        latitude: -17.783799,
        longitude: -63.180,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }}
        ref={ref => this.mapa = ref}>

      </SMapView>
    </SPage>
  }




  async loadAsyncVendedor() {
    if (!this.usuario?.idvendedor) return;
    const clientes = await SSocket.sendPromise({
      "component": "tbcli",
      "type": "getAll",
      "estado": "cargando",
      "cliidemp": this.usuario?.idvendedor,
      "dia": new SDate(this.state.fecha, "yyyy-MM-dd").date.getDay(),
    })


    const ventas = await SSocket.sendPromise({
      "component": "dm_cabfac",
      "type": "getPedidos",
      "estado": "cargando",
      "fecha": this.state.fecha,
      "idemp": this.usuario?.idvendedor,
    })


    const visitas = await SSocket.sendPromise({
      "component": "visita_vendedor",
      "type": "getAll",
      "estado": "cargando",
      "fecha": this.state.fecha,
      "idemp": this.usuario?.idvendedor,
    })
    const arrVisitas = Object.values(visitas.data);
    const arrVentas = Object.values(ventas.data);

    let total_cli = Object.values(clientes.data).length

    let cliarr = Object.values(clientes.data).map(cli => {
      // this.loadAsyncVentas(cli.idcli);
      const visitas_del_cliente = arrVisitas.filter(v => v.idcli == cli.idcli);
      const ventas_del_cliente = arrVentas.filter(v => v.clicod == cli.clicod);
      cli.visitas = visitas_del_cliente ?? []
      cli.ventas = ventas_del_cliente ?? []
      return cli;
      // cli.visitas = !visitas_del_cliente ? [] : visitas_del_cliente;
    })
    this.setState({ clientes: cliarr })
    this.setState({ ventas: ventas })
    this.setState({ total_cliente: total_cli })


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
          color = "#FFC010"
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

      if (activacion.tipo == "start") {
        last_start = activacion;
      }
      let ITEMS = [];
      const fact = new SDate(activacion.fecha_on);
      this.state.data.map((o) => {
	if(!last_start) return;
        if (o.fecha_on.substring(0, 18) <= last_start.fecha_on.substring(0, 18)) return;
        if (!last_stop) {
          // if (o.fecha_on.substring(0, 18) > activacion.fecha_on.substring(0, 18)) return;
        } else {
          if (o.fecha_on.substring(0, 18) > activacion.fecha_on.substring(0, 18)) return;
          if (o.fecha_on.substring(0, 18) <= last_stop.fecha_on.substring(0, 18)) return;
        }
        if (o.accuracy > 10) {
          return;
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
    if (!this.state.data) return <SLoad />
    if (!this.state.ventas) return <SLoad />
    console.log("this.state.ventas")
    console.log(this.state.ventas)
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

          let datav = this.state.ventas.data;
          let contador = 0;
          let total = 0;

          let fechaBase = this.state.fecha
          // const fecha1 = new SDate(fechaBase.toDateString() + ' ' + hora1);
          let fecha2 = new SDate(fechaBase + ' ' + this.state.data[this.state.index].fecha_on.substring(11, 19));
          if (this.state.index == (this.state.data.length - 1)) {
            Object.values(datav).map(a => {

              Object.keys(a.detalle).map((key, index) => {
                total += a.detalle[key].vdpre * a.detalle[key].vdcan;
              });
              // console.log(fecha1)
              // console.log(fecha2)
              // console.log("siiiii")
              contador++;
            })
          } else {
            Object.values(datav).map(a => {
              let fecha1 = new SDate(fechaBase + ' ' + a.vhora.substring(10, 19));
              if (fecha1 <= fecha2) {
                Object.keys(a.detalle).map((key, index) => {
                  total += a.detalle[key].vdpre * a.detalle[key].vdcan;
                });
                contador++;
              }
            })
          }

          this.mensaje.setLabel("pedidos: " + contador + " / total: Bs. " + SMath.formatMoney(total) + " / " + new SDate(this.state.data[this.state.index]?.fecha_on, "yyyy-MM-ddThh:mm:ss").toString("yyyy-MM-dd hh:mm:ss"))

          if (this.mensaje) {
            if (this.mapa) {
              // new SThread(500, "asd", true).start(() => {
              //   this.mapa.animateToRegion({
              //     latitude: parseFloat(this.state.data[this.state.index].lat),
              //     longitude: parseFloat(this.state.data[this.state.index].lon),
              //     latitudeDelta: 0.01,
              //     longitudeDelta: 0.01
              //   }, 100)
              // })

            }

            // this.mensaje.setLabel("pedidos: 0     -    " + new SDate(this.state.data[this.state.index]?.fecha_on, "yyyy-MM-ddThh:mm:ss").toString("yyyy-MM-dd hh:mm:ss"))
          }
        }} />
      <Mensajes ref={ref => this.mensaje = ref} />
      {/* <SText>{new SDate(this.state.data[this.state.index].fecha_on, "yyyy-MM-ddThh:mm:ss.SSSZ").toString("yyyy-MM-dd hh:mm:ss")}</SText> */}
    </>
  }

  getMarkersCliente() {
    this.visit = 0;
    if (!this.state?.clientes) return null;
    let tot_visit = 0;
    return this.state.clientes.map((o) => {
      console.log("CLIENTESSS")
      console.log(o)

      let color = STheme.color.danger
      if (o.visitas.length > 0) {
        // this.state.total_visitas = tot_visit++
        tot_visit++;
        this.visit = this.visit + 1;
        console.log("CLIENTESSS VISITAS")
        console.log(this.visit)
        // this.setState({ total_visitas: tot_visit++ })
        if (o.ventas.length > 0) {
          color = STheme.color.success
        } else {
          color = "#FFC010"

        }
        // this.setState({ total_visitas: tot_visit })
        //   console.log(o)
        //   console.log("PINTAAAAR")
        //   console.log("CLIENTESSS VISITAS")
        // console.log(o)
        this.state.total_visitas = this.visit
        console.log(this.visit)
      }
      if (!o.clilat || !o.clilon) return null;
      return <SMapView.SMarker width={68} height={73} onPress={() => { SNavigation.navigate("/tbcli/profile", { pk: o.idcli + "" }) }} key={o.idcli} latitude={parseFloat(o.clilat)} longitude={parseFloat(o.clilon)} fill={color}>
        {(o.visitas.length > 0) ?
          <SView center flex col={"xs-12"} height={73} style={{zIndex:999, position:"relative"}}>
            <SView col={"xs-12"} height={40} center >
                <SView  width={68} height={30} borderRadius={10} backgroundColor={STheme.color.white} style={{
                borderWidth: 2,
                borderColor: STheme.color.text,
                position: "absolute",
              }} center>
                  <SText fontSize={8} bold color={STheme.color.black} style={{ lineHeight: 8 }} center >{o.clinom}</SText>
                </SView>
            </SView>
            <SIcon name={"MarcadorMapa"} width={25.45} height={33.9} fill={color} />
          </SView>
          : <SIcon name={"MarcadorMapa"} width={25.45} height={33.9} fill={color} />}
      </SMapView.SMarker>
    })
  }

  cardDetalle() {
    if (!this.state?.clientes) return null;
    let tot_visit = 0;
    let pedidos = 0;
    let visitas_sin_exito = 0;
    this.state.clientes.map((o) => {
      console.log("CLIENTESSS")
      console.log(o)

      let color = STheme.color.danger
      if (o.visitas.length > 0) {
        // this.state.total_visitas = tot_visit++
        tot_visit++;
        // this.setState({ total_visitas: tot_visit++ })
        if (o.ventas.length > 0) {
          pedidos++;
          color = STheme.color.success
        } else {
          color = "#FFC010"
          visitas_sin_exito++;

        }
        // this.setState({ total_visitas: tot_visit })
        //   console.log(o)
        //   console.log("PINTAAAAR")
        //   console.log("CLIENTESSS VISITAS")
        // console.log(o)
      }

    })

    return <SView center
      style={{
        position: 'absolute',
        top: 140,
        zIndex: 9999,
        backgroundColor: STheme.color.card,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 6
      }}>
      <SView col={"xs-12"}>
        <SView col={"xs-12"} row>
          <SText>TOTAL CLIENTES </SText>
          <SText bold>({this.state.total_cliente})</SText>
        </SView>
        <SView col={"xs-12"} row>
          <SText>TOTAL VISITAS </SText>
          <SText bold>({tot_visit})</SText>
        </SView>
        <SView col={"xs-12"} row>
          <SView height={20} width={20} backgroundColor={STheme.color.success} style={{ borderRadius: 40 }} />
          <SView width={5} />
          <SText>PEDIDOS APP </SText>
          <SText bold>({pedidos})</SText>
        </SView>
        <SView col={"xs-12"} row >
          <SView height={20} width={20} backgroundColor={"#FFC010"} style={{ borderRadius: 40 }} />
          <SView width={5} />
          <SText>VISITAS SIN ÉXITO </SText>
          <SText bold>({visitas_sin_exito})</SText>
        </SView>
        <SView col={"xs-12"} row >
          <SView height={20} width={20} backgroundColor={STheme.color.danger} style={{ borderRadius: 40 }} />
          <SView width={5} />
          <SText>NO VISITADAS </SText>
          <SText bold>({this.state.total_cliente - tot_visit})</SText>
        </SView>
      </SView>
    </SView>
  }


  render() {
    //if (!this.state.clientes) return this.getLoad();

    let nroClientes = 0
    // let nroClientes =(this.state?.clientes).length()
    // console.log("dataCliente")
    // console.log(this.state.dataCliente)

    //if (!this.state.ventas) return this.getLoad();

    return (
      <SPage disableScroll>
        <Container>
          <SelectFecha fecha={this.state.fecha} onChange={(e) => {
            // this.state.fecha = e.fecha;
            this.loadData(e.fecha)
            // this.componentDidMount()
          }} />
          <SText>{this.usuario?.Nombres}-{this.usuario?.idvendedor}</SText>
          {this.renerWithData()}
          {/* <SText>Numero entre 0 y {this.state.data ? this.state.data.length : 0}</SText> */}
        </Container>
        {this.cardDetalle()}

        <SMapView initialRegion={{
          latitude: -17.783799,
          longitude: -63.180,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
          ref={ref => this.mapa = ref}>
          <></>
          {this.getPolylines()}
          {this.getMarkersCliente()}


          {/* {this.getActivaciones()} */}

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
