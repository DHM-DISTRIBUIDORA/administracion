import { Text, View } from 'react-native'
import React, { Component, useState } from 'react'

import DomSelector from 'react-native-dom-parser';
import { SMapView, SPage, SText } from 'servisofts-component';
export default class test extends Component {
    state = {
        url:"https://repo.dhm.servisofts.com/dhm/gpx"
    };

    componentDidMount() {

        console.log("ENTRO AQUI EJEUCATO")
        // this.init("04759652-b279-40ea-817d-dbfbfc39ffa5","2023-8-28");
        this.init("27c58652-991d-435a-9207-e6bd5db16896","2023-10-27");
        //this.init("c6960922-79a8-4d22-8774-3336a2718f41", "2023-9-19");
        //this.init("7929777a-8cea-4c34-aec8-a22bb7439fac","2023-9-27");

    }

    init = async (key_usuario, fecha) => {
        let lista = await this.getLista(key_usuario, fecha);
        console.log(lista);
        let json = [];
        for (const file in lista) {
            json = [...json,...await this.getGpx(key_usuario, fecha, lista[file])]
        }
        this.setState({data:json})
        console.log(json);
    }

    getLista = (key_usuario, fecha) =>{
        var sfecha = fecha.split("-");
        const INSTANCE = this
        return new Promise(resolve=>{
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.state.url+"/"+key_usuario+"/"+sfecha[0]+"/"+sfecha[1]+"/"+sfecha[2]+"/", true);
            xhr.onreadystatechange = function () {
                // Si la solicitud se completó con éxito
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(xhr.responseText, 'text/html');
                    var links = doc.querySelectorAll('a');
                    var resp = [];
                    for(var i = 0; i < links.length; i++) {
                        if(i>0){
                            resp.push(links[i].getAttribute('href'));
                        }
                    }
                    resolve(resp);
                }
            };
            xhr.send();
        });
        
    }


    getGpx = (key_usuario, fecha, file) => {
        var sfecha = fecha.split("-");

        var lista = this.getLista("04759652-b279-40ea-817d-dbfbfc39ffa5", "2023-10-26");

        const INSTANCE = this
        return new Promise(resolve=>{
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.state.url+"/" + key_usuario + "/" + sfecha[0] + "/" + sfecha[1] + "/" + sfecha[2] + "/"+file, true);
            xhr.onreadystatechange = function () {
                // Si la solicitud se completó con éxito
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var xmlDoc = new DomSelector(xhr.responseText);
                    // console.log(xmlDoc)
                    var json = [];
                    xmlDoc.getElementsByTagName("gpx")[0].children.map((child) => {
                        child.attributes["fecha_on"] = child.firstChild.firstChild.text;

                        json.push(child.attributes);
                    })
                    resolve(json)
                }
            };
            xhr.send();
        });
    }

    getMarkers = () => {
        if (!this.state?.data) return null;
        // console.log(this.state?.data)
        let ITEMS = [];
        
        this.state.data.map((o) => {
            ITEMS.push({
                latitude: parseFloat(o.lat),
                longitude: parseFloat(o.lon)
            })
            // ITEMS.push(<SMapView.SMarker latitude={o.lat} longitude={o.lon} onPress={() => {
            //     alert(o.fecha_on)
            // }}>
            // </SMapView.SMarker>)
        })
        return <SMapView.SPolyline
            coordinates={ITEMS}
            strokeColor='#f0f'
            strokeWidth={5}
        ></SMapView.SPolyline>
    }
    render() {
        return (
            <SPage disableScroll>
                <SMapView initialRegion={{
                    latitude: -17.783799,
                    longitude: -63.180,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}>
                    <></>
                    {this.getMarkers()}
                </SMapView>
            </SPage>
        )

    }
}