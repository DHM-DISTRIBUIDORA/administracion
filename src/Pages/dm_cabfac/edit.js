import React, { Component } from 'react';
import { SDate, SForm, SHr, SIcon, SInput, SList, SLoad, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { Btn, Container, PButtom, PButtom3 } from '../../Components';
import DataBase from '../../DataBase';
import Model from '../../Model';
export default class editar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.idven = SNavigation.getParam("pk");
    }


    componentDidMount() {
        DataBase.dm_cabfac.objectForPrimaryKey(this.idven).then((e) => {
            this.setState({ data: e })
        })

    }
    // detalle(){
    //     if (!this.state?.data) return <SLoad />
    //     const detalle = this.state?.data?.detalle ?? []
    //     let total = 0;
    //     let cantidadProductos = 0;
    //     detalle.map(a => {
    //         total += a.vdpre * a.vdcan
    //         cantidadProductos += a.vdcan;
    //     })
    //     return <SView col={"xs-12"} card padding={4} >
    //         <SView col={"xs-12"} row>
    //             <SView flex />
    //             <SText fontSize={10} color={STheme.color.gray}>{cantidadProductos} productos</SText>
    //         </SView>
    //         <SHr />
    //         <SView col={"xs-12"} center row>
    //             <SView flex row>
    //                 <SText bold>TOTAL</SText>
    //             </SView>
    //             <SView width={80} style={{
    //                 alignItems: "flex-end"
    //             }}>
    //                 <SText bold>Bs.{SMath.formatMoney(total)}</SText>
    //             </SView>
    //         </SView>
    //     </SView>
    // }
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
                <SView col={"xs-1"} style={{ alignItems: "flex-end" }}>
                    <SText fontSize={12}>ACCIÓN</SText>
                </SView>
                <SView col={"xs-1.5"} center>
                    <SText fontSize={12}>CANT</SText>
                </SView>
                <SView col={"xs-4.5"} center>
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
                render={(vd, key) => {
                    const producto = Object.values(productos).find(a => a.prdcod == vd.prdcod)
                    return <>
                        <SView col={"xs-12"} row>
                            <SView col={"xs-1"} center style={{ alignItems: "center" }}
                                onPress={() => {
                                    delete this.state.data.detalle[key]
                                    this.setState({ data: this.state.data })
                                    console.log(this.state.data.detalle)
                                }
                                }>
                                <SIcon name={"Delete3"} fill={STheme.color.danger} width={20} height={20} />
                            </SView>
                            <SView col={"xs-1.5"} center>
                                <SInput style={{ textAlign: 'center', padding: 5 }} width={55} center defaultValue={vd?.vdcan} type={"number"} onChange={(val) => {
                                    let dataOk = this.state.data;
                                    dataOk.detalle[key].vdcan = parseInt(val.nativeEvent.text);
                                    this.setState({ data: dataOk })
                                }
                                } />
                                {/* <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{key} - m {vd.vdcan} </SText> */}
                            </SView>
                            <SView col={"xs-4.5"}>
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


    renderForm() {
        const data = this.state.data;
        if (!data) return <SLoad />
        return <>
            <SHr height={10} />
            <SView col={"xs-12"} >
                <SText >Fecha: {data["vfec"]}</SText>
            </SView>
            <SHr height={10} />
            <SForm inputs={{
                // "vfec": { label: "vfec", defaultValue: data["vfec"] },
                // "nombrecliente": { label: "nombrecliente", defaultValue: data["nombrecliente"] },
                "nit": { label: "Nit", defaultValue: data["nit"], isRequired: true },
                "vobs": { label: "Observación", defaultValue: data["vobs"], type: "textArea" },
                // "detalle": { label: "detalle", defaultValue: JSON.stringify(data["detalle"]), type: "textArea" },
                // "fecha": { defaultValue: data["fecha"] /}
            }}
                ref={(form) => { this.form = form; }}
                // onSubmitName={"editar"}
                onSubmit={(val) => {
                    // val.detalle = JSON.parse(val.detalle)
                    val.detalle = this.state?.data?.detalle
                    console.log(val)
                    console.log(this.state?.data)
                    DataBase.dm_cabfac.update({
                        ...data,
                        ...val,
                        sync_type: "update"
                    }).then(e => {
                        console.log(e);
                        SNavigation.goBack();
                        SNavigation.navigate("/dm_cabfac/recibo", { pk: this.state.data.idven, refresh: true })
                    }).catch(e => {
                        console.error(e);
                    })
                    console.log(this.state?.data)
                }}
            />
            <SHr />
            {this.cabeceraVenta()}
            {this.detalle()}
            <SHr height={20} />
            <PButtom3 colorBg={"#F9A435"} onPress={() => {
                SNavigation.navigate("/public", { pk: this.state.data.idven })   
            }}>{"AÑADIR PRODUCTO"}</PButtom3>
            <SHr height={10} />
            <PButtom onPress={() => this.form.submit()}>{"EDITAR"}</PButtom>
        </>
    }
    render() {
        return (<SPage onRefresh={e => {
            this.componentDidMount();
            if (e) e()
        }}>
            <Container>
                <SHr height={20} />
                <SText font={'AcherusGrotesque-Bold'} fontSize={24} bold style={{ textDecorationLine: 'underline' }} >PEDIDO</SText>
                {/* <SText>{JSON.stringify(this.state)}</SText> */}
                {this.renderForm()}
            </Container>
        </SPage>
        );
    }
}
