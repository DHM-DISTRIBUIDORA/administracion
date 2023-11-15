import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, SText } from 'servisofts-component';
import Model from '../../Model';
import SList from 'servisofts-component/Component/SList2';
import { Container } from '../../Components';
import ErrorBoundary from './ErrorBoundary';
import BuggyCounter from './BuggyCounter';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={'Clientes'}>
                <Container>
                    <SText>Preciona sobre el numero para lanzar la exeption. {a}</SText>
                   
                </Container>
            </SPage>
        );
    }
}
export default (index);