import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SLoad, SMath, SPage, STable2, SText, SView } from 'servisofts-component'
export default class index extends Component {
    state = {
    }

    componentDidMount(){
        this.getData();
    }
    getData() {
        const request = {
            component: "dhm",
            type: "dashboardVendedor",
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

    render() {
        return (
            <SPage title="Pedidos por vendedores" disableScroll>
                <SView flex>
                    <SText>{JSON.stringify(this.state)}</SText>
                </SView>
            </SPage>
        )
    }
}