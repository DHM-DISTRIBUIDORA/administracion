import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SIcon, SNavigation, SNotification, SPopup, SText, STheme, SUuid, SView } from 'servisofts-component'
import DataBase from '../../../../DataBase'
import Model from '../../../../Model'
import { Trigger } from 'servisofts-db'
import SSocket from 'servisofts-socket'
const dia = [
  // { key: "", content: "Seleccione..." },
  { key: 0, content: "Domingo" },
  { key: 1, content: "Lunes" },
  { key: 2, content: "Martes" },
  { key: 3, content: "Miércoles" },
  { key: 4, content: "Jueves" },
  { key: 5, content: "Viernes" },
  { key: 6, content: "Sábado" }
]
export default class AlmacenEmpleadoComponent extends Component<{ idemp?: int }> {

  state = {
    data: [],
    tbzon: []
  }
  componentDidMount() {
    this.trigger = Trigger.addEventListener({
      on: ["insert", "update", "delete"],
      tables: ["almacen_empleado"]
    }, (e) => {
      this.loadData();
    })
    this.loadData();


  }
  componentWillUnmount() {
    Trigger.removeEventListener(this.trigger)
    
  }

  loadAlm() {
    SSocket.sendPromise({
      "version": "1.0",
      "component": "tbalm",
      "type": "getAll",
      "estado": "cargando"
    }).then(e => {
      this.setState({ tbalm: e.data })
    }).catch(e => {
      console.error(e);
    })
  }

  loadData() {
    DataBase.almacen_empleado.filtered("idemp == $0 && estado > 0", this.props.idemp).then(data => {
      this.setState({ data: data })
    })
    this.loadAlm()
    // DataBase.tbzon.all().then(data => {
    //   this.setState({ tbzon: data })
    // })
  }
  onAdd(day) {
    SNavigation.navigate("/tbalm", {
      onSelect: (tbalm) => {
        const exist = this.state.data.find(ze => ze.idalm == tbalm.idalm && ze.dia == day)
        if (exist) {
          SNotification.send({
            title: "Ya se encuentra registrado",
            color: STheme.color.danger,
            time: 5000,
          })
          return;
        }
        DataBase.almacen_empleado.insert({
          sync_type: "insert",
          key: SUuid(),
          idemp: this.props.idemp,
          idalm: tbalm.idalm,
          dia: day,
          estado: 1,
          key_usuario: Model.usuario.Action.getKey(),
        }).then(e => {
          let diaJson = dia.find(a => a.key == day);
          DataBase.Funciones.SaveChanges(DataBase.almacen_empleado);
          SNotification.send({
            title: "Agregado con exito.",
            body: `${tbemp.empnom} fue agregado en el día ${diaJson.content}.`,
            color: STheme.color.success,
            time: 5000,
          })
          console.log("Succes", e)
        }).catch(e => {
          console.error(e);
        })

      }
    })
  }

  renderDelete(empleado_almacen) {
    if (!this.allowEdit) return null;
    return <SView style={{
      width: 20,
      height: 20,
      position: "absolute",
      top: -4,
      right: -4,
    }} onPress={() => {
      SPopup.confirm({
        title: "Esta seguro de quitar el almacen?",
        onPress: () => {
          empleado_almacen.estado = 0;
          empleado_almacen.sync_type = "update";
          DataBase.almacen_empleado.update(empleado_almacen).then((e) => {
            DataBase.Funciones.SaveChanges(DataBase.almacen_empleado);
            console.log(e);
          }).catch(e => {
            console.error(e)
          })
        }
      })
      console.log(empleado_almacen)
    }}>
      <SIcon name='Delete' />
    </SView>
  }

  renderUserDay(day) {
    const data = this.state.data.filter(a => a.dia == day)
    if (!data || !data.length) return <SText fontSize={10} font='Roboto' color={STheme.color.warning}>{"Sin almacenes, click en + para agregar almacenes."}</SText>

    return data.map((itm) => {
      const alm = (this?.state?.tbalm ?? []).find(a => a.idalm == itm.idalm);
      // let alm = {}
      return <SView width={130} height={50} center padding={4} >
        <SView col={"xs-12"} height card center border={!itm.sync_type ? null : STheme.color.warning}>
          <SText fontSize={10} center font='Roboto'>{alm?.almcod} / {alm?.almnom}</SText>
          {/* <SText>{itm.}</SText> */}
        </SView>
        {this.renderDelete(itm)}
      </SView>
    })
  }
  renderAdd(onPress) {
    if (!this.allowEdit) return null;
    return <SView width={40} height={40} center card onPress={onPress}><SText bold>+</SText></SView>
  }
  renderDay({ day, onPress }) {
    let diaJson = dia.find(a => a.key == day);
    return <SView>
      <SView row center >
        {this.renderAdd(onPress)}
        <SView width={8} />
        <SText bold flex>{diaJson.content}</SText>
      </SView>
      <SHr h={4} />
      <SView row col={"xs-12"}>
        {this.renderUserDay(day)}
      </SView>
      <SHr h={4} />
      <SHr h={1} color={STheme.color.lightGray} />
      <SHr />
    </SView>
  }
  render() {
    this.allowEdit = Model.usuarioPage.Action.getPermiso({ url: "/tbemp", permiso: "edit_zona" });
    return <SView col={"xs-12"}>
      <SText bold>Almacenes del empleado</SText>
      {/* <SText font='Roboto' color={STheme.color.gray}>En un empleado se agregan zonas en los diferentes días de la semana, presione sobre el botón más al lado de cada día para agregar zonas en ese día.</SText> */}
      {[0, 1, 2, 3, 4, 5, 6].map(d => this.renderDay({ day: d, onPress: this.onAdd.bind(this, d) }))}
    </SView>
  }
}