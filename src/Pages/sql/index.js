import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SView, STable3, SNavigation } from 'servisofts-component'
import MenuBar from './MenuBar'
import TabSelection from './TabSelection'
import TreeView from './TreeView/index'
import Model from '../../Model'


type ThemeProps = {
    background: any,
    primary: any,
    secondary: any,
    text: any
}
type PropsType = {
    theme: ThemeProps
}
export default class index extends Component<PropsType> {
    static defaultProps: PropsType = {
        theme: {
            background: "#000000",
            primary: "#000000",
            secondary: "#ffffff",
            text: "#ffffff"
        }
    }
    componentDidMount() {
        if (!Model.usuario.Action.getKey()) {
            SNavigation.reset("/");
        }
    }
    render() {
        // return <STable3/>
        return <SView col={"xs-12"} flex backgroundColor={this.props.backgrounColor}>
            {/* <MenuBar /> */}
            <SView col={"xs-12"} row flex>
                <TreeView />
                <TabSelection />
            </SView>
        </SView>
    }
}