import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SInput, SPage, STable2, SText, SView } from 'servisofts-component'
import { Btn } from '../Components'

import SSocket from 'servisofts-socket'
const arr = [
    { key: "06:00" },
    { key: "06:00" },
    { key: "06:00" },
    { key: "06:00" },
    { key: "06:00" },
]
export default class test3 extends Component {

    render() {

        return (
            <STable2
                header={[
                    { key: "index", width: 50 }
                ]}
                data={arr} />
        )
    }
}