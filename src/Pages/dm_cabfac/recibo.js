import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { Btn, Container, PButtom } from '../../Components';
import Model from '../../Model';
import DataBase from '../../DataBase';
class recibo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.idven = SNavigation.getParam("pk");
        this.onBack = SNavigation.getParam("onBack");
    }


    componentDidMount() {

        DataBase.dm_cabfac.objectForPrimaryKey(this.idven).then((e) => {
            // e.detalle = JSON.parse(e.detalle);
            this.setState({ data: e })
        })
        // SSocket.sendPromise({
        //     component: "dm_cabfac",
        //     type: "getPedido",
        //     idven: this.idven,


        // }).then(e => {
        //     console.log(e);
        //     this.setState({ data: e.data[0] })
        // }).catch(e => {
        //     console.error(e);
        // })
    }

    item() {
        if (!this.state?.data) return <SLoad />
        return <>
            <SView col={"xs-12"} row >
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold  >FECHA: </SText>
                    <SText font={'AcherusGrotesque-Regular'} fontSize={14} color={STheme.color.gray}>{new SDate(this.state?.data?.vfec, "yyyy-MM-dd hh:mm:ss.s").toString("DAY, dd de MON del yyyy")} a las {new SDate(this.state?.data?.vhora, "yyyy-MM-dd hh:mm:ss.s").toString("hh:mm:ss")}</SText>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >NIT/CI: </SText>
                    <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.nit}</SText>
                </SView>
            </SView>
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SText fontSize={14} bold >NOMBRE: </SText>
                    <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.nombrecliente}</SText>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14} bold >ID CLIENTE: </SText>
                    <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.clicod}</SText>
                </SView>
            </SView>
            <SView col={"xs-12"} row>
                <SView col={"xs-12 sm-8"} style={{ alignItems: "flex-start" }} row>
                    <SView width={70} style={{ alignItems: "flex-start" }} row>
                        <SText fontSize={14} bold >DETALLE: </SText>
                    </SView>
                    <SView col={"xs-9"} style={{ alignItems: "baseline" }} >
                        <SText font={'AcherusGrotesque-Regular'} color={STheme.color.gray}>{this.state?.data?.vobs}</SText>
                    </SView>
                </SView>
                <SView col={"xs-12 sm-4"} style={{ alignItems: "flex-end" }} row>
                    <SText fontSize={14}   >ID VENTA: </SText>
                    <SText color={STheme.color.gray} font={'AcherusGrotesque-Regular'} >{this.state?.data?.idven}</SText>
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
        const { detalle } = this.state.data;
        const productos = Model.tbprd.Action.getAll();
        let total = 0;
        if (!detalle) return <SLoad />
        if (!productos) return <SLoad />
        Object.keys(detalle).map((key, index) => {
            total += detalle[key].vdpre * detalle[key].vdcan;
        });
        return <>
            <SList
                initSpace={8}
                flex
                data={detalle}
                order={[{ key: "prdnom", order: "asc" }]}
                render={(vd) => {
                    const producto = Object.values(productos).find(a => a.prdcod == vd.prdcod)
                    return <>
                        <SView col={"xs-12"} row>
                            <SView col={"xs-1.5"} center>
                                <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{vd?.vdcan}</SText>
                            </SView>
                            <SView col={"xs-5.5"}>
                                <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{producto?.prdnom}</SText>
                            </SView>
                            <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                                <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{SMath.formatMoney(vd?.vdpre)} </SText>
                            </SView>
                            <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                                <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{SMath.formatMoney(vd?.vdpre * vd?.vdcan)}</SText>
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
                <SText font={'AcherusGrotesque-Regular'} fontSize={15} color={STheme.color.text}  >{`Bs. ${total}`}</SText>
            </SView>
        </>
    }
    render() {
        return (<SPage >
            <Container>
                <SHr height={20} />
                <SText font={'AcherusGrotesque-Bold'} fontSize={24} bold style={{ textDecorationLine: 'underline' }} >PEDIDO</SText>
                <SHr height={30} />
                {this.item()}
                <SHr h={20} />
                {this.cabeceraVenta()}
                {this.detalle()}
                <SHr height={20} />
                <Btn onPress={() => {
                    SNavigation.navigate("/dm_cabfac/edit", { pk: this.state.data.idven })
                }}>{"Editar"}</Btn>
                <SHr height={20} />
                <Btn onPress={() => {
                    DataBase.dm_cabfac.update({
                        ...this.state.data,
                        sync_type: "delete"
                    }).then(e => {
                        console.log("Exito al eliminar")
                    }).catch(e => {
                        console.error(e)
                    })
                    // console.log(Model.carrito.Action.getState().productos)
                    // console.log(this.state.data)
                }}>{"Eliminar"}</Btn>
                <SHr height={20} />
                {!this.onBack ? null :
                    <PButtom primary
                        loading={this.state.loading}
                        onPress={() => {
                            this.onBack();
                        }} >SALIR</PButtom>
                }
            </Container>
            {/* <SText>{JSON.stringify(this.state.data)}</SText> */}
            <SHr height={30} />
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(recibo);