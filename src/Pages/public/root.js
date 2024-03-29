import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SView, SLoad, STheme, SImage, SIcon, SNavigation, SList, SMath, SStorage, SThread, SDate } from 'servisofts-component';
import { Banner, BottomNavigator, Container, Producto, TopBar, } from '../../Components';
import Model from '../../Model';
import { FlatList } from 'react-native';
import DataBase from '../../DataBase';
import { Trigger } from 'servisofts-db';
class index extends Component {

    state = {
        load: false
    }

    componentDidMount() {
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
        try {
            var lastsync = await DataBase.sync_data.objectForPrimaryKey("tbprd")
        } catch (error) {
            // Aca nunca sincronice
            await DataBase.tbprd.sync();
            await DataBase.tbprdlin.sync();
            await DataBase.sync_data.insert({
                tbname: "tbprd",
                fecha_sync: new SDate().toString(),
            })
        }
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
            limit={30}
            buscador
            // flex
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
        return <Container flex>
            {this.renderProductos()}
            <SHr height={10} />
        </Container>
    }
    render() {
        return <SPage navBar={this.navBar()} footer={this.footer()}
            onRefresh={e => {
                this.componentDidMount();
                if (e) e()
            }}
            disableScroll
        >
            {this.renderContainer()}
        </SPage >
    }

    navBar() {
        return <TopBar url={"/pedidos"} type='menu' />
    }

    footer() {
        return <BottomNavigator url={"/public"} />
    }

}
// const initStates = (state) => {
//     return { state }
// };
// export default connect(initStates)(index);
export default (index);

