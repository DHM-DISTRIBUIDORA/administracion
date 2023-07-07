import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SNavigation, SPage, SText, SView } from 'servisofts-component';
import { BottomNavigator, Container } from '../Components';
class index extends Component {
    render() {
        return <SPage
            hidden
            footer={this.footer()}
        >
            <SHr />
            <Container>
                <SView col={"xs-12"} row>
                    <SButtom type='danger' onPress={() => SNavigation.navigate("/clientes")}>IR A CLIENTES</SButtom>
                    <SHr />
                    <SButtom type='danger' onPress={() => SNavigation.navigate("/test")}>IR A TEST</SButtom>
                    <SView width={8} />
                    <SButtom type='danger' onPress={() => SNavigation.navigate("/sql")}>IR A SQL</SButtom>
                </SView>
            </Container>
        </SPage>
    }

    footer() {
        return <BottomNavigator url={"/pedidos"} />
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);