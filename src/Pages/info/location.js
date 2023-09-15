import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SList, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { BottomNavigator, Carrito, Container, PButtom, Producto } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    recibirItems = ({ tbprd }) => {
        let productos = Model.carrito.Action.getState().productos;
        Object.assign(productos, tbprd);

        Model.carrito.Action.setState({ productos });
        // this.setState({ items: this.state.items + datos.items })
        // this.setState({ total: this.state.total + datos.precio })
    };
    getLocation() {
        return <SView col={"xs-12"} height>
            <SHr height={30} />
            <SView col={"xs-12"} center flex style={{ backgroundColor: STheme.color.primary, borderRadius: 12 }}>
                <SView col={"xs-12"} row center   >
                    <SView col={"xs-11"} border={'transparent'}  >
                        <SHr height={20} />
                        <SText fontSize={22} color={STheme.color.white} bold center>AUTORIZAR TU UBICACIÓN</SText>
                        <SHr height={20} />
                        <SText fontSize={16} color={STheme.color.white} center   >DHM recopila datos de ubicación para habilitar el seguimiento de actividad física incluso cuando la aplicación está cerrada o no está en uso.</SText>
                    </SView>
                </SView>
                <SView col={"xs-11"} center height={230} style={{ overflow: 'hidden' }}>
                    <SHr height={10} />
                    <SIcon name="IconLocation" height={180} fill={STheme.color.white}/>
                </SView>
                <SView col={"xs-12"} row center   >
                    <SView col={"xs-10"} border={'transparent'} center>
                        <SHr height={20} />
                        <PButtom fontSize={20} width={"100%"} height={50} bold withe center onPress={() => {
                            SNavigation.replace("/public")
                        }} >ACEPTAR</PButtom>
                    </SView>
                    <SHr height={30} />
                </SView>
            </SView>
            <SHr height={30} />
        </SView>
    }


    render() {
        return <>
            <SPage footer={this.footer()}  >
                <Container flex  >
                    {this.getLocation()}
                </Container>
            </SPage>
        </>
    }

    footer() {
        return <BottomNavigator url={"/"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);