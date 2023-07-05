import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native'
import { SHr, SPage, SText, SView, SLoad, STheme, SImage, SIcon, SNavigation, SButtom } from 'servisofts-component';
import { Banner, BottomNavigator, Container, TopBar, } from '../Components';
import Model from '../Model';
import SSocket from 'servisofts-socket'
class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }



    hanldeRequest_categorias() {
        SSocket.sendPromise({
            component: "dhm",
            type: "getCategorias"
        }).then((resp) => {
            console.log(resp);
        }).catch(e => {
            console.error(e);
        })
    }
    hanldeRequest_productos() {
        SSocket.sendPromise({
            component: "dhm",
            type: "getProductos"
        }).then((resp) => {
            console.log(resp);
        }).catch(e => {
            console.error(e);
        })
    }
    hanldeRequest_clientes() {
        SSocket.sendPromise({
            component: "dhm",
            type: "getClientes"
        }).then((resp) => {
            console.log(resp);
        }).catch(e => {
            console.error(e);
        })
    }
    hanldeRequest_zonas() {
        SSocket.sendPromise({
            component: "dhm",
            type: "getZonas"
        }).then((resp) => {
            console.log(resp);
        }).catch(e => {
            console.error(e);
        })
    }
    render() {

        return <SPage>
            <SView col={"xs-12"} row>
                <SButtom onPress={this.hanldeRequest_categorias.bind(this)}>CATEGORIAS</SButtom>
                <SButtom onPress={this.hanldeRequest_productos.bind(this)}>PRODUCTOS</SButtom>
                <SButtom onPress={this.hanldeRequest_clientes.bind(this)}>CLIENTES</SButtom>
                <SButtom onPress={this.hanldeRequest_zonas.bind(this)}>ZONAS</SButtom>
            </SView>
        </SPage>
    }


}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);