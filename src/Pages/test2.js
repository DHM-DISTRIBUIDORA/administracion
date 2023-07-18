import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native'
import { STable4 } from 'servisofts-component';
import { SHr, SPage, SText, SView, SLoad, STheme, SImage, SIcon, SNavigation, SButtom } from 'servisofts-component';
import tjson from "./test.json"

const values = Object.values(tjson);

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return <SPage disableScroll>
            <STable4 data={values} />
        </SPage>
    }


}
