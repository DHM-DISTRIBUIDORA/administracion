import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SIcon, SList, SLoad, SText, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket'

export default class TableItem extends Component {

    state = {
        open: false
    }


    pedirDetalleTabla(tableName) {
        SSocket.sendPromise({
            component: "dhm",
            type: "get",
            select: `select * from information_schema.columns where table_name = '${tableName}' order by ordinal_position`,
        }).then((resp) => {
            this.setState({ data: resp.data, loading: false })
        }).catch(e => {
            this.setState({ error: e.error, loading: false })
            console.error(e);
        })
    }

    getDetalle() {
        if (!this.state.open) return null;
        if (!this.state.data) return <SLoad />
        return <SList
            data={this.state.data}
            space={0}
            render={obj => <SView col={"xs-12"} row padding={2} height={22}>
                <SView width={35} />
                <SView width={16} padding={2}>
                    <SIcon name={"Favorito"} fill={"#68BDAD"} />
                </SView>
                <SView width={4} />
                <SText fontSize={14} font={"Roboto"}>{`${obj.COLUMN_NAME} (${obj.DATA_TYPE})`}</SText>
            </SView>}
        />
    }
    render() {
        const { obj } = this.props;
        return <SView col={"xs-12"} center >
            <SView col={"xs-12"} padding={2} row height={25} style={{
                alignItems: "center"
            }}>
                <SView width={16} padding={3} style={{
                    transform: [{
                        rotate: "90deg"
                    }]
                }} onPress={() => {
                    if (this.state.open) {
                        this.setState({ open: false })
                        return;
                    }
                    this.setState({ open: true })
                    this.pedirDetalleTabla(obj.name);
                }}>
                    <SIcon name={"Ingreso"} fill={"#000000"} />
                </SView>
                <SView width={4} />
                <SView width={16} padding={2}>
                    <SIcon name={"Evento"} fill={"#2295E7"} />
                </SView>
                <SView width={4} />
                <SText fontSize={14} bold font={"Roboto"}>{obj.name}</SText>
            </SView>
            {this.getDetalle()}
        </SView>
    }
}