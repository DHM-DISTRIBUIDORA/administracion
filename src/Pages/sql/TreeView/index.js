import { Text, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { SList, SScrollView2, SText, SView } from 'servisofts-component'
import ResizableBox from '../ResizableBox'
import Tables from "./elements/tables"
export default class TreeView extends Component {

    getList() {
        return <SList
            data={["tables"]}
        />
    }
    render() {
        return <SView height>
            <SView col={"xs-12"} flex style={{
                borderRightColor: "#eee",
                borderRightWidth: 2
            }}>
                <ResizableBox width={200}>
                    <ScrollView style={{ flex: 1 }}>
                        <Tables />
                    </ScrollView>
                </ResizableBox>
            </SView>
        </SView>
    }
}