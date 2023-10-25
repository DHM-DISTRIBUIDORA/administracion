import React, { Component } from 'react';
import { View, PanResponder, Platform } from 'react-native';
import Selection from './Selection';


type PropsType = {
    direcction?: "top" | "bottom" | "left" | "right",
    size: any,
}
class ResizableBoxVertical extends Component<PropsType> {
    constructor(props) {
        super(props);
        this.state = {
            height: this.props.height ?? 100,
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                // this.setEnabled(false);
                Selection.preventSelection();
                this.start = this.state.height
            },
            onPanResponderMove: (evt, gestureState) => {

                this.setState({ height: this.start - gestureState.dy, });
            },
            onPanResponderRelease: (evt, gestureState) => {
                Selection.allowSelection();
                // this.setEnabled(true);
                // this.setState({
                //     width: this.state.width + gestureState.dx,
                // });
            },
        });
    }


    render() {
        return (
            <View style={{
                width: "100%",
                height: this.state.height,
            }}>
                {this.props.children}
                <View style={{
                    height: 8,
                    width: "100%",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    cursor: "n-resize"
                }}
                    {...this.panResponder.panHandlers}
                >
                </View>
            </View >
        );
    }
}

export default ResizableBoxVertical;
