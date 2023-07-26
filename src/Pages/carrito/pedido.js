import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SList, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { BottomNavigator, Carrito, Container, PButtom, Producto } from '../../Components';
import Model from '../../Model';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getProductos() {
        let dato;
        var dataMostrar = [];
        const productos = Model.carrito.Action.getState().productos;
        let total = 0;
        Object.keys(productos).map((key, index) => {
            total += productos[key].data.prdpoficial * productos[key].cantidad;
        });

        // var objFinal = Object.values(productos).filter((a) => this.params.pk == a.idlinea)
        // if (Object.keys(objFinal).length === 0) return <SText>No hay productos...</SText>;
        return (
            <>
                <SList
                    initSpace={8}
                    flex
                    data={productos}
                    // filter={(a) => a.idlinea == this.params.pk}

                    // limit={10}
                    render={(obj) => {
                        console.log(obj)
                        return <Producto.Card2 col={"xs-12"} width={0} data={obj}
                            items={this.recibirItems} total={this.state.total}
                        // onPress={(data) => {
                        //     SNavigation.navigate("/producto", { pk: data.key })
                        // }} 
                        />
                    }}
                />
            </>
        )
    }

    render() {
        return <SPage footer={this.footer()}>
            <Container>
                <SText>Pedidos</SText>

                <SHr height={15} />
                {this.getProductos()}
                <SHr height={45} />
                <PButtom primary
                    onPress={() => {
                        // this.form.submit();
                    }} >ENVIAR</PButtom>
                <SHr height={30} />
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