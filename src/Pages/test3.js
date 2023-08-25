import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SInput, STable2 } from 'servisofts-component'


const arr = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
]
export default class test3 extends Component {
    state = {
        "dias": {
            "0": {
                "06:00": { key_sucursal: "ricky pazd", precio: 0 },
                "07:00": { key_sucursal: "", precio: 0 },
                "08:00": { key_sucursal: "", precio: 0 },
            },
            "1": {
                "06:00": { key_sucursal: "asdasd", precio: 0 },
                "07:00": { key_sucursal: "", precio: 0 },
                "08:00": { key_sucursal: "", precio: 0 },
            }
        }
    }
    render() {
        return (
            <STable2
                header={[
                    { key: "-a" },
                    {
                        key: "-lun", width: 200, component: obj => <SInput value={this.state.dias["0"][obj]?.key_sucursal} onChangeText={val => {
                            this.state.dias["0"][obj].key_sucursal = val;
                            this.setState({ ...this.state })
                        }} />
                    },
                    { key: "-mar", width: 200, component: obj => <SInput value={this.state.dias["1"][obj]?.key_sucursal} /> },
                ]}
                data={arr} />
        )
    }
}