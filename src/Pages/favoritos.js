import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SList, SPage, SText, SView , SLoad} from 'servisofts-component';
import { BottomNavigator, Container, Producto } from '../Components';
import Model from '../Model';

class index extends Component {

    renderProductos() {
        var productos = Model.tbprd.Action.getAllSimple();
        if (!productos) return <SLoad />
        return <SList
            data={productos}
            limit={10}
            buscador
            order={[{ key: "stock", order: "desc" }]}
            render={obj => <Producto.Cantidad
                col={"xs-12"}
                width={0}
                data={obj}
                
            />} />
    }
    render() {
        return <SPage
            hidden
            footer={this.footer()}
        >
            <SView col={"xs-12"}>
                <SText >Holaa!! soy el favoritos</SText>
                <Container>
                    {this.renderProductos()}
                </Container>
                {/* <Producto.Cantidad /> */}
            </SView>
        </SPage>
    }

    footer() {
        return <BottomNavigator url={"/favoritos"} />
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);