import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SLoad, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component'
import { Container } from '../../Components'
import Model from '../../Model'

export default class notaventa extends Component {
    state = {
        idven: 0,
    }
    constructor(props) {
        super(props)
        this.state.idven = SNavigation.getParam("idven");
    }

    componentDidMount() {
        Model.tbven.Action.getVenta({ idven: this.state.idven }).then((e) => {
            console.log(e);
            this.setState({ data: e?.data[0] })
        }).catch(e => {
            SPopup.alert(e.error)
            console.error(e)
        })
    }


    renderWithData() {
        const data = this.state.data;
        if (!data) return <SLoad />
        return <SView col={"xs-12"} card padding={4}>
            <SText>{JSON.stringify(data, "\n", "\t")}</SText>
        </SView>
    }
    render() {

        return <SPage>
            <Container>
                {this.renderWithData()}
            </Container>
        </SPage>
    }
}