import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, SText } from 'servisofts-component';
import Model from '../../Model';
import SList from 'servisofts-component/Component/SList2';
import { Container } from '../../Components';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderData() {
        const clientes = Model.dm_clientes.Action.getAll();
        if (!clientes) return <SLoad />
        return <SList
            buscador
            data={clientes}
            limit={20}
        />
    }
    render() {
        return (
            <SPage title={'Clientes'}>
                <Container>
                    {this.renderData()}
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);