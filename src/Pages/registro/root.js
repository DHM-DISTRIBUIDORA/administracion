import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, SView, STheme, SIcon } from 'servisofts-component';
import { AccentBar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import BtnSend from './components/BtnSend';
import Header from './components/Header';

class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.params = SNavigation.getAllParams();
    }

    render() {
        var defaultData = {
            ...this.params,
        };
        return (
            <SPage  >
                <Header />
                <Container>
                    <SView col={"xs-12"} center>
                        <SHr height={20}/>
                        <SText fontSize={26} color={STheme.color.text}>Regístrate</SText>
                    </SView>
                    <SForm
                        ref={(form) => { this.form = form; }}
                        col={"xs-12"}
                        inputProps={{
                            col: "xs-12",
                            separation: 12
                        }}
                        style={{
                            alignItems: "center",
                        }}
                        inputs={{
                            Nombres: { placeholder: "Nombre", isRequired: true, defaultValue: defaultData.Nombres },
                            Apellidos: { placeholder: "Apellidos", isRequired: true, defaultValue: defaultData.Apellidos },
                            Correo: { placeholder: "Correo", type: "email", isRequired: true, defaultValue: defaultData.Correo },
                            FechaNacimiento: { placeholder: "Fecha de Nacimiento", isRequired: false, type: "date", isRequired: true },
                            //telefono: { placeholder: "Celular", isRequired: true, type: "telefono", isRequired:true},
                            Telefono: { placeholder: "Celular", isRequired: false, isRequired: true },
                            CI: { placeholder: "Carnet de Identidad", isRequired: false, isRequired: true },
                            Password: { placeholder: "Password", isRequired: true, type: "password" },
                            RepPassword: { placeholder: "Repetir password", type: "password", isRequired: true },
                        }}
                        onSubmit={(values) => {

                            if (this.state.envio == 0) {
                                SPopup.alert('Debes aceptar los términos y condiciones');
                                // var error = "Debes aceptar los términos y condiciones"
                                // SPopup.open({ key: "errorRegistro", content: this.alertError(error) });
                            } else {
                                Model.usuario.Action.registro({
                                    data: { ...values }
                                }).then(resp => {
                                    SNavigation.replace('/');

                                }).catch(e => {
                                    SPopup.alert("Ya existe un usuario con este correo.")
                                })

                            }

                        }}
                    />
                    <SHr height={20} />
                    <SView col={"xs-12"} row>
                        <SView
                            col={'xs-1'}
                            onPress={() => {
                                this.setState(this.state.envio == 0 ? { envio: 1 } : { envio: 0 });
                            }}>
                            <SIcon
                                name={this.state.envio != 0 ? 'IconCheckedOk' : 'IconChecked'}
                                fill={STheme.color.primary}
                                width={20}
                                height={20}></SIcon>
                        </SView>
                        <SView
                            col={'xs-11'}
                            onPress={() => {
                                SNavigation.navigate('/privacidad');
                            }}>
                            <SText
                                color={STheme.color.text}
                                fontSize={14}
                                style={{ textDecorationLine: 'underline' }}>
                                He leído y acepto los términos de uso y la Política de Privacidad
                            </SText>
                        </SView>
                    </SView>
                    <SHr height={20} />
                    <BtnSend onPress={() => this.form.submit()}>{"REGISTRAR"}</BtnSend>
                    <SHr height={30} />
                    {/* <SectionApis /> */}
                    <SHr height={35} />
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);