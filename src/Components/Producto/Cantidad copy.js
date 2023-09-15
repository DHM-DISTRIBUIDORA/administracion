import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView, SLoad, SThread } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PButtomSmall from '../PButtomSmall';
import Background from 'servisofts-component/img/Background';
import Model from '../../Model';
export type CantidadPropsType = {
    data: any,
    onPress?: (obj) => {},
    onSelect?: (itm) => any
}
export default class index extends Component<CantidadPropsType> {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            isVisible: false,
            bandera: false,
        };
    }

    componentDidMount() {
        if (!this.state.isVisible) {
            this.timer = setTimeout(() => {
                this.setState({ isVisible: false });
            }, 5000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleMostrarBloque = () => {
        console.log("handleMostrarBloque")
        console.log("handleMostrarBloque " + this.state?.count)

        this.setState({ isVisible: true });

        this.pushCars()
    }

    pushCars() {
        console.log("holaaa")
        let productos = Model.carrito.Action.getState().productos;
        Object.assign(productos, { [this.props.data.idprd]: { cantidad: this.state?.count, data: this.props.data } });
        Model.carrito.Action.setState({ productos });
        this.componentDidMount()
    }

    handleAddCarrito = () => {
        if (!this.state.isVisible) {
            this.setState({ isVisible: true });
            console.log("OCULTAR BLOQUE CARRITO")
        }

        console.log("handleAddCarrito")
        // this.setState({ count: this.state?.count + 1 })
        this.state.count = this.state.count + 1

        console.log("Cantidad: " + this.state?.count);

        this.pushCars();
    }

    handleDeleteCarrito = () => {
        if (!this.state.isVisible) {
            this.setState({ isVisible: true });
            console.log("OCULTAR BLOQUE CARRITO")
        }

        console.log("handleAddCarrito")
        // this.setState({ count: this.state?.count - 1 })
        this.state.count = this.state.count - 1

        console.log("Cantidad: " + this.state?.count);

        this.pushCars();

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

    render() {
        var { prdpoficial, stock, prdunid, catcod, idalm, prdnom, prdcod, prdcxu, idprd } = this.props.data;
        const productos = Model.carrito.Action.getState().productos ?? {};
        if (!productos) return <SLoad />
        let incar = productos[idprd];
        return <SView col={"xs-12"} card center padding={8} >
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
            <SView col={"xs-12"} row style={{ justifyContent: "flex-end" }} >
                {
                    (this.state.isVisible)
                        ?
                        <SView style={{
                            position: "absolute",
                            right: 0,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: STheme.color.text,
                            width: 130,
                            backgroundColor: STheme.color.white,
                            zIndex: 99,
                            height: 40
                        }}
                            row
                            center
                        >
                            {(incar?.cantidad == 1) ?
                                <SView width={30} height={30} card center
                                    onPress={() => {
                                        Model.carrito.Action.removeItem(idprd);
                                        this.setState({ isVisible: false });

                                    }}
                                    style={{
                                        backgroundColor: STheme.color.lightGray + "50"
                                    }}
                                >
                                    <SIcon name='Delete3' width={15} height={15} />
                                </SView>
                                :
                                <SView width={30} height={30} card center onPress={this.handleDeleteCarrito}
                                    style={{
                                        backgroundColor: STheme.color.lightGray + "50"
                                    }}
                                >
                                    <SText fontSize={23} bold color={STheme.color.black} >{"-"}</SText>
                                </SView>
                            }
                            <SView width={30} height={30} center >
                                <SText fontSize={15} bold color={STheme.color.black}>{incar?.cantidad}</SText>
                            </SView>
                            <SView width={30} height={30} card center onPress={this.handleAddCarrito}
                                style={{
                                    backgroundColor: STheme.color.lightGray + "50"
                                }}
                            >
                                <SText fontSize={23} bold color={STheme.color.black} >{"+"}</SText>
                            </SView>
                        </SView>
                        :
                        <SView />
                }
                <SView width={30} height={30} card center onPress={this.handleMostrarBloque}
                    style={{
                        backgroundColor: (incar?.cantidad > 0 ? STheme.color.text : STheme.color.card)
                    }}
                >
                    {incar?.cantidad > 0 ? <SText fontSize={16} bold color={STheme.color.background} >{incar?.cantidad}</SText> : <SText fontSize={23} bold >{"+"}</SText>}
                </SView >
            </SView>
        </SView>
    }
}