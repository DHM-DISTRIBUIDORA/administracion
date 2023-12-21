import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SList2, SLoad, SMath, SText, STheme, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket'

export default class ListaDePedidos extends Component<{ clicod: string }> {
    state = {

    }
    componentDidMount() {
        SSocket.sendPromise2({
            component: "dm_cabfac",
            type: "getAllPedidosCliente",
            clicod: this.props.clicod
        }).then(e => {

            e.data.map(a => {
                let fecha = new SDate(a?.vfec.substring(0, 10) + " " + a?.vhora.substring(11, 19), "yyyy-MM-dd hh:mm:ss");
                a.time = fecha.getTime();
                a.fecha = fecha.toString();
                a.visita = e?.visitas[a.idpeddm];
            })
            e.data.sort((a, b) => a.time > b.time ? -1 : 1)
            this.setState({ data: e.data })
        }).catch(e => {
            console.error(e);
        })
    }
    renderItem = (obj) => {
        const { vfec, vhora, vobs, cantidad, monto, vdet, razonsocial, nit } = obj;
        let fecha = new SDate(vfec.substring(0, 10) + " " + vhora.substring(11, 19), "yyyy-MM-dd hh:mm:ss");
        let color = STheme.color.success;
        if (!obj.visita) {
            color = STheme.color.warning;
        } else {
            if ((obj.visita?.tipo + "").indexOf("ENTREGADO") <= -1) {
                color = STheme.color.danger;
            }
        }
        if (vdet == "ANULADO") {
            color = STheme.color.danger;
        }
        return <SView col={"xs-12"} card padding={8} border={color}>
            <SText fontSize={12} color={STheme.color.lightGray}>{fecha.toString("DAY dd de MONTH del yyyy a las hh:mm")}</SText>
            <SText>idven: {obj.idven}</SText>
            <SText>idpeddm: {obj.idpeddm}</SText>
            <SText>Nit: {nit}  Razon Social: {razonsocial}</SText>
            <SText>Cantidad Prd.: {cantidad}  Monto total: {SMath.formatMoney(monto)}</SText>
            <SText>{vobs}</SText>
            <SText>{obj?.visita?.tipo}</SText>
        </SView>
    }
    render() {
        if (!this.state.data) return <SText center onPress={this.componentDidMount.bind(this)}>{`Cargando historial de pedidos...\nSi esto demora demasiado puedes volver a intentarlo dando click Aqui.`}</SText>
        return <SView col={"xs-12"}>
            <SText>Historial de pedidos</SText>
            <SList2 data={this.state.data}
                limit={5}
                buscador
                render={this.renderItem}
            />
        </SView>
    }
}