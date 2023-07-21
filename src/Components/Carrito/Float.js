import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView ,SNavigation} from 'servisofts-component';
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
            // items: 0,
            // total: 0
        };
    }


    render() {
        // var total = 100;

        const productos = Model.carrito.Action.getState().productos;
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
                    //borderTopRightRadius: 15,
                    //borderBottomRightRadius: 15,
                }}
                    onPress={() => {
                        // this.props.navigation.navigate('farmacia/carrito');
                        SNavigation.navigate("/carrito")
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
                        <SText fontSize={12} color={STheme.color.white}   >{`Bs. ${this.props.total}`}</SText>
                        <SText fontSize={12} color={STheme.color.white} bold >{productos.length} items</SText>
                    </SView>
                </SView>
                {/* <SView style={{ position: "absolute", top: distancia }}>
                    <SIcon name='Cola' height={10} width={10} fill={STheme.color.primary + "50"} />
                </SView> */}
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);