import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, STheme, SThread, SView } from 'servisofts-component';
import Model from '../Model';

class index extends Component {
    state = {}
    componentDidMount() {
        new SThread(2500, "carga_hilo", false).start(() => {
            if(Model.usuario.Action.getKey()){
                SNavigation.replace("/root")
            }else{
                SNavigation.replace("/login")
            }
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
                <SView col={"xs-12"} flex backgroundColor={STheme.color.primary} center onLayout={(evt) => {
                    this.setState({ layout: evt.nativeEvent.layout })
                }}>
                    <SView col={"xs-6 sm-5 md-4 lg-3 xl-2 xxl-1.5"}>
                        <SIcon name={"LogoWhite"} fill={STheme.color.white} />
                    </SView>
                    {/* {this.renderFooter()} */}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);