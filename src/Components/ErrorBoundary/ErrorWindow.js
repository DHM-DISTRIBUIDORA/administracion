import React, { Component } from 'react'
import { SHr, SText, SView } from 'servisofts-component'

export default class ErrorWindow extends Component {
    render() {
        console.log(this.props)
        return (
            <SView>
                <SText>ALGO MALO PASA</SText>
                <SText >
                    {this.props.error && this.props.error.toString()}
                    <SHr />
                    {this.props.errorInfo.componentStack}
                </SText>
            </SView>
        )
    }
}