import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SInput, SMath, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { TextInput } from 'react-native';
import Cantidad from './Cantidad';
export type ProductoCard2PropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<ProductoCard2PropsType> {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.data.cantidad,
        };
    }

    enviarDatosItems = () => {
        const datos = {
            // tbprd: this.props.data,
            tbprd: { [this.props.data.data.idprd]: { cantidad: this.state.count, data: this.props.data.data } },
            items: this.state.count,
            precio: this.props.data.data.prdpoficial,
        };
        this.props.items(datos);
    };

    render() {
        var active = true;

        var { prdpoficial, stock, prdunid, catcod, idalm, prdnom, prdcod, prdcxu, idprd } = this.props.data.data;
        (stock <= 0) ? active = false : active = true;

        return (
            <SView col={"xs-12"} card row {...this.props}
                // pointerEvents={!active ? 'none' : 'auto'}
                style={{
                    borderRadius: 4,
                    borderWidth: 1,
                    padding: 10,
                    opacity: active ? 1 : 0.6,
                    borderColor: !active ? "#D20C0C" : STheme.color.card,
                    alignItems: "center"
                }}
            >

                <SView col={"xs-3"} height={70}>
                    <SImage src={require('../../Assets/img/foto.png')}
                        style={{
                            resizeMode: "contain",
                            position: "absolute",
                            zIndex: 90,
                            top: 0,
                        }}
                    />
                    <SImage enablePreview src={SSocket.api.root + "tbprd/" + idprd}
                        style={{
                            resizeMode: "contain",
                            borderRadius: 4,
                            overflow: "hidden",
                            position: "absolute",
                            zIndex: 99,
                            top: 0,

                        }}
                    />
                </SView>
                <SView col={"xs-0.5"}></SView>
                <SView col={"xs-8.5"}>
                    <SView col={"xs-11"}>
                        <SText fontSize={16}>{prdnom}</SText>
                    </SView>
                    <SView col={"xs-12"} row>
                        <SText fontSize={11} color={STheme.color.gray}>Stock: {stock} </SText>
                        <SView width={5}><SText fontSize={11}>|</SText></SView>
                        <SText fontSize={11} color={STheme.color.gray}> Ud: {prdunid} </SText>
                        <SView width={5}><SText fontSize={11}>|</SText></SView>
                        <SText fontSize={11} color={STheme.color.gray}> UxC: {prdcxu}</SText>
                    </SView>

                    <SHr />
                    <SView row>

                        <SView flex style={{  }}>
                            <SText fontSize={18} bold>Bs. {SMath.formatMoney(prdpoficial)}</SText>
                            <SHr />
                            {/* {this.state.count >= 1 ? <PButtomSmall fontSize={13}
                                onPress={this.enviarDatosItems}
                            >Añadir
                            </PButtomSmall> : <SView height={24} />} */}
                        </SView>
                        <Cantidad
                            data={this.props.data.data}
                        />
                    </SView>
                </SView>
                <SView height={25} width={25}
                    style={{
                        position: "absolute",
                        top: 4,
                        right: 0
                    }}
                    onPress={() => {
                        const productos = Model.carrito.Action.removeItem(idprd)
                    }}
                >
                    <SIcon name='Delete2' height={12} fill={STheme.color.gray} />
                    {/* <SText>ELIMINAR</SText> */}
                </SView>
            </SView>
        );
    }
}
export default (index);