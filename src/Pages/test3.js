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
        return <SPage>
            <Btn onPress={() => {
                try {
                    // SSocket.Instance.socket.close();
                    SSocket.Instance.onClose();
                } catch (e) {
                    console.error(e);
                }
                SSocket.getSession();

                console.log("Reconectando");
            }}>RECONECTAR</Btn>
        </SPage>
        return <SView><SText>Hola</SText></SView>
        return (
            <STable2
                header={[
                    { key: "index", width: 50 }
                ]}
                data={arr} />
        )
    }
}