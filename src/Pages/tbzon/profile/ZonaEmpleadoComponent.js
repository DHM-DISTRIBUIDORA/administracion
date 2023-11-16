import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SIcon, SNavigation, SNotification, SPopup, SText, STheme, SUuid, SView } from 'servisofts-component'
import DataBase from '../../../DataBase'
import Model from '../../../Model'
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
export default class ZonaEmpleadoComponent extends Component<{ idz?: int }> {

  state = {
    data: [],
    tbemp: []
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
    DataBase.zona_empleado.filtered("idz == $0 && estado > 0", this.props.idz).then(data => {
      this.setState({ data: data })
    })
    DataBase.tbemp.all().then(data => {
      this.setState({ tbemp: data })
    })
  }
  onAdd(day) {
    SNavigation.navigate("/tbemp", {
      onSelect: (tbemp) => {
        const exist = this.state.data.find(ze => ze.idemp == tbemp.idemp && ze.dia == day)
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
          idemp: tbemp.idemp,
          idz: this.props.idz,
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
    return <SView style={{
      width: 20,
      height: 20,
      position: "absolute",
      top: -4,
      right: -4,
    }} onPress={() => {
      SPopup.confirm({
        title: "Esta seguro de quitar al empleado?",
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
    if (!data || !data.length) return <SText fontSize={10} font='Roboto' color={STheme.color.warning}>{"Sin usuarios, click en + para agregar usuarios."}</SText>

    return data.map((itm) => {
      const emp = this.state.tbemp.find(a => a.idemp == itm.idemp);
      return <SView width={100} height={50} center padding={4} >
        <SView col={"xs-12"} height card center border={!itm.sync_type ? null : STheme.color.warning}>
          <SText fontSize={10} center font='Roboto'>{emp?.empnom}</SText>
          {/* <SText>{itm.}</SText> */}
        </SView>
        {this.renderDelete(itm)}
      </SView>
    })
  }
  renderDay({ day, onPress }) {
    let diaJson = dia.find(a => a.key == day);
    return <SView>
      <SView row center onPress={onPress}>
        <SView width={40} height={40} center card><SText bold>+</SText></SView>
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
    return <SView>
      <SText bold>Empleados en la zona</SText>
      <SText font='Roboto' color={STheme.color.gray}>En una zona se agregan empleados en los diferentes dias de la semana, presione sobre el boton mas al lado de cada dia para agregar emplados en ese día.</SText>
      {[0, 1, 2, 3, 4, 5, 6].map(d => this.renderDay({ day: d, onPress: this.onAdd.bind(this, d) }))}
    </SView>
  }
}