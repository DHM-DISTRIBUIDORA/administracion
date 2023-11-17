import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SIcon, SNavigation, SNotification, SPopup, SText, STheme, SUuid, SView } from 'servisofts-component'
import DataBase from '../../../../DataBase'
import Model from '../../../../Model'
import { Trigger } from 'servisofts-db'
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
export default class ZonaEmpleadoComponent extends Component<{ idemp?: int }> {

  state = {
    data: [],
    tbzon: []
  }
  componentDidMount() {
    this.trigger = Trigger.addEventListener({
      on: ["insert", "update", "delete"],
      tables: ["zona_empleado"]
    }, (e) => {
      this.loadData();
    })
    this.loadData();


  }
  componentWillUnmount() {
    Trigger.removeEventListener(this.trigger)
  }


  loadData() {
    DataBase.zona_empleado.filtered("idemp == $0 && estado > 0", this.props.idemp).then(data => {
      this.setState({ data: data })
    })
    DataBase.tbzon.all().then(data => {
      this.setState({ tbzon: data })
    })
  }
  onAdd(day) {
    SNavigation.navigate("/tbzon", {
      onSelect: (tbzon) => {
        const exist = this.state.data.find(ze => ze.idz == tbzon.idz && ze.dia == day)
        if (exist) {
          SNotification.send({
            title: "Ya se encuentra registrado",
            color: STheme.color.danger,
            time: 5000,
          })
          return;
        }
        DataBase.zona_empleado.insert({
          sync_type: "insert",
          key: SUuid(),
          idemp: this.props.idemp,
          idz: tbzon.idz,
          dia: day,
          estado: 1,
          key_usuario: Model.usuario.Action.getKey(),
        }).then(e => {
          let diaJson = dia.find(a => a.key == day);
          DataBase.Funciones.SaveChanges(DataBase.zona_empleado);
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

  renderDelete(empleado_zona) {
    if (!this.allowEdit) return null;
    return <SView style={{
      width: 20,
      height: 20,
      position: "absolute",
      top: -4,
      right: -4,
    }} onPress={() => {
      SPopup.confirm({
        title: "Esta seguro de quitar la zona?",
        onPress: () => {
          empleado_zona.estado = 0;
          empleado_zona.sync_type = "update";
          DataBase.zona_empleado.update(empleado_zona).then((e) => {
            DataBase.Funciones.SaveChanges(DataBase.zona_empleado);
            console.log(e);
          }).catch(e => {
            console.error(e)
          })
        }
      })
      console.log(empleado_zona)
    }}>
      <SIcon name='Delete' />
    </SView>
  }

  renderUserDay(day) {
    const data = this.state.data.filter(a => a.dia == day)
    if (!data || !data.length) return <SText fontSize={10} font='Roboto' color={STheme.color.warning}>{"Sin zonas, click en + para agregar zonas."}</SText>

    return data.map((itm) => {
      const zon = this.state.tbzon.find(a => a.idz == itm.idz);
      return <SView width={100} height={50} center padding={4} >
        <SView col={"xs-12"} height card center border={!itm.sync_type ? null : STheme.color.warning}>
          <SText fontSize={10} center font='Roboto'>{zon?.zcod} / {zon?.znom}</SText>
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
      <SText bold>Zonas del empleado</SText>
      <SText font='Roboto' color={STheme.color.gray}>En un empleado se agregan zonas en los diferentes días de la semana, presione sobre el botón más al lado de cada día para agregar zonas en ese día.</SText>
      {[0, 1, 2, 3, 4, 5, 6].map(d => this.renderDay({ day: d, onPress: this.onAdd.bind(this, d) }))}
    </SView>
  }
}