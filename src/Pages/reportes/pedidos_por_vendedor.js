import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SLoad, SMath, SNavigation, SPage, STable2, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
import { Link } from '../../Components'
export default class index extends Component {
    state = {
    }
    getData({ fecha_inicio, fecha_fin }) {
        const request = {
            component: "dm_cabfac",
            type: "getPedidosVendedor",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            console.log(e);
            this.setState({ data: e.data, loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })
    }

    getTable() {
        if (!this.state.data) return null
        return <STable2
            rowHeight={30}
            header={[
                { key: "index", width: 50 },
                { key: "idemp", width: 50 },
                { key: "empcod", width: 50 },
                { key: "empnom", width: 200 },
                { key: "cantidad", width: 50, cellStyle: { textAlign: "center" } },
                { key: "fecha_primero", width: 130 },
                { key: "fecha_ultimo", width: 130 },
                { key: "idemp-ver", width: 130, component: (a) => <Link onPress={() => { SNavigation.navigate("/tbemp/profile", { pk: a }) }} >{"Ver perfil"}</Link> },
            ]}
            limit={50}
            data={this.state?.data} />
    }
    render() {
        return (
            <SPage title="Pedidos por vendedores" disableScroll>
                <SelectEntreFechas onChange={e => this.getData(e)} />
                <SView flex>
                    {this.getTable()}
                </SView>
            </SPage>
        )
    }
}