import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SGradient, STheme, SView, SText, SIcon } from 'servisofts-component';

type Modulo_props = {
    width?: number,
    icon?: string,
    titulo?: string,
}

export default class index extends Component<Modulo_props> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"}>
                <SView col={"xs-12"}
                    style={{
                        borderBottomColor: STheme.color.card, borderBottomWidth: 5,
                    }} />
                <SView width={(this.props.width) ? this.props?.width : 120} height={40} row center card
                    style={{
                        position: "absolute",
                        top: 0, right: 0,
                        padding: 5,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10
                    }}>
                    <SIcon name={this.props?.icon} height={30} width={30} />
                    <SView width={7} />
                    <SText fontSize={12}>{this.props?.titulo}</SText>
                </SView>
            </SView >
        );
    }
}
