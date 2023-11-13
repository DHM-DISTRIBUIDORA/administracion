import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SPage, SText } from 'servisofts-component'
import { Container } from '../../Components'

export default class root extends Component {

    state = {
        url: "https://repo.servisofts.com/guide/dhm"
    };

    componentDidMount(){
        init();
    }
    init=async()=>{
      state["videos"] = this.getVideos();
      console.log(state["videos"])
    }

  getVideos = () => {
    
    const INSTANCE = this
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', state.url + "/", true);
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
                resolve(resp);
                return;
            }
        };
        xhr.send();
    });
  }

  render() {
    return <SPage title={"Videos"}>
        <Container>
            <SText>TODO: Colocar video tutoriales.</SText>
        </Container>
    </SPage>
  }
}