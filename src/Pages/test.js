import React, { Component } from 'react';
import { Animated } from 'react-native';
import Svg from "react-native-svg";
import { Path, Rect, Line, Circle } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const arrPaths = [
    "M0 1H1L0 0",
    "M0 1H26L0 0"
    
]

export default class index extends Component {

    animValue = new Animated.Value(0)

    componentDidMount() {
        console.log("asdasd")
        new Animated.timing(this.animValue, {
            toValue: arrPaths.length,
            duration: 1000 * arrPaths.length
        }).start()
    }
    render() {
        return <Svg
            width="200"
            height="200"
            viewBox="0 0 26 26"
        >
            <AnimatedPath

                d={this.animValue.interpolate({
                    inputRange: [...arrPaths.map((a, i) => i)],
                    outputRange: arrPaths
                })}
                fill="#FA790E" stroke="#fff" />
        </Svg>
    }


}
