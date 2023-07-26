import React, { Component } from 'react';
import { SButtom, SNavigation, SPage } from 'servisofts-component'
export default class index extends Component {

    render() {
        return <SPage title={"Test"}>
            <SButtom type='danger' onPress={()=>SNavigation.navigate("/test2")}>VER</SButtom>
        </SPage>
    }


}
