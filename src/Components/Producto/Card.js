import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PButtomSmall from '../PButtomSmall';
import Background from 'servisofts-component/img/Background';
import Model from '../../Model';
import Cantidad from './Cantidad';
export type ProductoCardPropsType = {
    data: any,
    onPress?: (obj) => {},
    onSelect?: (itm) => any
}
export default class index extends Component<ProductoCardPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    Cantidad = () => {
        return <SView col={"xs-7"} row center>
            <SView center width={45} height={45} style={{ borderRadius: 17, borderColor: "#E2E2E2", borderWidth: 1 }}
                onPress={() => {
                    if (this.state.count <= 0) return;
                    this.setState({ count: this.state.count - 1 });
                }}
                backgroundColor={STheme.color.white}
            >
                <SIcon name='Menos' height={4} />
            </SView>
            <SView row  >
                <SView width={10} />
                <SText fontSize={16}>{this.state?.count ? this.state.count : 0}</SText>
                <SView width={10} />
            </SView>
            <SView center width={45} height={45} style={{ borderRadius: 17, borderColor: "#E2E2E2", borderWidth: 1 }}
                onPress={() => {
                    if (this.state.count >= stock) return;
                    this.setState({ count: this.state.count + 1 })
                }}
                backgroundColor={STheme.color.white}
            >
                <SIcon name='Mas' height={18} />
            </SView>
        </SView>
    }

    renderDetalle() {
        var { prdpoficial, stock, prdunid, catcod, idalm, prdnom, prdcod, prdcxu, idprd } = this.props.data;

        return <SView col={"xs-12"} row>
            <SText fontSize={11} color={STheme.color.gray}>Stock: {stock} </SText>
            <SView width={5}><SText fontSize={11}>|</SText></SView>
            <SText fontSize={11} color={STheme.color.gray}> Ud: {prdunid} </SText>
            <SView width={5}><SText fontSize={11}>|</SText></SView>
            <SText fontSize={11} color={STheme.color.gray}> UxC: {prdcxu}</SText>
        </SView>
    }

    // handleAddCarrito = () => {
    //     let productos = Model.carrito.Action.getState().productos;
    //     Object.assign(productos, { [this.props.data.idprd]: { cantidad: 1, data: this.props.data } });
    //     // console.log(productos);
    //     Model.carrito.Action.setState({ productos });
    // }
    render() {
        var { prdpoficial, stock, prdunid, catcod, idalm, prdnom, prdcod, prdcxu, idprd } = this.props.data;
        const productos = Model.carrito.Action.getState().productos ?? {};
        let incar = productos[idprd];
        return <SView col={"xs-12"} card center padding={8}>

            <SView flex row col={"xs-12"}>
                <SView flex >
                    <SText fontSize={16} bold>{prdnom}</SText>
                    {this.renderDetalle()}
                </SView>
                <SView width={8} />
                <SView width={80} height={80} card>
                    <SImage src={require('../../Assets/img/foto.png')}
                        style={{
                            position: "absolute",
                            zIndex: 90,
                            top: 0,
                        }}
                    />
                    <SImage enablePreview src={SSocket.api.root + "tbprd/" + idprd}
                        style={{
                            position: "absolute",
                            zIndex: 99,
                            top: 0,
                            backgroundColor: "#ffffff50"
                        }}
                    />
                </SView>
            </SView>
            <SHr />
            <SHr />
            <SView col={"xs-12"} row >
                <SView flex height style={{ justifyContent: "flex-end" }}>
                    <SText fontSize={16}>Bs.{SMath.formatMoney(prdpoficial, 2)}</SText>
                </SView>
                <Cantidad defaultValue={incar?.cantidad ?? 0}
                    limit={this.props?.data?.stock ?? 0}
                    onChange={(cant) => {

                        Object.assign(productos, { [this.props?.data?.idprd]: { cantidad: cant, data: this.props?.data } });
                        // console.log(productos);
                        if (cant <= 0) {
                            delete productos[this.props?.data?.idprd]
                        }
                        Model.carrito.Action.setState({ productos });
                    }} />

            </SView>



        </SView>
    }
}