import DomSelector from 'react-native-dom-parser';
import React, { Component } from 'react'
import { SPage, SText } from 'servisofts-component'
import { Container } from '../../Components'

export default class root extends Component {

    state = {
        url: "https://repo.dhm.servisofts.com/dhm/videos/"
    };

    componentDidMount(){
        this.getVideos();
    }

    getVideos = () => {
        
        const INSTANCE = this
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.state.url + "/", true);
        xhr.onerror = function () {
            reject()
        }
        xhr.onreadystatechange = function () {
            // Si la solicitud se completó con éxito
            if (xhr.readyState == 4 && xhr.status == 200) {
                // var parser = new DOMParser();

                // var doc = parser.parseFromString(xhr.responseText, 'text/html');
                var doc = new DomSelector(xhr.responseText);
                var links = doc.getElementsByTagName('a');
                var resp = [];
                for (var i = 0; i < links.length; i++) {
                    if (i > 0) {
                        resp.push(links[i]?.attributes?.href);
                    }
                }

                INSTANCE.state["videos"] = resp;
                console.log(state["videos"]);
                return;
            };
            xhr.send();
        }
    }

    paintVideos(){
        if(!this.state.videos) return <SText>Cargando...</SText>

        return <SText>{JSON.stringify(this.state["videos"])}</SText>
    }

    render() {
        return <SPage title={"Videos"}>
            <Container>
                <SText>{this.paintVideos()}</SText>

            </Container>
        </SPage>
    }
}