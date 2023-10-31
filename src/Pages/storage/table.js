import React, { Component } from 'react';
import { SHr, SLoad, SNavigation, SPage, SText, SUuid, SView } from 'servisofts-component';
import DataBase from '../../DataBase';
import STable from 'servisofts-table';

export default class index extends Component {

    table = SNavigation.getParam("table")
    changes = SNavigation.getParam("changes")

    render() {
        return <SPage disableScroll hidden>
            <STable
                loadData={new Promise((ok, error) => {
                    DataBase[this.table].all().then(e => {
                        let allKeysSet = new Set();
                        e.forEach((obj) => {
                            Object.keys(obj).forEach(key => allKeysSet.add(key));
                        });
                        const allKeys = Array.from(allKeysSet);
                        // console.log(e)
                        let arrData = e.map((obj) => allKeys.map((k) => {
                            if (typeof obj[k] == "object")
                                return JSON.stringify(obj[k])
                            return obj[k]
                        }));
                        arrData.splice(0, 0, allKeys)
                        ok(arrData)
                    }).catch(e => {
                        console.error(e);
                    })
                })}
            />
        </SPage>
    }

}
