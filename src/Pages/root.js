import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native'
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SView } from 'servisofts-component';
// import { BottomNavigator, NavBar, Pedido, Restaurante, TopBar } from '../Components';
// import Model from '../Model';
import SSocket from 'servisofts-socket'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
   

    render() {
       
        return (
            <SPage
                hidden
            >
                <SView col={"xs-12"}>
                    <SText >Holaa!!</SText>
                </SView>
            </SPage>
        );
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);