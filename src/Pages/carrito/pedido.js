import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SList, SLoad, SNavigation, SPage, SPopup, SText, STheme, SThread, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { BottomNavigator, Carrito, Container, PButtom, Producto } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        new SThread(10, "load").start(() => {
            this.setState({ load: true })
        })
    }
    recibirItems = ({ tbprd }) => {
        let productos = Model.carrito.Action.getState().productos;
        Object.assign(productos, tbprd);

        Model.carrito.Action.setState({ productos });
        // this.setState({ items: this.state.items + datos.items })
        // this.setState({ total: this.state.total + datos.precio })
    };
    sinPedidos() {
        return <SView col={"xs-12"} height>
            <SHr height={30} />
            <SView col={"xs-12"} center flex style={{ backgroundColor: STheme.color.primary, borderRadius: 12 }}>
                <SView col={"xs-12"} row center   >
                    <SView col={"xs-11"} border={'transparent'}  >
                        <SHr height={20} />
                        <SText fontSize={22} color={STheme.color.white} bold center> NO SE ENCONTRÓ NINGÚN PRODUCTO</SText>
                        <SHr height={20} />
                        <SText fontSize={18} color={STheme.color.white} center   >Agrega productos a tu carrito de compras.</SText>
                    </SView>
                </SView>
                <SView col={"xs-11"} center height={230} style={{ overflow: 'hidden' }}>
                    <SHr height={20} />
                    <SIcon name="MPedido" height={180}></SIcon >
                </SView>
                <SView col={"xs-12"} row center   >
                    <SView col={"xs-10"} border={'transparent'} center>
                        <SHr height={20} />
                        <PButtom fontSize={20} width={"100%"} height={50} bold withe center onPress={() => {
                            SNavigation.navigate("/public/explorar")
                        }} >COMPRAR</PButtom>
                    </SView>
                    <SHr height={30} />
                </SView>
            </SView>
            <SHr height={30} />
        </SView>
    }

    getProductos() {
        let dato;
        var dataMostrar = [];
        const productos = Model.carrito.Action.getState().productos;
        if (!productos) return <SLoad />
        if (!this.state.load) return <SLoad />
        let total = 0;
        Object.keys(productos).map((key, index) => {
            total += productos[key].data.prdpoficial * productos[key].cantidad;
        });
        if (Object.keys(productos).length === 0) return this.sinPedidos();
        return (
            <SView col={"xs-12"} flex center >
                {/* <SText>Pedidos</SText> */}
                {/* <SHr height={15} /> */}
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
                <SHr height={45} />
                <PButtom primary
                    onPress={() => {
                        // this.form.submit();
                        SNavigation.navigate('/carrito')
                    }} >ACEPTAR</PButtom>
                <SHr height={10} />
                <PButtom secondary
                    onPress={() => {
                        Model.carrito.Action.removeAll()
                        SNavigation.replace('/public')
                    }} >ELIMINAR PEDIDOS</PButtom>
                <SHr height={30} />

            </SView>
        )
    }

    render() {
        return <>
            <SPage footer={this.footer()} title={"Carrito"} >
                <Container flex  >
                    {this.getProductos()}
                </Container>
            </SPage>
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