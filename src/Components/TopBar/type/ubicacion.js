import React, { Component } from 'react'
import { SIcon, SNavigation, SText, STheme, SView } from 'servisofts-component';

import { TopBarPropsType } from '..';
import NavBar from '../../NavBar';
import Direccion from '../Components/Direccion';
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
                <SIcon name={"KMenu"} width={32} />
            </SView>
            <SView flex center height>
                <Direccion />
            </SView>
            <SView width={50} height center onPress={() => {
                    SNavigation.navigate('/buscar');
                }} >
                <SIcon name={"Search"} width={28} height={28} fill={STheme.color.secondary} />
            </SView>
        </SView>)
    }
}