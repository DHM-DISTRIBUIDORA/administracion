import React, { Component } from 'react';
import { SView, SImage } from 'servisofts-component';
// import { ScrollView } from 'react-native'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center {...this.props}>
                
                    <SView col={"xs-12"} row height={115}
                        
                    >
                       
                        <SImage src={require('../../Assets/img/banner1.jpg')} style={{ resizeMode: "cover", borderRadius: 8 }} />
                        
                    </SView>
                
            </SView>
        );
    }
}
