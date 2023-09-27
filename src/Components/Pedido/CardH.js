import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PButtomSmall2 from '../PButtomSmall2';
import Background from 'servisofts-component/img/Background';
import Model from '../../Model';
// import Cantidad from './Cantidad';
export type PedidoCardHPropsType = {
    data: any,
    onPress?: (obj) => {},
    onSelect?: (itm) => any
}
export default class index extends Component<PedidoCardHPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderFecha(vfec, vhora) {
        var fecha = new SDate(vfec).toString("yyyy-MM-dd")
        var hora = new SDate(vhora, "yyyy-MM-dd hh:mm:ss.s").toString("hh:mm:ss")
        return <SView col={"xs-12"} >
            <SView flex height style={{ alignItems: "flex-end" }}>
                <SText fontSize={11} color={STheme.color.gray}>Fecha: {fecha} {hora} </SText>
            </SView>
        </SView>
    }

    getDetalleResumen(detalle) {
        if (!detalle) return null;
        var sumaPrecio = detalle.reduce((total, pedido) => total + (pedido.vdpre * pedido.vdcan), 0);
        return <SView col={"xs-12"} row>
            <SView col={"xs-6"} row>
                <SText fontSize={16} >( {detalle.length} items )</SText>
            </SView>
            <SView col={"xs-6"} row style={{ justifyContent: "flex-end" }}>
                <SText fontSize={18} >Bs.{SMath.formatMoney(sumaPrecio, 2)}</SText>
            </SView>
        </SView>
    }
    getOpciones(idven) {
        if (!idven) return null;
        return <SView col={"xs-12"} row style={{ justifyContent: "flex-end" }}>
            <SView col={"xs-12"} row style={{ justifyContent: "flex-end" }}>
                <PButtomSmall2 width={70} onPress={() => { SNavigation.navigate("/dm_cabfac/recibo", { pk: idven }) }} >
                    Detalle
                </PButtomSmall2>
                <SView width={8} />
            </SView>
        </SView>
    }
    render() {
        var { vfec, vhora, idven, detalle } = this.props.data;
        return <SView col={"xs-12"} card center padding={8} >
            <SView flex row col={"xs-12"}>
                <SView row >
                    <SText fontSize={14} color={STheme.color.gray}>Cod Venta: </SText>
                    <SText fontSize={16} bold>{idven}</SText>
                </SView>
                <SView width={8} />
            </SView>
            <SHr />
            <SView col={"xs-12"} row >
                {this.getDetalleResumen(detalle)}
            </SView>
            <SView col={"xs-12"} row >
                {this.getOpciones(idven)}
            </SView>
            <SHr />
            {this.renderFecha(vfec, vhora)}
        </SView>
    }
}