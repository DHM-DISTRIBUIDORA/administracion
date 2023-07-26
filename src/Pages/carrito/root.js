import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { BottomNavigator, Carrito, Container, PButtom } from '../../Components';
import Model from '../../Model';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress = ({ idcli, nit }) => {

        //Format data producto
        const productos = Model.carrito.Action.getState().productos;
        let total = 0;
        let dataProducto = []
        Object.keys(productos).map((key, index) => {
            // total += productos[key].data.prdpoficial * productos[key].cantidad;
            dataProducto.push({
                idprd: productos[key].data.idprd,
                vdcan: productos[key].cantidad,
                vdpre: productos[key].data.prdpoficial,
                vdunid: productos[key].data.prdunid,
            })
        });

        console.log(dataProducto);

        SSocket.sendPromise({
            component: "tbven",
            type: "generarNotaEntrega",
            estado: "cargando",
            data: {
                idcli: idcli,
                vnit: nit,
                vdet: "VENTA DESDE APP SERVISOFTS",
                // productos: [
                //     { idprd: 349, vdcan: 1, vdpre: 4.00, vdunid: "BOLSA" },
                //     { idprd: 348, vdcan: 2, vdpre: 16.00, vdunid: "BOLSA" },
                // ]
                productos: [
                    ...dataProducto
                ]
            },
            usumod: "SERVISOFTS",

        }).then(e => {
            SPopup.alert("¡Pedido Exitoso!")
        }).catch(e => {
            SPopup.alert("¡Hubo algún error!")
            console.error(e);
        })
    }
    render() {
        return <SPage footer={this.footer()}>
            <Container>
                <SText>Carrito</SText>
                <SForm 
                ref={(ref) => { this.form = ref; }}
                inputs={{
                    "idcli": { type: "number", label: "Codigo de cliente", defaultValue: 2683 },
                    "nit": { type: "text", label: "CI / NIT", defaultValue: "6392496" },
                }}
                    // onSubmitName={"ENVIAR"}
                    onSubmit={this.handlePress}
                />
                <SHr height={15} />
                <Carrito.Detalle />
                <SHr height={45} />
                <PButtom primary
                    onPress={() => {
                        this.form.submit();
                    }} >ENVIAR</PButtom>
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