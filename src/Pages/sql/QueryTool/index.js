import { Text, View } from 'react-native'
import React, { Component } from 'react'
import TextArea from './TextArea'
import { STable2, STable3, STable4, SText, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket'
export default class QueryTool extends Component {
    state = {

    }

    getHeaders() {
        if (!this.state.data) return [];
        let keys = this.state.data.reduce((accumulator, current) => {
            return accumulator.concat(Object.keys(current));
        }, []);
        let uniqueKeys = [...new Set(keys)];
        let arr = [];
        for (let index = 0; index < uniqueKeys.length; index++) {
            arr.push({
                key: uniqueKeys[index],
                width: 100,
            })

        }
        return arr;

    }
    getTable() {
        if (!this.state.data) return null;
        // return <STable4 data={this.state.data}/>
        return <STable2
            header={[
                { key: "index", label: "#" },
                ...this.getHeaders(),
            ]}
            limit={100}
            data={this.state.data ?? {}}
        />
    }

    render() {
        return (
            <View style={{
                width: "100%", flex: 1,
            }}>
                <SText onPress={() => {
                    let value = this.inp.getValue();
                    if (!value) return;
                    this.setState({ loading: true, data: null, error: null })
                    SSocket.sendPromise({
                        component: "dhm",
                        type: "get",
                        select: value,
                    }).then((resp) => {
                        this.setState({ error: "", data: resp.data, loading: false })
                        console.log(resp);
                    }).catch(e => {
                        this.setState({ error: e.error, data: null, loading: false })
                        console.error(e);
                    })
                }}>EJECUTAR</SText>
                <TextArea ref={ref => this.inp = ref} />
                <SView col={"xs-12"} height={400} backgroundColor='#eee'>
                    {!this.state.data ? <SText>{this.state.error}</SText> : this.getTable()}

                </SView>
            </View>
        )
    }
}