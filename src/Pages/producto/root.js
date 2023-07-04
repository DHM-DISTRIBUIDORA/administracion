import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SPopup } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { AccentBar, BottomNavigator, Container, PButtom, Producto } from '../../Components';
// import usuario_dato from '../../Model/tapeke/usuario_dato';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: {}
        }

    };


    load_data() {
        this.data = Model.usuario.Action.getUsuarioLog();
        return this.data;
    }
    getProductos() {
        return (
            <>
                {/* <SList
                    initSpace={8}
                    flex
                    data={this.state.productos}
                    limit={10}
                    render={(obj) => {
                        return <Producto.Card col={"xs-12"} width={0} data={obj} onPress={(data) => {
                            SNavigation.navigate("/producto", { pk: data.key })
                        }} />
                    }}
                /> */}
                <Producto.Card col={"xs-12"} width={0} data={this.state.productos} onPress={(data) => {
                    SNavigation.navigate("/producto", { pk: data.key })
                }} />
                <SHr/>
                <Producto.Card col={"xs-12"} width={0} data={this.state.productos} onPress={(data) => {
                    SNavigation.navigate("/producto", { pk: data.key })
                }} />
            </>
        )
    }



    render() {
        return (<SPage title={'PRODUCTOS'} onRefresh={(callback) => {

        }} 
        footer={this.footer()}
        >
            <Container center>
                {/* <SView height={80}></SView> */}
                <SHr height={20} />
                {this.getProductos()}
                <SView height={10}></SView>
                <PButtom fontSize={20} onPress={() => {
                    SNavigation.navigate("/perfil/editar", { key: this.data.key });
                }}>CONTINUAR</PButtom>
                <SView height={30}></SView>
            </Container>
        </SPage>
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