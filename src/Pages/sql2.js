import React, { Component, useState } from 'react'
import { SButtom, SHr, SMapView, SNavigation, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import SSQL from "servisofts-sql"

export default class index extends Component {
    render() {

        return (
            <SPage title={"sql2"}>
                <SSQL 
                dataBase='PostgreSQL'
                    execute_query={(query) => {
                        return SSocket.sendPromise({
                            component: "dhm",
                            type: "get",
                            select: query,
                        })
                    }}
                />
            </SPage>
        )

    }
}