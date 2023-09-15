import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { Btn, Container } from '../../Components';
import StoreTemp from '../../StoreTemp';

export default class index extends Component {
    state = {
        idemp: "",
        productos: [],
        zonas: [],
        clientes: [],

    }
    constructor(props) {
        super(props);
        this.state.idemp = SNavigation.getParam("idemp")
    }

    componentDidMount() {
        this.loadStore();
    }

    loadStore = async () => {
        const productos = await StoreTemp.getItem("productos");
        this.state.productos = productos ?? [];
        const zonas = await StoreTemp.getItem("zonas");
        this.state.zonas = zonas ?? [];
        const clientes = await StoreTemp.getItem("clientes");
        this.state.clientes = clientes ?? [];
        this.setState({ ...this.state })
    }

    syncProductos = () => {
        SSocket.sendPromise({
            "version": "1.0",
            "component": "tbprd",
            "type": "getAllSimple",
            "estado": "cargando"
        }).then(e => {

            this.state.productos = Object.values(e.data)
            StoreTemp.setItem("productos", this.state.productos)
            this.setState({ ...this.state })
        }).catch(e => {
            console.error(e);
        })
    }
    syncZonas = () => {
        const { idemp } = this.state;
        SSocket.sendPromise({
            "version": "1.0",
            "component": "tbzon",
            "type": "getAll",
            "estado": "cargando",
            "idemp": idemp,
        }).then(e => {
            this.state.zonas = Object.values(e.data)
            StoreTemp.setItem("zonas", this.state.zonas)
            this.setState({ ...this.state })
        }).catch(e => {
            console.error(e);
        })
    }
    syncClientes = async () => {
        const { idemp } = this.state;
        SSocket.sendPromise({
            "version": "1.0",
            "component": "tbcli",
            "type": "getAll",
            "estado": "cargando",
            "cliidemp": idemp
        }).then(e => {
            this.state.clientes = Object.values(e.data)
            StoreTemp.setItem("clientes", this.state.clientes)
            this.setState({ ...this.state })
        }).catch(e => {
            console.error(e);
        })
    }

    handleIniciar = () => {
        SNavigation.navigate("/vendedor/root", { idemp: this.state.idemp })
    }
    render() {
        return <SPage title={'Sincronizacion'}>
            <Container >
                <SText>{'Para iniciar su jornada de vicitas nesecitamos sincronizar los datos.'}</SText>
                <SHr h={50} />
                <SText>{this.state.clientes.length}</SText>
                <Btn onPress={this.syncClientes.bind(this)}>{'Clientes'}</Btn>
                <SHr h={50} />
                <SText>{this.state.zonas.length}</SText>
                <Btn onPress={this.syncZonas.bind(this)}>{'zonas'}</Btn>
                <SHr h={50} />
                <SText>{this.state.productos.length}</SText>
                <Btn onPress={this.syncProductos.bind(this)}>{'Productos'}</Btn>
                <SHr h={50} />
                <Btn onPress={this.handleIniciar.bind(this)}>{'INICIAR'}</Btn>
            </Container>
        </SPage>
    }
}
// const initStates = (state) => {
//     return { state }
// };
// export default connect(initStates)(index);