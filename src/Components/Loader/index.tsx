import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SLoad, SThread, SUuid } from 'servisofts-component'

export default class index extends Component<{ children: any, loading: boolean }> {
    state = {
        load: false
    }
    componentDidMount(): void {
        new SThread(100, SUuid(), false).start(() => {
            this.setState({ load: true })
        })
    }
    render() {
        if (!this.state.load || this.props.loading) return <SLoad />

        return this.props.children

    }
}