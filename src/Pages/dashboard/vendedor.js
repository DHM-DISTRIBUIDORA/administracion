import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SHr, SList, SLoad, SMath, SPage, STable2, SText, SView } from 'servisofts-component'
import { Container, Dashboard } from '../../Components';
import DataBase from '../../DataBase';
export default class index extends Component {
    state = {
    }

    componentDidMount() {
        this.getData();
        DataBase.usuario.all().then(e => {
            this.setState({ usuarios: e })

        })
    }
    getData() {
        const request = {
            component: "dhm",
            type: "dashboardVendedor",
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            // console.log(e);
            this.setState({ data: e.data, loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })
    }

    render() {
        // const data = this.state?.data;
        if (!this.state?.data) return <SLoad />
        return (
            <SPage title="Pedidos por vendedores" >
                <Container>
                    {/* <SText>{JSON.stringify(this.state)}</SText> */}
                    <SList
                        data={this.state.data}
                        limit={20}
                        buscador
                        // filter={(a) => a.nivel == 1}
                        // order={[{ key: "idven", order: "desc" }]}
                        render={(obj) => {
                            var obj2 = this.state.usuarios.filter(e => e.idvendedor == obj.idemp)
                            obj.key = obj2[0].key
                            return <Dashboard.Card data={obj}  />
                        }}
                    />
                    <SHr height={20} />
                </Container>
            </SPage>
        )
    }
}