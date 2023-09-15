import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SList, SMath, SNavigation, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { Container } from '../../../Components';
class pedidos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.idemp = SNavigation.getParam("pk")
    }

    componentDidMount() {
        SSocket.sendPromise({
            component: "dm_cabfac",
            type: "getPedidos",
            idemp: this.idemp
        }).then((a) => {
            this.setState({ data: a.data })
        })
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
        }}>
            <SView col={"xs-12"} flex row>
                <SText>{obj.idven}</SText>
                <SView flex />
                <SText>{(obj.vfec + "").substring(0, 10)}</SText>
            </SView>
            <SText>{obj.clicod}  - {obj.nombrecliente}</SText>
            <SText>{obj.razonsocial}</SText>
            <SText bold># {cantidadProductos}</SText>
            <SText bold>Bs. {SMath.formatMoney(total)}</SText>

        </SView>
    }
    render() {
        return (
            <SPage title={'pedidos'} >
                <Container >
                    <SList limit={20} data={this.state.data} render={this.component.bind(this)} order={[{ key: "idven", order: "desc" },]} />
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(pedidos);