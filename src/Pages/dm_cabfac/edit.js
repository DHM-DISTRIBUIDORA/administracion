import React, { Component } from 'react';
import { SDate, SForm, SHr, SIcon, SInput, SList, SLoad, SMath, SNavigation, SPage, SPopup, SText, STheme, SThread, SView } from 'servisofts-component';
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
        }).catch(e => {
            console.error(e);
        })
        DataBase.tbprd.all().then(e => {
            this.setState({ productos: e })
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
                </SView>
                <SView col={"xs-1.5"} center>
                    <SText fontSize={12}>CANT</SText>
                </SView>
                <SView col={"xs-5.5"} center>
                    <SText fontSize={12}>DETALLE</SText>
                </SView>
                <SView col={"xs-2"} style={{ alignItems: "flex-end" }}>
                    <SText fontSize={12}>PRECIO</SText>
                </SView>
                <SView col={"xs-2"} style={{ alignItems: "flex-end" }}>
                    <SText fontSize={12}>TOTAL</SText>
                </SView>

            </SView>
            <SView col={"xs-12"} style={{ borderColor: STheme.color.gray, borderBottomWidth: 1 }} />
        </>

    }
    detalle() {
        if (!this.state?.data) return <SLoad />
        const { detalle } = this.state.data;
        const productos = this.state?.productos
        let total = 0;
        if (!detalle) return <SLoad />
        if (!productos) return <SLoad />
        Object.keys(detalle).map((key, index) => {
            total += detalle[key]?.vdpre * detalle[key]?.vdcan;
        });
        return <>
            <SList
                initSpace={8}
                flex
                data={detalle}
                order={[{ key: "prdnom", order: "asc" }]}
                render={(vd, key) => {
                    if (!vd) return null;
                    const producto = Object.values(productos).find(a => a.prdcod == vd.prdcod)
                    return <>
                        <SView col={"xs-12"} row>
                            <SView col={"xs-1"} center height
                                onPress={() => {
                                    // delete this.state.data.detalle[key]
                                    this.state.data.detalle.splice(key, 1)
                                    this.setState({ data: this.state.data })
                                    // console.log(this.state.data.detalle)
                                }
                                }>
                                <SIcon name={"Delete3"} fill={STheme.color.danger} width={20} height={20} />
                            </SView>
                            <SView col={"xs-1.5"} center>
                                <SInput style={{ textAlign: 'center', padding: 0, paddingStart: 0, }} center defaultValue={vd?.vdcan + ""} type={"number"}
                                    onChangeText={(val) => {
                                        new SThread(1000, "reload_key", true).start(() => {
                                            let dataOk = this.state.data;
                                            if (!val) val = 1
                                            dataOk.detalle[key].vdcan = parseInt(val ?? 1);
                                            this.setState({ data: dataOk })
                                        })

                                    }
                                    } />
                                {/* <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{key} - m {vd.vdcan} </SText> */}
                            </SView>
                            <SView col={"xs-5.5"} height style={{
                                justifyContent: "center"
                            }}>
                                <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{" " + producto?.prdnom}</SText>
                            </SView>
                            <SView col={"xs-2"} height style={{ alignItems: "flex-end", justifyContent: "center" }}>
                                <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{SMath.formatMoney(vd?.vdpre)} </SText>
                            </SView>
                            <SView col={"xs-2"} height style={{ alignItems: "flex-end", justifyContent: "center" }}>
                                <SText font={'AcherusGrotesque-Regular'} fontSize={12}>{SMath.formatMoney(vd?.vdpre * vd?.vdcan, 1)}</SText>
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
                <SText font={'AcherusGrotesque-Regular'} fontSize={15} color={STheme.color.text}  >{`Bs. ${SMath.formatMoney(total)}`}</SText>
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
                "vobs": {
                    label: "Observación", placeholder: "Escribe un detalle de máximo 65 caracteres.", defaultValue: data["vobs"], type: "textArea", onChangeText: (val) => {
                        if ((val + "").length > 65) {
                            return val.substring(0, 65);
                        }
                        this.state.detalle = val;
                    }
                }
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
                        sync_type: (data.sync_type == "insert" ? "insert" : "update")
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
            <PButtom3 colorBg={"#F9A435"} outline onPress={() => {
                SNavigation.navigate("/public/buscar", {
                    idven: this.state.data.idven, onSelect: (itm) => {
                        if (this.loading) return;
                        const prev = this.state.data.detalle.find(a => a.prdcod == itm.prdcod);
                        if (prev) {
                            SPopup.alert("Ya tienes este producto agregado.")
                            return false;
                        }
                        this.loading = true;

                        SNavigation.goBack();
                        this.state.data.detalle.push({
                            idven: this.state.data.idven,
                            prdcod: itm.prdcod,
                            vdcan: 1,
                            vddesc: 0,
                            vdpre: itm.prdpoficial,
                        })
                        this.setState({ ...this.state })
                        this.loading = false;
                        console.log(this.state.data)
                        console.log(itm)
                    }
                })
            }}>{"AÑADIR PRODUCTO"}</PButtom3>
            <SHr height={20} />

            {this.cabeceraVenta()}
            {this.detalle()}

            <SHr height={10} />
            <PButtom onPress={() => this.form.submit()}>{"GUARDAR"}</PButtom>
            <SHr height={50} />
        </>
    }
    render() {
        return (<SPage title={"Editar pedido"} onRefresh={e => {
            this.componentDidMount();
            if (e) e()
        }}>
            <Container>
                {/* <SHr height={20} /> */}
                {/* <SText font={'AcherusGrotesque-Bold'} fontSize={24} bold style={{ textDecorationLine: 'underline' }} >PEDIDO</SText> */}
                {/* <SText>{JSON.stringify(this.state)}</SText> */}
                {this.renderForm()}
            </Container>
        </SPage>
        );
    }
}
