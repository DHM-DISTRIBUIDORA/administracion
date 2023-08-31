import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView, SLoad } from 'servisofts-component';
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
            visible: "hidden",
            isVisible: false,
        };
    }

    componentDidMount() {
        // Mostrar el View durante 4 segundos
        if (!this.state.isVisible) {
            this.timer = setTimeout(() => {
                this.setState({ isVisible: false });
            }, 5000);
        }

    }

    componentWillUnmount() {
        // Limpiar el temporizador cuando el componente se desmonte
        clearTimeout(this.timer);
    }





    handleAddCarrito = () => {

        console.log("mostrar? " + this.state.isVisible)
        if (this.state.isVisible) {
            // this.timer = setTimeout(() => {
            //     this.setState({ isVisible: true });
            // }, 5000);
            console.log("VER BLOQUE")
            // this.componentDidMount()
        } else {
            this.timer = setTimeout(() => {
                this.setState({ isVisible: true });
                console.log("OCULTAR BLOQUE")
            });
        }

        console.log("mostrar??? " + this.state.isVisible)


        // if (this.state.visible == "visible") {
        this.setState({ count: this.state.count + 1 })
        this.setState({ visible: "visible" })
        console.log("Cantidad: " + this.state.count);
        console.log("visible: " + this.state.visible);
        let productos = Model.carrito.Action.getState().productos;
        Object.assign(productos, { [this.props.data.idprd]: { cantidad: this.state.count, data: this.props.data } });
        Model.carrito.Action.setState({ productos });

        this.componentDidMount()
        // }

    }
    render() {
        const { isVisible } = this.state.isVisible
        var { prdpoficial, stock, prdunid, catcod, idalm, prdnom, prdcod, prdcxu, idprd } = this.props.data;
        const productos = Model.carrito.Action.getState().productos ?? {};
        if (!productos) return <SLoad />
        let incar = productos[idprd];
        console.log("cantidad now: " + incar?.cantidad)
        // this.state.count = incar?.cantidad;
        // this.setState({count: incar?.cantidad})
        console.log("visible prueba:" + this.state.isVisible)
        return <SView col={"xs-12"} card center padding={8}>

            {/* <SView flex row col={"xs-12"}>
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
                        backgroundColor:"#ffffff50"
                    }}
                    /> 
                </SView>
            </SView> */}
            <SHr />
            <SHr />
            <SView col={"xs-12"} row style={{ justifyContent: "flex-end" }}>
                {/* <SView flex height style={{ justifyContent: "flex-end" }}>
                    <SText fontSize={16}>Bs.{SMath.formatMoney(prdpoficial, 2)}</SText>
                </SView> */}
                {
                    (this.state.isVisible)
                        // ((incar?.cantidad > 0) && (this.state.visible == "visible") )
                        // (incar?.cantidad > 0)
                        ?
                        <SView style={{
                            position: "absolute",
                            right: 0,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: STheme.color.text,
                            width: 150,
                            backgroundColor: STheme.color.white,
                            zIndex: 99,
                            visibility: this.state.visible
                        }}
                            row
                        >
                            <SView width={30} height={30} card center >
                                <SText fontSize={15} bold >{incar?.cantidad}</SText>
                            </SView>
                            <SView width={30} height={30} card center onPress={this.handleAddCarrito}>
                                <SText fontSize={23} bold >{"+"}</SText>
                            </SView>
                        </SView>
                        :
                        <SView />
                }
                <SView width={30} height={30} card center onPress={this.handleAddCarrito}
                    style={{
                        backgroundColor: (incar?.cantidad > 0 ? STheme.color.text : STheme.color.card)
                    }}
                >
                    {incar?.cantidad > 0 ? <SText fontSize={16} bold color={STheme.color.background} >{incar?.cantidad}</SText> : <SText fontSize={23} bold >{"+"}</SText>}
                </SView >
                {/* {this.state.isVisible ? 
                    <SView width={30} height={30}>
                        <SText>Este es el View visible durante 4 segundos</SText>
                    </SView>
                    :  <SText>no ono</SText>
                } */}

            </SView>



        </SView>
    }
}