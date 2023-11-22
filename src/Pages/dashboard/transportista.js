import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SHr, SList, SLoad, SMath, SPage, STable2, SText, STheme, SView } from 'servisofts-component'
import { Container, Dashboard } from '../../Components';
import DataBase from '../../DataBase';
import { SelectFecha } from '../../Components/Fechas';
export default class index extends Component {
    state = {
    }

    componentDidMount() {
        // this.getData();

    }
    getData({ fecha }) {
        const request = {
            component: "dhm",
            type: "dashboardTransportista",
            fecha: fecha
            // type: "dashboardVendedor",
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(async e => {
            console.log(e);
            let arr = Object.values(e.data)
            let promises = arr.map(async (emp) => {
                const af = await DataBase.usuario.filtered(`idtransportista == ${parseInt(emp.idemp)}`)
                emp.usuario = af[0]
            })
            const response = await Promise.all(promises);
            this.setState({ data: arr, loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e.message ?? e })
            console.error(e);
        })
    }


    renderData() {
        if (this.state?.error) return <SText color={STheme.color.danger}>{JSON.stringify(this.state.error)}</SText>
        if (!this.state?.data) return <SLoad />
        return <SList
            data={this.state.data}
            limit={20}
            buscador
            render={(obj) => {
                return <Dashboard.Cardt data={obj} />
            }}
        />
    }
    render() {

        return (
            <SPage title="Pedidos para transportistas" >
                <Container>
                    <SelectFecha onChange={(e) => {
                        this.setState({ data: null })
                        this.getData({ fecha: e.fecha });
                    }} />
                    {this.renderData()}
                    <SHr height={20} />

                </Container>
            </SPage>
        )
    }
}