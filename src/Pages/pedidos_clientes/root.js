import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SList, SLoad, SNavigation, SPage, SText, SView } from 'servisofts-component';
import { BottomNavigator, Container, TopBar } from '../../Components';

import SSocket, { setProps } from 'servisofts-socket';
import Pedido from '../../Components/Pedido';
import Model from '../../Model';
import DataBase from '../../DataBase';
class index extends Component {

    constructor(props) {
        super(props)
        this.idcli = Model.tbcli.Action.getCliente()?.idcli
    }

    componentDidMount() {
        DataBase.dm_cabfac.all().then(e => {
            this.setState({ data: e })
        })

        // SSocket.sendPromise({
        //     component: "dm_cabfac",
        //     type: "getPedidos",
        //     idcli: this.idcli,


        // }).then(e => {
        //     console.log(e);
        //     this.setState({ data: e.data ?? [] })
        // }).catch(e => {
        //     console.error(e);
        // })
    }

    getLista() {
        const data = this.state?.data;
        if (!data) return <SLoad />

        console.log(data)
        if (data.length <= 0) {
            return <SText>No hay datos</SText>
        }
        return <SList
            data={data}
            limit={20}
            // filter={(a) => a.nivel == 1}
            order={[{ key: "idven", order: "desc" }]}
            render={(obj) => {
                return <Pedido.Card data={obj} />
            }}
        />
    }
    render() {
        return <SPage
            title={"Mis pedidos"}
            // hidden
            footer={this.footer()}
            header={<Pedido.BotonesPedidos url={"/pedidos"} />}
            onRefresh={(callback) => {
                this.componentDidMount()
                if (callback) callback()
            }}
        >
            <SHr />
            <Container>
                <SView col={"xs-12"} row>
                    {this.getLista()}
                </SView>
                <SHr height={30} />
            </Container>
        </SPage>
    }


    footer() {
        return <BottomNavigator url={"/pedidos"} />
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);