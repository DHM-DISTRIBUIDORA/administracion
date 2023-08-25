import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
import { SList, SLoad, SMath, SText, SView, SHr, STheme, SNavigation } from 'servisofts-component';
import { Carrito, PButtom } from '../../Components';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: ['usest', 'iniciales', 'modpreven', 'idcentro', 'suctod', 'usultsuc', 'verval', 'selcob', 'autcred', 'pcpred', 'facauto', 'uimpr'],
            // obj: {}
            title: "Venta exitosa"
        });
    }

    componentDidMount() {
        Parent.model.Action.getVenta({ idven: this.pk }).then((e) => {
            this.setState({ obj: e?.data[0] })
        }).catch(e => {
            console.error(e)
        })
    }


    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getVenta({ idven: this.pk });
    }
    $item() {
        if (!this.state?.obj) return <SLoad />
        console.log(this.state?.obj)
        console.log("holaaa")
        return <>
            <SHr height={20} />
            <SText fontSize={24} bold style={{ textDecorationLine: 'underline' }} >RECIBO DE VENTA </SText>
            <SHr height={30} />
            <SView col={"xs-12"} row >
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold >FECHA: </SText>
                    <SText fontSize={14} >{this.state?.obj?.vfec}</SText>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >NIT/CI: </SText>
                    <SText>{this.state?.obj?.vnit}</SText>
                </SView>
            </SView>
            {/* <SHr height={5} /> */}
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold >NOMBRE: </SText>
                    <SText>{this.state?.obj?.vcli}</SText>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >ID CLIENTE: </SText>
                    <SText>{this.state?.obj?.idcli}</SText>
                </SView>
            </SView>
            {/* <SHr height={5} /> */}
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold >DETALLE: </SText>
                    <SText>{this.state?.obj?.vdet}</SText>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >ID VENTA: </SText>
                    <SText>{this.state?.obj?.idven}</SText>
                </SView>
            </SView>

        </>
    }
    $footer() {
        // let detalle = Model.tbvd.Action.getAll({ idven: this.pk })
        // const productos = Model.tbprd.Action.getAll();
        // if (!detalle) return <SLoad />
        // if (!productos) return <SLoad />
        // return <SView col={"xs-12"}>
        //     <SList data={detalle} render={vd => {
        //         const producto = productos[vd.idprd]
        //         return <SView>
        //             <SText>{producto?.prdnom}</SText>
        //             <SText>Bs. {SMath.formatMoney(vd?.vdpre)}   X   {vd?.vdcan}</SText>
        //         </SView>
        //     }} />
        // </SView>
        return <>
            <Carrito.DetalleVenta idven={this.pk} />
            <SHr height={20} />
            <PButtom primary
                loading={this.state.loading}
                onPress={() => {
                    SNavigation.replace("/public")
                }} >IR A INICIO</PButtom>
        </>
    }


}
export default connect(index);