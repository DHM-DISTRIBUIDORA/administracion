import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView, SNavigation, SList } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PButtomSmall from '../PButtomSmall';
import Model from '../../Model';
export type DetallePropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<DetallePropsType> {
    constructor(props) {
        super(props);
        this.state = {
            // items: 0,
            // total: 0
        };
    }

    cabeceraPedido() {

        return <>
            <SView col={"xs-12"} row>
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
            <SHr />
            <SView col={"xs-12"} style={{ borderColor: STheme.color.gray, borderBottomWidth: 1 }} />
        </>

    }


    render() {

        const productos = Model.carrito.Action.getState().productos;
        let total = 0;
        Object.keys(productos).map((key, index) => {
            total += productos[key].data.prdpoficial * productos[key].cantidad;
        });
        return (
            <>
                <SView col={"xs-12"} >
                    <SHr />
                    <SText fontSize={16} bold>Detalle de pedido</SText>
                    <SHr height={15} />
                    {this.cabeceraPedido()}
                    <SList
                        initSpace={8}
                        flex
                        data={productos}
                        // filter={(a) => a.idlinea == this.params.pk}
                        order={[{ key: "prdnom", order: "asc" }]}
                        // limit={10}
                        render={(obj) => {
                            return <>
                                <SView col={"xs-12"} row>
                                    <SView col={"xs-1.5"} center>
                                        <SText fontSize={12}>{obj?.cantidad}</SText>
                                    </SView>
                                    <SView col={"xs-5.5"}>
                                        <SText fontSize={12}>{obj?.data?.prdnom}</SText>
                                    </SView>
                                    <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                                        <SText fontSize={12}>{obj?.data?.prdpoficial}</SText>
                                    </SView>
                                    <SView col={"xs-2.5"} style={{ alignItems: "flex-end" }}>
                                        <SText fontSize={12}>{obj?.data?.prdpoficial * obj?.cantidad}</SText>
                                    </SView>
                                </SView>
                            </>
                        }}
                    />
                    <SHr />
                    <SView col={"xs-12"} style={{ borderColor: STheme.color.gray, borderBottomWidth: 1 }} />
                    <SHr />
                    <SView col={"xs-12"} style={{ alignItems: "flex-end" }} >
                        <SText fontSize={15} color={STheme.color.text}   >{`Bs. ${total}`}</SText>

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