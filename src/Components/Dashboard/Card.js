import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView, SNavigation } from 'servisofts-component';
import SSocket from 'servisofts-socket';
export type CategoriaCardPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<CategoriaCardPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var { linnom, nivel, lincod } = this.props.obj;

        return (
            <SView col={"xs-12"} row >
                <SView col={"xs-12"} center card
                    style={{
                        // backgroundColor: STheme.color.primary + "50",
                        padding: 6,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 15

                    }}>

                    <SText fontSize={15} center>Clientes</SText>
                </SView>
                <SView col={"xs-12"} height={50} center>
                    <SText fontSize={15} center>Visitas</SText>
                </SView>
            </SView>
        );
    }
}
export default (index);