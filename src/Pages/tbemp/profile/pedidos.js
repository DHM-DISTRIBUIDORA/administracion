import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SMath, SNavigation, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { Container } from '../../../Components';
import Model from '../../../Model';
import DataBase from '../../../DataBase';
class pedidos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.idemp = SNavigation.getParam("pk")
        this.fecha_inicio = SNavigation.getParam("fecha_inicio");
        this.fecha_fin = SNavigation.getParam("fecha_fin");
    }

    componentDidMount() {

        DataBase.dm_cabfac.all().then(dt => {
            let data = dt.map((a) => {
                // a.detalle = JSON.parse(a.detalle);
                return a;
            })
            this.setState({ data: data })
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
            total += a.vdpre * a.vdcan
            cantidadProductos += a.vdcan;
        })
        return <SView col={"xs-12"} card padding={8} onPress={() => {
            SNavigation.navigate("/dm_cabfac/recibo", { pk: obj.idven })
        }} row>
            <SView col={"xs-12"} row>
                <SText>{obj.idven}</SText>
                <SView flex />
                <SText>{(obj.vfec + "").substring(0, 10)}</SText>
            </SView>
            <SView col={"xs-12"} row>
                <SView col={"xs-3"} row>

                </SView>
                <SView col={"xs-9"} flex row>
                    <SText>{obj.clicod}  - {obj.nombrecliente}</SText>
                    <SText>{obj.razonsocial}</SText>
                    <SText bold># {cantidadProductos}</SText>
                    <SText bold>Bs. {SMath.formatMoney(total)}</SText>
                </SView>

            </SView>


        </SView>
    }
    render() {
        if (!this.state.data) return <SLoad />
        console.log("DATA:")
        console.log(this.state.data)
        return (
            <SPage title={'Pedidos'} >
                <Container >

                    {(this.fecha_inicio) ?
                        <SView col={"xs-12"} center>
                            <SText fontSize={20} bold >Pedidos entre: </SText>
                            <SText fontSize={20} bold >{this.fecha_inicio} , {this.fecha_fin}</SText>
                        </SView> : null}

                    <SHr height={20} />
                    <SList
                        limit={20}
                        data={this.state.data}
                        render={this.component.bind(this)}
                        order={[{ key: "idven", order: "desc" }, { key: "vfec", order: "desc", peso: 2 }]}
                        {...this.fecha_inicio ?
                            {
                                filter: (a) => new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") >= this.fecha_inicio && new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") <= this.fecha_fin
                            } : null}
                        // filter={(a) => new SDate(a.vfec).toString("yyyy-MM-dd") >= this.fecha_inicio && new SDate(a.vfec).toString("yyyy-MM-dd") <= this.fecha_fin} : null}

                        buscador={true}
                    />
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