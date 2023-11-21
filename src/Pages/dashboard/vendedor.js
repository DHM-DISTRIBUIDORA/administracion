import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SHr, SList, SLoad, SMath, SPage, STable2, SText, STheme, SView } from 'servisofts-component'
import { Container, Dashboard } from '../../Components';
import DataBase from '../../DataBase';
export default class index extends Component {
    state = {
    }

    componentDidMount() {
        this.getData();

    }
    getData() {
        const request = {
            component: "dhm",
            type: "dashboardVendedor",
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(async e => {
            console.log(e);
            let arr = Object.values(e.data)
            let promises = arr.map(async (emp) => {
                const af = await DataBase.usuario.filtered(`idvendedor == ${parseInt(emp.idemp)}`)
                emp.usuario = af[0]
            })
            const response = await Promise.all(promises);
            this.setState({ data: arr, loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e.message ?? e })
            console.error(e);
        })
    }


    render() {
        // const data = this.state?.data;
        if (this.state?.error) return <SText color={STheme.color.danger}>{JSON.stringify(this.state.error)}</SText>
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
                            // var obj2 = this.state.usuarios.filter(e => e.idvendedor == obj.idemp)
                            // obj.key = obj2[0].key
                            return <Dashboard.Card data={obj} />
                        }}
                    />
                    <SHr height={20} />
                </Container>
            </SPage>
        )
    }
}