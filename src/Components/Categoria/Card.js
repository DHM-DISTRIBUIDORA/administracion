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
        var { linnom, nivel, lincod } = this.props.obj;

        return (
            <SView col={"xs-6"} style={{ padding: 5 }} height={155} >
            <SView col={"xs-12"} style={{ backgroundColor: this.props.color, borderRadius: 15 }} height
                onPress={() => {
                    SNavigation.navigate("/categoria", { pk: lincod, color: this.props.color })
                }}
            >
                <SHr />
                <SView col={"xs-12"} row >
                    <SView width={8} />
                    <SIcon name='Categoria' height={60} width={60} />
                    <SView col={"xs-11"} style={{ padding: 7 }}>
                        <SText color={STheme.color.white} fontSize={16} bold>{linnom}</SText>
                    </SView>
                    <SHr height={0} />
                    {/* <SView flex style={{ alignItems: "flex-end", marginRight: 5 }}>
                        <SText color={STheme.color.white} fontSize={16} >{catcod}</SText>
                    </SView> */}
                </SView>
                <SHr />
            </SView>
        </SView>
        );
    }
}
export default (index);