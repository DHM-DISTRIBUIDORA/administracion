import React, { Component } from 'react';
import { SPage, STable4, SThread } from 'servisofts-component';
import STable from "servisofts-table"

export default class index extends Component {
    render() {
        return <STable loadData={new Promise((resolve, reject) => {
            new SThread(1000, "asd", false).start(() => {
                resolve([])
            })
        })} />
    }
}