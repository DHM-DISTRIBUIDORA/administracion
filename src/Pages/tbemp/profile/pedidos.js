import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { Container, Loader } from '../../../Components';
import Model from '../../../Model';
import DataBase from '../../../DataBase';
import { Trigger } from 'servisofts-db';
class pedidos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // cont: 0
        };
        this.idemp = SNavigation.getParam("pk")
        this.fecha_inicio = SNavigation.getParam("fecha_inicio");
        this.fecha_fin = SNavigation.getParam("fecha_fin");
    }

    componentDidMount() {
        this.loadDataAsync();
        this.t1 = Trigger.addEventListener({
            on: ["insert", "update", "delete"],
            tables: ["dm_cabfac"]
        }, (evt) => {
            this.loadDataAsync();
        });
    }
    componentWillUnmount() {
        Trigger.removeEventListener(this.t1);
    }

    async loadDataAsync() {
        DataBase.dm_cabfac.filtered(`vfec >= $0 && vfec <= $1`, this.fecha_inicio + " 00:00:00.0", this.fecha_fin + " 00:00:00.0").then(dt => {
            dt = dt.sort((a, b) => a.vhora < b.vhora ? -1 : 1)

            dt.map((a, i) => a.index = i + 1)

            this.setState({ data: dt })
        })
        // SSocket.sendPromise({
        //     component: "dm_cabfac",
        //     type: "getPedidos",
        //     idemp: this.idemp
        // }).then((a) => {
        //     this.setState({ data: a.data })
        // })
    }

    component = (obj) => {
        const detalle = obj.detalle ?? []
        let total = 0;
        let cantidadProductos = 0;
        detalle.map(a => {

            total += a?.vdpre * a?.vdcan
            cantidadProductos += a?.vdcan;
        })

        return <SView col={"xs-12"} onPress={() => {
            SNavigation.navigate("/dm_cabfac/recibo", { pk: obj.idven })
        }} row>
            {/* <SText fontSize={10} color={obj.sync_type ? STheme.color.warning : null}>{obj.sync_type}</SText> */}
            <SView col={"xs-4"} row height={25}
                backgroundColor={STheme.color.primary}
                style={{
                    borderTopRightRadius: 8,
                    // position: "absolute",
                    // borderBottomLeftRadius: 8,
                }}
            >
                <SView width={5} />
                <SText bold color={STheme.color.white} center>PEDIDO # {obj.index}</SText>
            </SView>
            <SView col={"xs-12"} row padding={4} card>
                <SView col={"xs-12"} row>
                    <SText fontSize={10} color={obj.sync_type ? STheme.color.warning : null}>{obj.idven}</SText>
                    <SView flex />
                    <SText fontSize={10} color={STheme.color.gray}>{(obj.vfec + "").substring(0, 10)}{(obj.vhora + "").substring(10, 16)}</SText>
                </SView>
                <SHr />
                <SView col={"xs-12"} center row>
                    <SView flex>
                        <SText bold>{obj.clicod}  - {obj.nombrecliente}</SText>
                        <SText fontSize={12} color={STheme.color.gray}>{obj.vobs}</SText>

                    </SView>
                    <SView width={80} style={{
                        alignItems: "flex-end"
                    }}>
                        <SText bold>Bs.{SMath.formatMoney(total)}</SText>
                    </SView>

                </SView>
            </SView>

        </SView>
    }
    render() {
        var cont = 0;
        return (
            <SPage title={'Pedidos'} >
                <Container >
                    {(this.fecha_inicio) ?
                        <SView col={"xs-12"} center>
                            <SText fontSize={20} bold >Pedidos entre: </SText>
                            <SText fontSize={20} bold >{this.fecha_inicio} , {this.fecha_fin}</SText>
                        </SView> : null}

                    <SHr height={20} />
                    <Loader loading={!this.state.data}>
                        <SList
                            limit={10}
                            data={this.state.data}
                            filter={(a) => a.sync_type != "delete"}
                            //order={[{ key: "vfec", order: "asc" }, { key: "vhora", order: "asc" }]}
                            // render={this.component.bind(this)}
                            render={(datas) => {
                                return this.component(datas)
                            }}
                            buscador={true}
                        />
                    </Loader>
                </Container>
                <SHr height={30} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(pedidos);