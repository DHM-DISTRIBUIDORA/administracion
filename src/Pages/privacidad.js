import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText, SView } from 'servisofts-component';
class index extends Component {
    render() {
        return <SPage hidden>
            <SView col={"xs-12"}>
                <SText >Holaa!! soy el root</SText>
            </SView>
        </SPage>
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);