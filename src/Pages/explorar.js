import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText, SView } from 'servisofts-component';
import { BottomNavigator } from '../Components';
class index extends Component {
    render() {
        return <SPage 
        hidden
        footer={this.footer()}
        >
            <SView col={"xs-12"}>
                <SText >Holaa!! soy el explorar</SText>
            </SView>
        </SPage>
    }

    footer() {
        return <BottomNavigator url={"/explorar"} />
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);