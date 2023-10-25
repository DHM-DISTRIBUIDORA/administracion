import { Platform, Text, View } from 'react-native'
import React, { Component } from 'react'
import TextArea from './TextArea'
import { SLoad, STable2, STable3, STable4, SText, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket'
import ResizableBoxVertical from '../ResizableBoxVertical'
export default class QueryTool extends Component<{ pk: string }> {
    static _HISTORY = {};
    state = {
        data: QueryTool._HISTORY[this.props.pk]
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
                // cellStyle: { textAlign: "start", textWrap: "nowrap" }

            })

        }
        return arr;

    }
    getTable() {
        if (!this.state.data) return null;
        // return <STable4 data={this.state.data}/>
        return <STable2

            rowHeight={28}
            header={[
                { key: "index", label: "#", },
                ...this.getHeaders(),
            ]}
            limit={100}
            data={this.state.data ?? {}}
        />
    }

    execute() {
        let value = this.inp.getValue();
        if (!value) return;
        this.setState({ loading: true, data: null, error: null })
        SSocket.sendPromise({
            component: "dhm",
            type: "get",
            select: value,
        }).then((resp) => {
            QueryTool._HISTORY[this.props.pk] = resp.data;
            this.setState({ error: "", data: resp.data, loading: false })
            console.log(resp);
        }).catch(e => {
            this.setState({ error: e.error, data: null, loading: false })
            console.error(e);
        })
    }
    render() {
        return (
            <View style={{
                width: "100%", flex: 1,
            }}>
                <SView row>
                    <SText onPress={this.execute.bind(this)} padding={4} font='Cascadia' card>{"RUN (f5)"}</SText>
                </SView>
                <TextArea ref={ref => this.inp = ref} pk={this.props.pk} onKeyPress={(e) => {
                    if ((e.which || e.keyCode) === 116) {
                        e.preventDefault();
                        this.execute();
                    }
                }} />
                <ResizableBoxVertical height={300} >
                    {this.state.loading ? <SLoad /> : null}
                    {!this.state.data ? <SText>{this.state.error}</SText> : this.getTable()}
                </ResizableBoxVertical>
            </View>
        )
    }
}