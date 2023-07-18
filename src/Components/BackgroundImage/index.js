import React, { Component } from 'react';
import { View } from 'react-native';
import { SGradient, SImage, STheme, SView } from 'servisofts-component';
type type = {
    source: Object,
    contraste: String

}
export default class BackgroundImage extends Component<type> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getGradient = (pros) => {
        if (!this.state.layout) return null;
        const { width, height } = this.state.layout
        let deg = 35;
        if (width > height) {
            deg = 10;
        }
        return <SGradient colors={[STheme.color.primary, STheme.color.background, STheme.color.background]} deg={deg} />
    }
    getBackground = () => {
        var source = this.props.source;
        if (!source) {
            if (STheme.getTheme() == 'dark') {
                source = require("./3.jpg");
            } else {
                source = require("./w4.jpg");
            }
        }
        return <View style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            opacity: 0.6,
            ...this.props.style,
        }} onLayout={(e) => {
            this.setState({ layout: e.nativeEvent.layout })
        }}>
            {this.getGradient()}
            {/* <SImage src={source} style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                opacity: 0.6,
            }} /> */}
            {/* <View style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                position: "absolute",
                opacity: (0.7 + (Platform.OS == "web" ? -0.2 : 0)),
                backgroundColor: (this.props.contraste ? this.props.contraste : "#00000044")
            }}>

            </View> */}
        </View>
    }
    render() {
        // if (!this.props.source) {
        //     return <View />
        // }
        return this.getBackground()
    }
}
