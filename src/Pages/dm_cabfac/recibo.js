import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { Container, PButtom } from '../../Components';
import Model from '../../Model';
class recibo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.idven = SNavigation.getParam("pk");
        this.onBack = SNavigation.getParam("onBack");
    }


    componentDidMount() {
        SSocket.sendPromise({
            component: "dm_cabfac",
            type: "getPedido",
            idven: this.idven,


        }).then(e => {
            console.log(e);
            this.setState({ data: e.data[0] })
        }).catch(e => {
            console.error(e);
        })
    }

    item() {
        if (!this.state?.data) return <SLoad />
        return <>
            <SView col={"xs-12"} row >
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold  >FECHA: </SText>
                    <SText fontSize={14} color={STheme.color.lightGray}>{new SDate(this.state?.data?.vfec, "yyyy-MM-dd hh:mm:ss.s").toString("DAY, dd de MON del yyyy")} a las {new SDate(this.state?.data?.vhora, "yyyy-MM-dd hh:mm:ss.s").toString("hh:mm:ss")}</SText>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >NIT/CI: </SText>
                    <SText color={STheme.color.lightGray}>{this.state?.data?.nit}</SText>
                </SView>
            </SView>
            {/* <SHr height={5} /> */}
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold >NOMBRE: </SText>
                    <SText color={STheme.color.lightGray}>{this.state?.data?.nombrecliente}</SText>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >ID CLIENTE: </SText>
                    <SText color={STheme.color.lightGray}>{this.state?.data?.clicod}</SText>
                </SView>
            </SView>
            {/* <SHr height={5} /> */}
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold >DETALLE: </SText>
                    <SText color={STheme.color.lightGray}>{this.state?.data?.vobs}</SText>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >ID VENTA: </SText>
                    <SText color={STheme.color.lightGray}>{this.state?.data?.idven}</SText>
                </SView>
            </SView>

        </>
    }
    cabeceraVenta() {
        return <>
            <SView col={"xs-12"} row center
                height={36}
                backgroundColor={STheme.color.card}
                style={{
                    padding: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5
                }}
            >
                <SView col={"xs-1.5"} center>
                    <SText fontSize={12}>CANT</SText>
                </SView>
                <SView col={"xs-5.5"} center>
                    <SText fontSize={12}>DETALLE</SText>
                </SView>
                <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                    <SText fontSize={12}>PRECIO</SText>
                </SView>
                <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                    <SText fontSize={12}>SUBTOTAL</SText>
                </SView>
            </SView>
            <SView col={"xs-12"} style={{ borderColor: STheme.color.gray, borderBottomWidth: 1 }} />
        </>

    }

    detalle() {
        if (!this.state?.data) return <SLoad />
        const { dm_detfac } = this.state.data;
        const productos = Model.tbprd.Action.getAll();
        let total = 0;
        if (!dm_detfac) return <SLoad />
        if (!productos) return <SLoad />
        Object.keys(dm_detfac).map((key, index) => {
            total += dm_detfac[key].vdpre * dm_detfac[key].vdcan;
        });
        return <>
            <SList
                initSpace={8}
                flex
                data={dm_detfac}
                order={[{ key: "prdnom", order: "asc" }]}
                render={(vd) => {
                    const producto = Object.values(productos).find(a => a.prdcod == vd.prdcod)
                    return <>
                        <SView col={"xs-12"} row>
                            <SView col={"xs-1.5"} center>
                                <SText fontSize={12}>{vd?.vdcan}</SText>
                            </SView>
                            <SView col={"xs-5.5"}>
                                <SText fontSize={12}>{producto?.prdnom}</SText>
                            </SView>
                            <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                                <SText fontSize={12}>{SMath.formatMoney(vd?.vdpre)} </SText>
                            </SView>
                            <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                                <SText fontSize={12}>{SMath.formatMoney(vd?.vdpre * vd?.vdcan)}</SText>
                            </SView>
                        </SView>
                    </>
                }
                }
            />
            <SHr />
            <SView col={"xs-12"} style={{ borderColor: STheme.color.gray, borderBottomWidth: 1 }} />
            <SView col={"xs-12"} style={{ alignItems: "flex-end", }} height={36} >
                <SHr />
                <SText fontSize={15} color={STheme.color.text}  >{`Bs. ${total}`}</SText>
            </SView>
        </>
    }
    render() {
        return (
            <SPage >
                <Container>
                    <SHr height={20} />
                    <SText fontSize={24} bold style={{ textDecorationLine: 'underline' }} >PEDIDO</SText>
                    <SHr height={30} />
                    {this.item()}
                    <SHr h={20} />
                    {this.cabeceraVenta()}
                    {this.detalle()}
                    {!this.onBack ? null :
                        <PButtom primary
                            loading={this.state.loading}
                            onPress={() => {
                                this.onBack();
                            }} >SALIR</PButtom>
                    }
                </Container>
                {/* <SText>{JSON.stringify(this.state.data)}</SText> */}

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(recibo);