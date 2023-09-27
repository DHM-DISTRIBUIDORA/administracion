import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SInput, STable2, SText, SView } from 'servisofts-component'


const arr = [
    { key: "06:00" },
    { key: "06:00" },
    { key: "06:00" },
    { key: "06:00" },
    { key: "06:00" },
]
export default class test3 extends Component {

    render() {
        // return <SView><SText>Hola</SText></SView>
        return (
            <STable2
                header={[
                    { key: "index", width: 50 }
                ]}
                data={arr} />
        )
    }
}