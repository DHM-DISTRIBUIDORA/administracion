import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SInput, SLoad, SNavigation, SPage, SPopup, SStorage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { BottomNavigator, Carrito, Container, PButtom } from '../../Components';
import Model from '../../Model';


class index extends Component {
    state = {
        client: {}
    };
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        SStorage.getItem("tbcli_a_comprar", resp => {
            if (!resp) return;
            try {
                const clidata = JSON.parse(resp);
                this.setState({
                    client: clidata
                })
            } catch (e) {
                console.error(e);
            }
        })
    }

    handlePressPedido = (client) => {
        // nit: this.state.client.clinit
        const { idcli, clinit } = client;
        if (this.state.loading) return;
        this.setState({ loading: true, error: "" })
        const productos = Model.carrito.Action.getState().productos;
        let dataProducto = []
        Object.keys(productos).map((key, index) => {
            const prd = productos[key].data;
            dataProducto.push({
                idprd: prd.idprd,
                vdcan: productos[key].cantidad,
                prdcod: prd.prdcod,
                vdpre: prd.prdpoficial,
                vdunid: prd.prdunid,
            })
        });
        SSocket.sendPromise({
            component: "dm_cabfac",
            type: "registro",
            estado: "cargando",
            data: {
                idcli: idcli,
                vnit: clinit,
                vdet: "VENTA DESDE APP SERVISOFTS",
                productos: dataProducto
            },
            usumod: "SERVISOFTS",

        }, 1000 * 60).then(e => {
            this.setState({ loading: false, error: "" })
            // Model.carrito.Action.removeAll()
            // SNavigation.replace("/carrito/notaventa", { idven: e.data.idven })
            SNavigation.replace("/dm_cabfac/recibo", {
                pk: e?.data?.idven,
                onBack: () => {
                    SNavigation.replace("/tbemp/profile", { pk: Model.usuario.Action.getUsuarioLog().idvendedor })
                }
            })
            // SNavigation.replace("/tbven/recibo", { pk: e.data.idven })

            // SPopup.alert("¡Pedido Exitoso!")
            // SNavigation.navigate('/public');
        }).catch(e => {
            this.setState({ loading: false, error: e.error })
            console.error(e);
        })
    }
    handlePress = (client) => {
        // nit: this.state.client.clinit
        const { idcli, clinit } = client;
        if (this.state.loading) return;
        this.setState({ loading: true, error: "" })
        const productos = Model.carrito.Action.getState().productos;
        let dataProducto = []
        Object.keys(productos).map((key, index) => {
            dataProducto.push({
                idprd: productos[key].data.idprd,
                vdcan: productos[key].cantidad,
                vdpre: productos[key].data.prdpoficial,
                vdunid: productos[key].data.prdunid,
            })
        });
        SSocket.sendPromise({
            component: "tbven",
            type: "generarNotaEntrega",
            estado: "cargando",
            data: {
                idcli: idcli,
                vnit: clinit,
                vdet: "VENTA DESDE APP SERVISOFTS",
                productos: [
                    ...dataProducto
                ]
            },
            usumod: "SERVISOFTS",

        }, 1000 * 60).then(e => {
            this.setState({ loading: false, error: "" })
            Model.carrito.Action.removeAll()
            // SNavigation.replace("/carrito/notaventa", { idven: e.data.idven })
            SNavigation.replace("/tbven/recibo", { pk: e.data.idven })

            // SPopup.alert("¡Pedido Exitoso!")
            // SNavigation.navigate('/public');
        }).catch(e => {
            this.setState({ loading: false, error: e.error })
            console.error(e);
        })
    }
    render() {
        return <SPage footer={this.footer()}>
            <Container>
                <SText>Carrito</SText>
                <SHr />
                <SText col={"xs-12"} bold fontSize={16}>{this.state?.client?.clinom}</SText>
                <SInput label="CI/NIT" value={this.state?.client?.clinit} onChangeText={(val) => {
                    this.state.client.clinit = val;
                }} />
                <SHr height={15} />
                <Carrito.Detalle />
                <SHr height={45} />

                <SText color={STheme.color.danger}>{this.state.error}</SText>
                <SHr />
                {/* <PButtom primary
                    loading={this.state.loading}
                    onPress={() => {
                        this.handlePress(this.state?.client)

                    }} >VENTA</PButtom>
                <SHr h={50} /> */}
                <PButtom primary
                    loading={this.state.loading}
                    onPress={() => {
                        this.handlePressPedido(this.state?.client)

                    }} >REALIZAR PEDIDO</PButtom>
            </Container>

        </SPage>
    }

    footer() {
        return <BottomNavigator url={"/carrito/pedido"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);