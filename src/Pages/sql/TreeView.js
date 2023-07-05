import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SList, SText, SView } from 'servisofts-component'
import ResizableBox from './ResizableBox'

export default class TreeView extends Component {

    getList() {
        return <SList
            data={["tables"]}
        />
    }
    render() {
        return <SView border={1}>
            <ResizableBox width={200}>
                {this.getList()}
            </ResizableBox>
        </SView>
    }
}