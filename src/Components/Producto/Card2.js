import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PButtomSmall from '../PButtomSmall';
import Model from '../../Model';
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
                    borderColor: !active ? "#D20C0C" : STheme.color.card
                }}
            >

                <SView col={"xs-3"} height={105}>
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
                            backgroundColor:"#ffffff50"

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
                        <SView col={"xs-7"} row center>
                            <SView center width={45} height={45} style={{ borderRadius: 4, borderColor: "#E2E2E2", borderWidth: 1 }}
                                onPress={() => {
                                    if (this.state.count <= 0) return;
                                    // this.setState({ count: this.state.count - 1 });

                                    this.state.count = this.state.count - 1
                                    this.enviarDatosItems()
                                }}
                                backgroundColor={STheme.color.card}
                            >
                                <SIcon name='Menos' height={4} />
                            </SView>
                            <SView row  >
                                <SView width={10} />
                                <SText fontSize={16}>{this.state?.count ? this.state.count : this.props?.data?.cantidad}</SText>
                                {/* <SText fontSize={16}>{this.props?.data?.cantidad}</SText> */}
                                <SView width={10} />
                            </SView>
                            <SView center width={45} height={45} style={{ borderRadius: 4, borderColor: "#E2E2E2", borderWidth: 1 }}
                                onPress={() => {
                                    if (this.state.count >= stock) return;
                                    this.state.count = this.state.count + 1
                                    this.enviarDatosItems()
                                }}
                                backgroundColor={STheme.color.card}
                            >
                                <SIcon name='Mas' height={18} />
                            </SView>
                        </SView>
                        <SView col={"xs-5"} style={{ alignItems: "flex-end" }}>
                            <SText fontSize={18} bold>Bs. {SMath.formatMoney(prdpoficial)}</SText>
                            <SHr />
                            {/* {this.state.count >= 1 ? <PButtomSmall fontSize={13}
                                onPress={this.enviarDatosItems}
                            >Añadir
                            </PButtomSmall> : <SView height={24} />} */}
                        </SView>
                    </SView>
                </SView>
                <SView height={25} width={25}
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8
                    }}
                    onPress={() => {
                        const productos = Model.carrito.Action.removeItem(idprd)
                    }}
                >
                    <SIcon name='Delete2' height={18} fill={STheme.color.text} />
                    {/* <SText>ELIMINAR</SText> */}
                </SView>
            </SView>
        );
    }
}
export default (index);