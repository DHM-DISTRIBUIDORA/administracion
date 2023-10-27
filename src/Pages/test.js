import { Text, View } from 'react-native'
import React, { Component, useState } from 'react'

import DomSelector from 'react-native-dom-parser';
export default class test extends Component {
    state = {};

    componentDidMount() {

        console.log("ENTRO AQUI EJEUCATO")
        const INSTANCE = this
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://repo.dhm.servisofts.com/dhm/gpx/04759652-b279-40ea-817d-dbfbfc39ffa5/2023/8/28/04.gpx", true);
        xhr.onreadystatechange = function () {
            // Si la solicitud se completó con éxito
            if (xhr.readyState == 4 && xhr.status == 200) {
                var xmlDoc = new DomSelector(xhr.responseText);
                var json = [];
                xmlDoc.getElementsByTagName("gpx")[0].children.map((child)=>{
                    json.push(child.attributes);
                })
                this.setState(json)
            }
        };
        xhr.send();

    }

    render() {
        if(!this.state) return <></>

        return (
            <View>
                <Text>{JSON.stringify(this.state)}</Text>
            </View>
        )
    
    }
}