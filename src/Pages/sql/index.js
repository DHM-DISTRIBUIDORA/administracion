import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SView } from 'servisofts-component'
import MenuBar from './MenuBar'
import TabSelection from './TabSelection'
import TreeView from './TreeView/index'


type PropsType = {
    backgrounColor?: any
}
export default class index extends Component<PropsType> {
    static defaultProps: PropsType = {
        backgrounColor: ""
    }
    render() {
        return <SView col={"xs-12"} flex backgroundColor={this.props.backgrounColor}>
            <MenuBar />
            <SView col={"xs-12"} row height>
                <TreeView />
                <TabSelection />
            </SView>
        </SView>
    }
}