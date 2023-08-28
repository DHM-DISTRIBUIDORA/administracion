import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView, SNavigation } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PButtomSmall from '../PButtomSmall';
import Model from '../../Model';
export type FloatPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<FloatPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const productos = Model.carrito.Action.getState().productos;
        let total = 0;
        Object.keys(productos).map((key, index) => {
            total += productos[key].data.prdpoficial * productos[key].cantidad;
        });
        var distancia = 60
        if (this.props.bottom) distancia = this.props.bottom
        return (
            <>
                <SView center row style={{
                    backgroundColor: STheme.color.primary,
                    width: 117,
                    height: 54,
                    position: "absolute",
                    bottom: distancia, right: 0,
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderWidth:1,
                    borderColor: STheme.color.white,
                    borderRightWidth:0
                }}
                    onPress={() => {
                        // this.props.navigation.navigate('farmacia/carrito');
                        SNavigation.navigate("/carrito/pedido")
                    }}

                >
                    {/* <SIcon name={'Carrito'}
                    style={{
                        width: '100%', height: '100%',
                        position: "absolute",
                    }}
                /> */}
                    <SView col={"xs-4"} center height style={{ alignItems: 'flex-end', }}>
                        <SIcon name={'Carrito2'} height={25} width={25} fill={STheme.color.white} />
                    </SView>
                    <SView col={"xs-8"} center height style={{ alignItems: 'flex-start', paddingLeft: 8 }} >
                        <SText fontSize={12} color={STheme.color.white}   >{`Bs. ${total}`}</SText>
                        <SText fontSize={12} color={STheme.color.white} bold >{Object.keys(productos).length} items</SText>
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