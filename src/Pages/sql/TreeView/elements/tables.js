import { Text, View } from 'react-native'
import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SIcon, SList, SLoad, SText, SView } from 'servisofts-component'
import TableItem from './TableItem'

export default class tables extends Component {
    state = {}
    componentDidMount() {
        SSocket.sendPromise({
            component: "dhm",
            type: "get",
            select: "select * from sysobjects where xtype = 'U'",
        }).then((resp) => {
            this.setState({ data: resp.data, loading: false })
        }).catch(e => {
            this.setState({ error: e.error, loading: false })
            console.error(e);
        })
    }

    render() {
        if (!this.state.data) return <SLoad />
        return (
            <SList data={this.state.data}
                buscador
                space={0}
                // limit={40}
                render={obj => <TableItem key={obj.name} obj={obj} />} />
        )
    }
}
