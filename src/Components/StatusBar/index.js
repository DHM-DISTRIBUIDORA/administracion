import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { SDate, SIcon, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hora: new SDate().toString("hh:mm"),
            isConected: false
        };
    }
    hilo() {
        new SThread(1000, "seg", true).start(() => {
            if (this.state.hora !== new SDate().toString("hh:mm")) {
                this.setState({ hora: new SDate().toString("hh:mm") });
            }
            if(!SSocket.getSession()) return null;
            if (SSocket.getSession().isOpen()) {
                if (!this.state.isConected) {
                    this.setState({ isConected: true });
                }
            } else {
                if (this.state.isConected) {
                    this.setState({ isConected: false });
                }
            }
            this.hilo();

        })
    }

    render() {
        if (Platform.OS != "web") return null;
        this.hilo();
        return (
            <SView col={"xs-12"} height={30} backgroundColor={STheme.color.primary} >
                <SView col={"xs-12"} row flex style={{
                    paddingLeft: 8, paddingRight: 8,
                }}>
                    <SView width={30} center flex >
                        <SText fontSize={14} color={"#fff"}>{this.state.hora}</SText>
                    </SView>
                    <SView row >
                        <SView width={25} center  >
                            <SIcon name={"AppSignal"} width={18} fill={this.state.isConected ? "#fff" : STheme.color.lightGray} />
                        </SView>
                        <SView width={30} center  >
                            <SIcon name={"AppWifi"} width={19} fill={this.state.isConected ? "#fff" : STheme.color.lightGray} />
                        </SView>
                        <SView width={25} center  >
                            <SIcon name={"AppBaterry"} width={25} fill="#fff" />
                        </SView>
                    </SView>
                </SView>
            </SView>
        );
    }
}

export default StatusBar