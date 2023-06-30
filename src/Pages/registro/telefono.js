import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { AccentBar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import BtnSend from './components/BtnSend';
import Header from './components/Header';

class telefono extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();
    }


    onSubmit(values) {
        Model.usuario.Action.validateRegistro({
            ...this.params,
            ...values,
        }).then(resp => {
            SNavigation.navigate("/registro/sms", {
                callback: "/registro/registrando",
                ...this.params,
                ...values,
            })
        }).catch(e => {
            SPopup.alert("Ya existe un usuario con este Telefono.")
        })

    }

    render() {
        var defaultData = {
            ...this.params
        };
        return (
            <SPage footer={<AccentBar />} >
                <Header title={"Introduce tu número telefónico, al cual enviaremos un código por SMS."} />
                <Container>
                    <SForm
                        col={"xs-12"}
                        ref={(form) => { this.form = form; }}
                        inputProps={{ separation: 16 }}
                        inputs={{
                            "Telefono": { placeholder: "Teléfono", isRequired: true, defaultValue: defaultData["Telefono"], type: "phone" },
                        }}
                        onSubmit={this.onSubmit.bind(this)}
                    />
                    <SHr height={20} />
                    <BtnSend onPress={() => this.form.submit()}>{"CONTINUAR"}</BtnSend>
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(telefono);