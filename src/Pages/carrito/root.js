import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SForm, SHr, SIcon, SInput, SLoad, SNavigation, SPage, SPopup, SStorage, SText, STheme, SUuid, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { BottomNavigator, Carrito, Container, PButtom } from '../../Components';
import Model from '../../Model';
import DataBase from '../../DataBase';


class index extends Component {
    state = {
        client: {}
    };
    constructor(props) {
        super(props);
        this.state = {
            detalle: "",
        }

    }
    componentDidMount() {
        const cliente = Model.tbcli.Action.getCliente();
        if (cliente) {
            this.setState({
                client: cliente
            })
            return;
        }
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

    handlePressPedido = async (tbcli) => {
        if (this.state.loading) return;
        // console.error(client)
        try {
            this.setState({ loading: true, error: "" })
            console.log("tbcli", tbcli)

            const tbzon = await DataBase.tbzon.objectForPrimaryKey(tbcli.idz)
            console.log("tbzon", tbzon)

            let tbcat;
            try {
                tbcat = await DataBase.tbcat.objectForPrimaryKey(tbcli.idcat)
            } catch (error) {

            }

            if (!tbcat?.catnom) {
                tbcat = { catnom: "Tienda de Barrio" };
            }
            const tbemp = await DataBase.tbemp.objectForPrimaryKey(tbzon.idemp)
            console.log("tbemp", tbemp)

            const productos = Model.carrito.Action.getState().productos;
            let dataProducto = []

            const idven = SUuid();
            Object.keys(productos).map((key, index) => {
                const prd = productos[key].data;
                dataProducto.push({
                    idven: idven,
                    vdcan: productos[key].cantidad,
                    vdpre: prd.prdpoficial,
                    vddesc: 0,
                    prdcod: prd.prdcod,
                })
            });

            const dm_cabfac = {
                "idven": idven,
                "vtipo": "1",
                "tipocliente": tbcat.catnom,
                "vtipa": 0,
                "clicod": tbcli.clicod,
                "vobs": "VENTA DESDE APP SERVISOFTS - " + this.state.detalle,
                "vpla": 0,
                "vdes": "0",
                "codvendedor": tbemp.empcod,
                "vlatitud": 0,
                "vlongitud": 0,
                "razonsocial": tbcli.clirazon,
                "nit": tbcli.clinit,
                "nombrecliente": tbcli.clinom,
                "vzona": tbzon.zcod,
                "direccion": tbcli.clidir,
                "telefonos": tbcli.clitel,
                "vfec": new SDate().toString("yyyy-MM-dd 00:00:00.0"),
                "vhora": new SDate().toString("1900-01-01 hh:mm:ss.0"),
                detalle: dataProducto,
                "sync_type": "insert"
            }

            await DataBase.dm_cabfac.insert(dm_cabfac);
            this.setState({ loading: false, error: "" })
            // Model.carrito.Action.removeAll()
            SNavigation.replace("/dm_cabfac/recibo", {
                pk: idven,
                onBack: () => {
                    SNavigation.replace("/tbemp/profile", { pk: Model.usuario.Action.getUsuarioLog().idvendedor })
                }
            })
        } catch (error) {
            this.setState({ loading: false, error: error })
        }



        // SSocket.sendPromise({
        //     component: "dm_cabfac",
        //     type: "registro",
        //     estado: "cargando",
        //     data: {
        //         idcli: idcli,
        //         vnit: clinit,
        //         vdet: "VENTA DESDE APP SERVISOFTS - " + this.state.detalle,
        //         productos: dataProducto
        //     },
        //     usumod: "SERVISOFTS",

        // }, 1000 * 60).then(e => {
        //     this.setState({ loading: false, error: "" })
        //     console.log(e);
        //     Model.carrito.Action.removeAll()
        //     SNavigation.replace("/dm_cabfac/recibo", {
        //         pk: e?.data?.idven,
        //         onBack: () => {
        //             SNavigation.replace("/tbemp/profile", { pk: Model.usuario.Action.getUsuarioLog().idvendedor })
        //         }
        //     })
        // }).catch(e => {
        //     this.setState({ loading: false, error: e.error })
        //     console.error(e);
        // })
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
                vdet: "VENTA DESDE APP SERVISOFTS - " + this.state.detalle,
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
        console.log(this.state?.client)
        console.log(this.state?.detalle + " detalle")
        return <SPage footer={this.footer()}>
            <Container>
                <SText>Carrito</SText>
                <SHr />
                <SText col={"xs-12"} bold fontSize={16}>{this.state?.client?.clinom}</SText>
                <SInput label="CI/NIT" value={this.state?.client?.clinit} onChangeText={(val) => {
                    this.state.client.clinit = val;
                }} />
                <SInput type='textArea' style={{ padding: 10 }} label="DETALLE" defaultValue={this.state?.detalle} onChangeText={(val) => {
                    this.state.detalle = val;
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
            <SHr height={30} />
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