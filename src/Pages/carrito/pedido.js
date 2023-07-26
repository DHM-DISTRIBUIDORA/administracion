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

    getProductos() {
        let dato;
        var dataMostrar = [];
        const productos = Model.carrito.Action.getState().productos;
        if (!productos) return <SLoad />
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
        return <>
            <SPage footer={this.footer()}>
                <Container>
                    <SText>Pedidos</SText>

                    <SHr height={15} />
                    {this.getProductos()}
                    <SHr height={45} />
                    <PButtom primary
                        onPress={() => {
                            // this.form.submit();
                            SNavigation.navigate('/carrito')
                        }} >ACEPTAR</PButtom>
                    <SHr height={30} />
                </Container>
            </SPage>
            <Carrito.Float bottom={100} />
        </>
    }

    footer() {
        return <BottomNavigator url={"/carrito/pedido"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);