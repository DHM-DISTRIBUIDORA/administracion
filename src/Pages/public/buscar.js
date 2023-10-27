import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SView, SLoad, STheme, SImage, SIcon, SNavigation, SList, SMath, SStorage, SThread } from 'servisofts-component';
import { Banner, BottomNavigator, Container, Producto, TopBar, } from '../../Components';
import Model from '../../Model';
import { FlatList } from 'react-native';
import DataBase from '../../DataBase';
import { Trigger } from 'servisofts-db';
class index extends Component {

    constructor(props) {
        super(props);
        this.onSelect = SNavigation.getParam("onSelect");
    }
    state = {
        load: false
    }

    componentDidMount() {
        new SThread(100, "load").start(() => this.setState({ ready: true }))
        this.loadDataAsync();
        this.t1 = Trigger.addEventListener({
            on: ["insert", "update", "delete"],
            tables: ["tbprd"]
        }, (evt) => {
            this.loadDataAsync();
        });
    }
    componentWillUnmount() {
        Trigger.removeEventListener(this.t1);
    }

    async loadDataAsync() {
        const tbprd = await DataBase.tbprd.all();
        this.setState({ data: tbprd, load: true })
    }


    recibirItems = ({ tbprd }) => {
        let productos = Model.carrito.Action.getState().productos;
        Object.assign(productos, tbprd);
        // console.log(productos);
        Model.carrito.Action.setState({ productos });
    };
    renderProductos() {
        let productos = this.state.data;
        if (!this.state.load) return <SLoad />
        // var productos = Model.tbprd.Action.getAllSimple();
        if (!productos) return <SLoad />
        return <SList
            data={productos}
            limit={20}
            buscador
            order={[{ key: "stock", order: "desc" }]}
            // filter={}
            render={obj => <Producto.Card
                onSelect={this.onSelect}
                // render={obj => <Producto.Cantidad
                col={"xs-12"}
                width={0}
                data={obj}

            />} />
    }
    renderContainer() {
        return <Container loading={!this.state.ready}>
            {this.renderProductos()}
            <SHr height={20} />
        </Container>
    }
    render() {
        return <SPage
            onRefresh={e => {
                this.componentDidMount();
                if (e) e()
            }}
        >
            {this.renderContainer()}
        </SPage >
    }


}
// const initStates = (state) => {
//     return { state }
// };
// export default connect(initStates)(index);
export default (index);

