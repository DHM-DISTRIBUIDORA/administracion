import React, { Component } from 'react';
import { SPage, STable4, SThread } from 'servisofts-component';
import STable from "servisofts-table"

export default class index extends Component {
    render() {
        // return <STable4 data={[]}/>

        return <SPage title={"Table"} disableScroll>
            <STable
                loadData={new Promise((resolve, reject) => {
                    const data = require("./test.json")
                    const arr = Object.values(data);
                    const keys = Object.keys(arr[0]);
                    resolve([
                        keys,
                        ...arr.map(obj => keys.map(k => obj[k]))
                    ])
                })} />
        </SPage>
    }
}