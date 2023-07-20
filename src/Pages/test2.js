import React, { Component } from 'react';
import { SPage, STable4 } from 'servisofts-component';
// import STable from "servisofts-table"
import tjson from "./test2.json"

export default class index extends Component {
    render() {
        return <STable4 data={tjson} />
    }
}

