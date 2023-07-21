import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView,SNavigation } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PButtomSmall from '../PButtomSmall';
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
        var { linnom, nivel, lincod, idlinea } = this.props.obj;

        return (
            <SView col={"xs-12"} style={{ backgroundColor: this.props.color, borderRadius: 15 }} center
            onPress={() => {
                SNavigation.navigate("/producto", { pk: idlinea })
            }}
        >
            <SHr />
            <SView col={"xs-12"} row center>
                <SView width={8} />
                <SIcon name='Logosolo' height={25} width={25} />
                <SView width={15} />
                <SView flex >
                    <SText color={STheme.color.white} fontSize={18} bold>{linnom}</SText>
                    <SText color={STheme.color.white} fontSize={8} >{lincod}</SText>
                </SView>
                <SView width={20}>
                    <SIcon name='Right' height={16} fill={this.props.color} />
                </SView>
                <SView width={4} />
            </SView>
            <SHr />
        </SView>
        );
    }
}
export default (index);