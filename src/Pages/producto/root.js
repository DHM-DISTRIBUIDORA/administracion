import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SPopup } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { AccentBar, BottomNavigator, Carrito, Container, PButtom, Producto } from '../../Components';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: {},
            items: 0,
            total: 0
        }
        this.params = SNavigation.getAllParams();

    };

    recibirItems = ({ tbprd }) => {
        let productos = Model.carrito.Action.getState().productos;
        Object.assign(productos, tbprd);
        console.log(productos);
        Model.carrito.Action.setState({ productos });
    };

    load_data() {
        this.data = Model.usuario.Action.getUsuarioLog();
        return this.data;

    }

    sinProductos() {
        return <>
            <SView col={"xs-12"}  >
                <SHr height={30} />
                <SView col={"xs-12"} center height style={{ backgroundColor: STheme.color.primary, borderRadius: 12 }}>
                    <SView col={"xs-12"} row center   >
                        <SView col={"xs-11"} border={'transparent'}  >
                            <SHr height={20} />
                            <SText fontSize={22} color={STheme.color.white} bold center>NO HAY PRODUCTOS DISPONIBLES</SText>
                            <SHr height={20} />
                            <SText fontSize={18} color={STheme.color.white} center   >Lamentablemente no hay productos para mostrar en esta categoría</SText>
                        </SView>
                    </SView>
                    <SView col={"xs-11"} center height={230} style={{ overflow: 'hidden' }}>
                        <SHr height={20} />
                        <SIcon name="MProductos" height={170}></SIcon >
                    </SView>
                    <SView col={"xs-12"} row center   >
                        <SView col={"xs-10"} border={'transparent'} center>
                            <SHr height={20} />
                            <PButtom fontSize={20} width={"100%"} height={50} bold withe center onPress={() => {
                                SNavigation.navigate("/public/explorar")
                            }} >BUSCAR OTROSs</PButtom>
                        </SView>
                        <SHr height={30} />
                    </SView>
                </SView>
                <SHr height={30} />
            </SView>
        </>
    }
    getProductos() {
        let dato;
        var dataMostrar = [];
        var productos = Model.tbprd.Action.getAllSimple();
        if (!productos) return <SLoad />

        var objFinal = Object.values(productos).filter((a) => this.params.pk == a.idlinea)
        if (Object.keys(objFinal).length === 0) return this.sinProductos();
        return (
            <>
                <SHr height={20} />
                <SList
                    buscador
                    initSpace={8}
                    flex
                    data={objFinal}
                    filter={(a) => a.idlinea == this.params.pk}

                    limit={10}
                    render={(obj) => {
                        return <Producto.Card col={"xs-12"} width={0} data={obj}
                            items={this.recibirItems} total={this.state.total}
                        // onPress={(data) => {
                        //     SNavigation.navigate("/producto", { pk: data.key })
                        // }} 
                        />
                    }}
                />
                <SHr height={30} />
            </>
        )
    }

    render() {
        return (<>
            <SPage title={'PRODUCTOS'} onRefresh={(callback) => {
            }}
                footer={this.footer()}
            >
                <Container center>

                    {this.getProductos()}
                </Container>
            </SPage>
        </>
        );
    }

    footer() {
        return <BottomNavigator url={"/explorar"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);