import { KeyboardAvoidingView, Text, TextInput, View } from 'react-native'
import React, { Component, useEffect, useRef } from 'react'
import { SHr, SIcon, SInput, SPage, SPopup, SText, STheme, SThread, SUuid, SView } from 'servisofts-component'
import { connect } from 'react-redux'
import Model from '../../Model'
import Btn from '../Btn'

class Cantidad extends Component {
    state = {
        cantidad: this.props.defaultValue ?? 0,
        open: false,
        key: SUuid()
    }


    handleEnd = () => {
        this.close = true;
        Model.carrito.Action.setItem(this.props?.data?.idprd, { cantidad: this.state.cantidad, data: this.props?.data })
        this.setState({ open: false });
        if (this.props.onChange) this.props.onChange(this.state.cantidad)
    }

    componentWillUnmount() {
        this.close = true;
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.cantidad != this.state.cantidad) return true;
        if (nextState.open != this.state.open) return true;

        const idprd = this.props.data.idprd;
        const carritonew = nextProps.state?.carritoReducer?.productos[idprd]
        if ((this.state.cantidad ?? 0) != (carritonew?.cantidad ?? 0)) {
            return true;
        }
        if ((nextState.cantidad ?? 0) != (carritonew?.cantidad ?? 0)) {
            return true;
        }
        return false;
    }
    show(cantidad) {
        this.close = false;
        if (cantidad) {
            this.setState({ cantidad: cantidad });
            // this.state.cantidad = cantidad;
        }
        this.setState({ open: true });
        new SThread(1500, "Cantidad_hilo_" + this.state.key, true).start(() => {
            if (this.close) return;
            this.handleEnd();

        })
    }

    OpenComponent = (cantidadParent) => {
        const { cantidad, open } = this.state;
        const size = 30;
        const height = 28;
        return <SView width={110} height={height + 2} style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: STheme.color.text,
            backgroundColor: STheme.color.white,
        }} row center >
            <SView width={size} height={height} card center
                onPress={() => {

                    if (this.state.cantidad - 1 <= 0) {
                        this.state.cantidad--;
                        this.handleEnd();
                        this.setState({ open: false });
                        return;
                    };
                    this.setState({ cantidad: this.state.cantidad - 1 });
                    this.show();
                }} style={{
                    backgroundColor: STheme.color.lightGray + "50"
                }}
            >
                {(cantidad <= 1) ? < SIcon name='Delete3' width={15} height={15} /> : <SText fontSize={25} center color={STheme.color.black} font='Roboto-Bold'  >{"-"}</SText>}
            </SView>
            <SView flex height={height} center onPress={() => {
                this.close = true;
                SPopup.open({
                    key: "popup_cantidad",
                    content: <PopupCantidad
                        cantidad={cantidad}
                        data={this.props.data}
                        onClose={() => {
                            this.handleEnd();
                            SPopup.close("popup_cantidad");

                        }}
                        onChange={(cantidad) => {
                            this.state.cantidad = parseInt(cantidad);
                            this.handleEnd();
                            SPopup.close("popup_cantidad");
                        }}
                    />,

                })
            }} >
                <SText fontSize={15} bold color={STheme.color.black}>{cantidad}</SText>
            </SView>
            <SView width={size} height={height} card center
                onPress={() => {
                    if (this.props.limit) {
                        if (this.props.limit <= this.state.cantidad) {
                            return;
                        }
                    }
                    this.setState({ cantidad: this.state.cantidad + 1 })
                    // this.state.cantidad++;
                    this.show()
                }}
                style={{
                    backgroundColor: STheme.color.lightGray + "50"
                }}
            >
                <SText fontSize={20} center font='Roboto-Bold' color={STheme.color.black} >{"+"}</SText>
            </SView>
        </SView >
    }
    render() {
        const { open } = this.state;
        const productos = Model.carrito.Action.getState().productos ?? {};
        let incar = productos[this.props?.data?.idprd];
        const cantidad = incar?.cantidad ?? 0

        if (open) return this.OpenComponent(cantidad)
        return (
            <SView width={30} height={30} card center style={{
                backgroundColor: (cantidad > 0 ? STheme.color.text : STheme.color.card)
            }} onPress={() => {
                if (this.state.cantidad < 1) this.state.cantidad = 1;
                this.show(cantidad)
            }}>
                {cantidad > 0 ? <SText fontSize={16} bold color={STheme.color.background} >{cantidad}</SText> : <SText fontSize={23} bold font='Roboto'  >{"+"}</SText>}
            </SView>
        )
    }
}

const PopupCantidad = ({ onClose, onChange, data, cantidad }) => {
    const inputref = useRef();
    useEffect(() => {

        return () => {
            if (onClose) onClose();
        }
    }, [])
    return <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} height={300} withoutFeedback backgroundColor={STheme.color.background} borderRadius={8} style={{ overflow: "hidden" }}>
        {SPage.backgroundComponent}

        <SView col={"xs-12"} flex padding={8} center>
            <SText bold fontSize={20}>{data?.prdnom}</SText>
            <SText>{data?.prdcod}</SText>
            <SHr h={16} />
            <SView width={150}>
                <SInput ref={inputref} type='number' defaultValue={cantidad + ""}
                    autoFocus
                    style={{
                        padding: 0,
                        margin: 0,
                        paddingStart: 0,
                        height: 40,
                        borderRadius: 4,
                        backgroundColor: STheme.color.lightGray + "30",
                        textAlign: "center",
                        color: STheme.color.text
                    }} />

            </SView>
            <SHr h={16} />
            <SView col={"xs-12"} row center>
                <Btn padding={4} type='danger' onPress={() => {
                    if (onClose()) onClose()
                }} >Cancelar</Btn>
                <SView width={50} />
                <Btn padding={4} onPress={() => {
                    let cantidad = inputref.current.getValue();
                    if (onChange) onChange(cantidad)
                }}>Aceptar</Btn>
            </SView>
            {/* <TextInput defaultValue={cantidad} style={{
                height: 40,
                borderRadius: 4,
                width: 100,
                backgroundColor: STheme.color.lightGray + "30",
                textAlign: "center",
                color: STheme.color.text
            }}
                keyboardType={"numeric"}
                inputMode={"numeric"}
                onChangeText={(val) => {

                }}
            /> */}
        </SView>

    </SView>
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Cantidad);