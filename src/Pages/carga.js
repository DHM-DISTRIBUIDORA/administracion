import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, STheme, SThread, SView } from 'servisofts-component';
import Model from '../Model';
import SSocket from 'servisofts-socket'
import packageInfo from "../../package.json";
import DataBase from '../DataBase';
import DataBaseContainer from '../DataBase/DataBaseContainer';
const versionToNumber = (v) => {
    const array = v.split("\.");
    const vl = 100;
    let vn = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[array.length - i - 1];
        const vp = Math.pow(vl, i);
        vn += (vp * element)
    }
    console.log(vn)
    return vn;
}
export default class index extends Component {
    state = {}

    componentWillUnmount() {
        this.run = false;
    }
    componentDidMount() {
        this.run = true;

        new SThread(2500, "carga_hilo", false).start(() => {
            if (!this.run) return;
            if (Model.usuario.Action.getKey()) {
                SNavigation.replace("/root")
            } else {
                SNavigation.replace("/public")
            }
        })

        SSocket.sendPromise({
            component: "enviroments",
            type: "getVersion",
        }).then(e => {
            if (!e.data) return;
            const versionRequired = e.data
            if (versionToNumber(versionRequired) > versionToNumber(packageInfo.version)) {
                SNavigation.replace("/version_required")
                return;
            }
            // DataBaseContainer.sync();

        }).catch(e => {
            console.error(e)
        })

    }

    renderFooter() {
        if (!this.state.layout) return null;
        var h = this.state.layout.width / 4.46
        return <SView col={"xs-12"} height={h} style={{
            position: "absolute",
            bottom: 0,
        }}>
            <SIcon name={"adornocarga"} />
        </SView>
    }
    render() {
        return (
            <SPage hidden disableScroll center>
                <SView col={"xs-12"} flex center onLayout={(evt) => {
                    this.setState({ layout: evt.nativeEvent.layout })
                }}>
                    <SView col={"xs-6 sm-5 md-4 lg-3 xl-2 xxl-1.5"}>
                        <SIcon name={"LogoClear"} fill={STheme.color.text} stroke={STheme.color.text} />
                    </SView>
                    {/* {this.renderFooter()} */}
                </SView>
            </SPage>
        );
    }
}
