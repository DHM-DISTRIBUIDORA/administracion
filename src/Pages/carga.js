import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SImage, SNavigation, SPage, SStorage, SText, STheme, SThread, SView } from 'servisofts-component';
import Model from '../Model';

const IS_FIRST_INSTALL_KEY = "IS_FIRST_INSTALL_KEY"
let ESCOGIO_DIRECCION = false;
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        Model.restaurante.Action.getAll();
        Model.horario.Action.getAll();
        Model.pack.Action.getAll();
        Model.costo_envio.Action.getAll();
        let isFirst = false;
        SStorage.getItem(IS_FIRST_INSTALL_KEY, (a) => {
            isFirst = a;
        })
        new SThread(2500, "carga_hilo", false).start(() => {
            if (!isFirst) {
                SStorage.setItem(IS_FIRST_INSTALL_KEY, new SDate().getTime() + "");
                SNavigation.replace("/intro")
                return;
            }
            if (!ESCOGIO_DIRECCION) {
                ESCOGIO_DIRECCION = true;
                SNavigation.replace("/direccion")
                return;
            }
            SNavigation.replace("/root")

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
            <SPage hidden disableScroll >
                <SView col={"xs-12"} flex backgroundColor={STheme.color.primary} center onLayout={(evt) => {
                    this.setState({ layout: evt.nativeEvent.layout })
                }}>
                    <SView col={"xs-6 sm-5 md-4 lg-3 xl-2 xxl-1.5"}>
                        <SIcon name={"logowhite"} fill={STheme.color.secondary} />
                    </SView>
                    <SHr height={100} />
                    {this.renderFooter()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);