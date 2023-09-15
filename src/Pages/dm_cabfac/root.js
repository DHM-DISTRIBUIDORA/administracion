import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SNavigation, SPage, SText } from 'servisofts-component';

class index extends Component {
    idven = SNavigation.getParam("idven");
    render() {
        return (
            <SPage title={'index'}>

                <SText>{this.idven}</SText>

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);