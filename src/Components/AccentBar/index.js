import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SGradient, STheme, SView } from 'servisofts-component';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView  height={20} col={"xs-12"}>
                <SGradient deg={50} colors={[STheme.color.accent, "#3A3A3A",]} />
            </SView>
        );
    }
}
