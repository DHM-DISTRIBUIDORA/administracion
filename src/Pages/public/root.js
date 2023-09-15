import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SView, SLoad, STheme, SImage, SIcon, SNavigation, SList, SMath, SStorage } from 'servisofts-component';
import { Banner, BottomNavigator, Container, Producto, TopBar, } from '../../Components';
import Model from '../../Model';
import { FlatList } from 'react-native';
class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    recibirItems = ({ tbprd }) => {
        let productos = Model.carrito.Action.getState().productos;
        Object.assign(productos, tbprd);
        // console.log(productos);
        Model.carrito.Action.setState({ productos });
    };
    renderProductos() {
        var productos = Model.tbprd.Action.getAllSimple();
        if (!productos) return <SLoad />
        return <SList
            data={productos}
            limit={30}
            buscador
            order={[{ key: "stock", order: "desc" }]}
            // filter={}
            render={obj => <Producto.Card 
            // render={obj => <Producto.Cantidad
                col={"xs-12"}
                width={0}
                data={obj}

            />} />
    }
    render() {
        return <SPage navBar={this.navBar()} footer={this.footer()}>
            <Container>
                {this.renderProductos()}
            </Container>
        </SPage >
    }

    navBar() {
        return <TopBar  url={"/pedidos"}  />
    }

    footer() {
        return <BottomNavigator url={"/public"} />
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);

