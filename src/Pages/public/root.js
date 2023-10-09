import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SView, SLoad, STheme, SImage, SIcon, SNavigation, SList, SMath, SStorage, SThread } from 'servisofts-component';
import { Banner, BottomNavigator, Container, Producto, TopBar, } from '../../Components';
import Model from '../../Model';
import { FlatList } from 'react-native';
class index extends Component {

    state = {
        load: false
    }

    componentDidMount() {
        new SThread(10, "load").start(() => {
            this.setState({ load: true })
        })
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
    renderContainer() {
        return <Container>
            {this.renderProductos()}
            <SHr height={20} />
        </Container>
    }
    render() {
        return <SPage navBar={this.navBar()} footer={this.footer()}>
            {this.state.load ? this.renderContainer() : <SLoad />}
        </SPage >
    }

    navBar() {
        return <TopBar url={"/pedidos"} type='menu' />
    }

    footer() {
        return <BottomNavigator url={"/public"} />
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);

