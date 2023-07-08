import React, { Component } from 'react';
import { ScrollView } from 'react-native'
import { STable3 } from 'servisofts-component';
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

        return <STable3 data={values} />
    }


}
