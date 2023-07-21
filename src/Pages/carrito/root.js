import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { BottomNavigator, Carrito, Container } from '../../Components';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress = ({ idcli, nit }) => {
        SSocket.sendPromise({
            component: "tbven",
            type: "generarNotaEntrega",
            estado: "cargando",
            data: {
                idcli: idcli,
                vnit: nit,
                vdet: "VENTA DESDE APP SERVISOFTS",
                productos: [
                    { idprd: 349, vdcan: 1, vdpre: 4.00, vdunid: "BOLSA" },
                    { idprd: 348, vdcan: 2, vdpre: 16.00, vdunid: "BOLSA" },
                ]
            },
            usumod: "SERVISOFTS",

        }).then(e => {

        }).catch(e => {
            console.error(e);
        })
    }
    render() {
        return <SPage  footer={this.footer()}>
            <Container>
                <SText>Carrito</SText>
                <SForm inputs={{
                    "idcli": { type: "number", label: "Codigo de cliente", defaultValue: 2683 },
                    "nit": { type: "text", label: "CI / NIT", defaultValue: "6392496" },
                }}
                    onSubmitName={"ENVIAR"}
                    onSubmit={this.handlePress}
                />
                <SHr height={15} />
                <Carrito.Detalle />
            </Container>
        </SPage>
    }

    footer() {
        return <BottomNavigator url={"/carrito"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);