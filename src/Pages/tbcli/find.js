import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SForm, SPage, SPopup } from 'servisofts-component'
import { Container } from '../../Components'
import Model from '../../Model'

export default class find extends Component {

    handlePress = ({ idcli }) => {
        Model.tbcli.Action.find(idcli).then(e => {
            SPopup.alert(JSON.stringify(e))
            
        }).catch(e => {
            console.error(e);
        })
    }
    render() {
        return (
            <SPage>
                <Container>
                    <SForm inputs={{
                        "idcli": { type: "number", label: "Codigo de cliente", defaultValue: 2683 },
                    }}
                        onSubmitName={"ENVIAR"}
                        onSubmit={this.handlePress}
                    />
                </Container>
            </SPage>
        )
    }
}