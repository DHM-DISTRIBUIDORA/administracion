import React, { Component } from 'react'
import { SIcon, SNavigation, SText, STheme, SView } from 'servisofts-component';

import { TopBarPropsType } from '..';
import NavBar from '../../NavBar';
export default class index extends Component<TopBarPropsType> {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<SView col={"xs-12"} height={60} backgroundColor={STheme.color.barColor} center row style={{
            borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
        }}>
            <SView width={50} height center onPress={() => { NavBar.open(); }}>
                <SIcon name={"KMenu"} width={25} fill={STheme.color.text}/>
            </SView>
            <SView flex center height>
                <SText color={STheme.color.secondary} fontSize={18}>{this.props.title}</SText>
            </SView>
            <SView width={50} height center onPress={() => {
                SNavigation.navigate('/ajustes');
            }}>
                {/* <SIcon name={"Tuerca"} width={24} height={24} fill={STheme.color.secondary} /> */}
            </SView>
        </SView>)
    }
}