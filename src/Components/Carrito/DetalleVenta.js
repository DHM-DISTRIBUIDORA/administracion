import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView, SNavigation, SList, SLoad } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PButtomSmall from '../PButtomSmall';
import Model from '../../Model';
export type DetalleVentaPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<DetalleVentaPropsType> {
    constructor(props) {
        super(props);
        this.state = {
            // items: 0,
            // total: 0
        };
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


    render() {
        let detalle = Model.tbvd.Action.getAll({ idven: this.props?.idven })
        let total = 0;

        const productos = Model.tbprd.Action.getAll();
        if (!detalle) return <SLoad />
        if (!productos) return <SLoad />

        Object.keys(detalle).map((key, index) => {
            total += detalle[key].vdpre * detalle[key].vdcan;
        });
        return (
            <>
                <SView col={"xs-12"} >
                    <SHr height={20} />
                    <SText fontSize={16} bold>Detalle de pedido</SText>
                    <SHr height={15} />
                    {this.cabeceraVenta()}
                    <SList
                        initSpace={8}
                        flex
                        data={detalle}
                        order={[{ key: "prdnom", order: "asc" }]}
                        render={(vd) => {
                            const producto = productos[vd.idprd]
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
                        }}
                    />
                    <SHr />
                    <SView col={"xs-12"} style={{ borderColor: STheme.color.gray, borderBottomWidth: 1 }} />
                    <SView col={"xs-12"} style={{ alignItems: "flex-end", }} height={36} >
                        <SHr />
                        <SText fontSize={15} color={STheme.color.text}  >{`Bs. ${total}`}</SText>
                    </SView>
                </SView>
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);