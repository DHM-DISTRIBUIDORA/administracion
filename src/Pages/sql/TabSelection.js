import { ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { SList, SList2, SLoad, SText, SThread, SView } from 'servisofts-component'
// import Sql from './sql'
import QueryTool from './QueryTool'
import ResizableBoxVertical from './ResizableBoxVertical'

export default class TabSelection extends Component {
    state = {
        tap: "Tap 1"
    }
    render() {
        return <SView flex height>
            <SView row height={35} center>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <SList2
                        data={["Tap 1", "Tap 2", "Tap 3", "Tap 4", "Tap 5", "Tap 6", "Tap 7", "Tap 8", "Tap 9", "Tap 10"]}
                        horizontal
                        render={a => <SText padding={4} style={{
                            minWidth: 70,
                            opacity: this.state.tap == a ? 1 : 0.7,
                        }}

                            bold={this.state.tap == a}
                            font="Cascadia"
                            card
                            onPress={() => {
                                this.setState({ tap: a, loading: true })
                                new SThread(100, "change_view").start(() => {
                                    this.setState({ loading: false })
                                })
                            }}>{a}</SText>}
                    />
                </ScrollView>
            </SView>
            {this.state.loading ? <SLoad /> : <QueryTool pk={this.state.tap} />}
        </SView>
    }
}