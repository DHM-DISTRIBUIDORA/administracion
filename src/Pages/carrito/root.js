import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SForm, SGeolocation, SHr, SIcon, SInput, SLoad, SNavigation, SNotification, SPage, SPopup, SStorage, SText, STheme, SThread, SUuid, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { BottomNavigator, Carrito, Container, PButtom } from '../../Components';
import Model from '../../Model';
import DataBase from '../../DataBase';
import { Trigger } from 'servisofts-db';
import SGeolocation2 from '../../Components/SGeolocation2';


class index extends Component {
    state = {
        client: {}
    };
    constructor(props) {
        super(props);
        this.state = {
            detalle: "",
            location: 0,
        }
        this.idcli = SNavigation.getParam("pk");
    }


    getClienteData() {
        SStorage.getItem("tbcli_a_comprar", (resp) => {
            if (!resp) return;
            const cliente = JSON.parse(resp);
            if (cliente) {
                this.setState({
                    client: cliente
                })
                return;
            }
        })

    }
    setClienteData(cli) {
        SStorage.setItem("tbcli_a_comprar", JSON.stringify(cli))
        this.getClienteData();
    }
    componentDidMount() {
        this.getClienteData();
        this.t1 = Trigger.addEventListener({
            on: ["insert", "update", "delete"],
            tables: ["tbcli"]
        }, (evt) => {
            if (this.state?.client) {
                DataBase.tbcli.objectForPrimaryKey(this.state?.client?.idcli).then((e) => {
                    this.setClienteData(e);
                }).catch(e => {

                })
            }
        });
    }

    componentWillUnmount() {
        Trigger.removeEventListener(this.t1);
    }

    loadData() {

    }
    calc_distance = (lat1, lon1, lat2, lon2) => {
        var rad = function (x) { return x * Math.PI / 180; }
        var R = 6378.137;
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c * 1000;
        return d;
    }
    handlePressPedido = async (tbcli) => {
        let notify = await SNotification.send({
            title: "Obteniendo tu ubicación",
            body: "Estamos buscando tu ubicación actual.",
            type: "loading"
        })
        // SGeolocation.getCurrentPosition({
        //     enableHighAccuracy: false,
        //     maximumAge: 3600,
        //     timeout: 10000
        // }).then(e => {
        SGeolocation2.getCurrentPosition({
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 15000
        }).then(e => {
            notify.close();
            this.handlePressPedidoUbicacion(tbcli, e.coords);
        }).catch(e => {
            notify.close();
            SNotification.send({
                title: "Obteniendo tu ubicación",
                body: e.message,
                time: 5000,
                color: STheme.color.danger
            })
            console.error(e);
        })
    }

    handlePressPedidoUbicacion = async (tbcli, ubicacion) => {
        if (this.state.loading) return;
        // console.error(client)
        if (!tbcli) {
            if (Model.usuario.Action.getKey()) {
                SPopup.alert("Primero debe seleccionar el cliente.")
                return;
            }
            SPopup.alert("Para realizar el pedido, inicie sesión.")
            SNavigation.navigate("/login")
            return;
        }

        if (!tbcli.clilat || !tbcli.clilon) {
            // if (this.state.location == 0) {
            SPopup.alert("Para realizar el pedido, debe registrar ubicación al cliente.")
            SNavigation.navigate("/tbcli/mapa",
                {
                    callback2: (resp) => {
                        // this.setState({ ubicacion: resp })
                    },
                    lat: tbcli?.clilat,
                    lon: tbcli?.clilon,
                    pk: tbcli.idcli,
                    obj: tbcli
                },
            )
            // this.state.location = 1;
            return;
        }
        let distancia = this.calc_distance(tbcli.clilat, tbcli.clilon, ubicacion.latitude, ubicacion.longitude);
        if (distancia > 200) {
            if (!Model.usuarioPage.Action.getPermiso({ url: "/global", permiso: "levantar_pedido_fuera_zona" })) {
                SPopup.alert("No tiene permisos para levantar pedidos lejos del cliente, porfavor contáctese con la administración.")
                return;
            }
        }
        try {
            this.state.loading = true;
            this.setState({ loading: true, error: "" })
            console.log("tbcli", tbcli)

            const tbzon = await DataBase.tbzon.objectForPrimaryKey(tbcli.idz)
            console.log("tbzon", tbzon)

            const idvendedor = Model.usuario.Action.getUsuarioLog().idvendedor;
            if (!idvendedor) {
                this.setState({ loading: false, error: "Su zona no cuenta con un vendedor asignado." })
                return;
            }
            let tbcat;
            try {
                tbcat = await DataBase.tbcat.objectForPrimaryKey(tbcli.idcat)
            } catch (error) {
                console.error(error)
            }

            if (!tbcat?.catnom) {
                tbcat = { catnom: "Tienda de Barrio" };
            }

            console.log("tbcat", tbcat)
            const tbemp = await DataBase.tbemp.objectForPrimaryKey(parseInt(idvendedor))
            console.log("tbemp", tbemp)

            const productos = Model.carrito.Action.getState().productos;
            let dataProducto = []

            const idven = new Date().getTime() + "";
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
                "vobs": "SAPP - " + this.state.detalle,
                "vpla": 0,
                "vdes": "0",
                "codvendedor": tbemp.empcod,
                // tbcli.clilat, tbcli.clilon
                // "vlatitud": ubicacion.latitude,
                // "vlongitud": ubicacion.longitude,
                "vlatitud": tbcli.clilat,
                "vlongitud": tbcli.clilon,
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

            await DataBase.visita_vendedor.insert({
                sync_type: "insert",
                key: SUuid(),
                fecha_on: new SDate().toString(),
                key_usuario: Model.usuario.Action.getKey(),
                idcli: tbcli.idcli + "",
                idemp: tbemp.idemp + "",
                descripcion: dm_cabfac.vobs,
                tipo: "REALIZO PEDIDO", // !!!!! NO CAMBIAR POR QUE ES UN IDENTIFICADOR 
                fecha: new SDate().toString("yyyy-MM-dd"),
            })

            Model.carrito.Action.removeAll()


            // console.log("SI REGISTRO EN LA DB")
            // return;
            SNavigation.replace("/dm_cabfac/recibo", {
                pk: idven,
                onBack: () => {
                    DataBase.Funciones.saveAllChanges();
                    SNavigation.reset("/root")
                    new SThread(500, "sadad").start(() => {
                        SNavigation.navigate("/tbemp/profile", { pk: Model.usuario.Action.getUsuarioLog().idvendedor, reload: new Date().getTime() })
                    })
                }
            })
            // this.setState({ loading: false, error: "" })
        } catch (error) {
            console.error(error);
            this.setState({ loading: false, error: error })
        }


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
        // console.log(this.state?.client)
        // console.log(this.state?.detalle + " detalle")
        return <SPage footer={this.footer()}>
            <Container>
                <SText>Carrito</SText>
                <SHr />
                <SText col={"xs-12"} bold fontSize={16}>Cliente</SText>
                <Carrito.Cliente data={this.state.client} onChange={(cliente) => {
                    this.setClienteData(cliente)
                }} />
                {/* <SText>{JSON.stringify(this.state.client)}</SText> */}
                <SHr />
                {/* <SText col={"xs-12"} bold fontSize={16}>{this.state?.client?.clinom}</SText> */}
                <SInput label="CI/NIT" value={this.state?.client?.clinit} onChangeText={(val) => {
                    this.state.client.clinit = val;
                }} />
                <SInput ref={ref => this.inpDetalle = ref} type='textArea' style={{ padding: 10 }} label="DETALLE" defaultValue={this.state?.detalle} onChangeText={(val) => {
                    if ((val + "").length > 65) {
                        return val.substring(0, 65);
                    }
                    this.state.detalle = val;
                }} placeholder={"Escribe un detalle de máximo 65 caracteres."} />
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
        return <BottomNavigator url={"/carrito/pedido"} carrito={"no"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);