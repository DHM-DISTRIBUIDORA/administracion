import React, { Component } from 'react';
import { SHr, SIcon, SText, STheme, SView } from 'servisofts-component';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center backgroundColor={STheme.color.primary}>
                <SHr height={30} />
                <SView col={"xs-11"} height={150} center>
                    <SIcon name={"LogoWhite"} fill={STheme.color.secondary} height={100} />
                </SView>
                <SHr height={16} />
                <SView center col={"xs-10"}>
                    <SText center fontSize={16} color={STheme.color.secondary}>{this.props?.title}</SText>
                </SView>
                <SHr height={20} />
            </SView>
        );
    }
}
