
import React, { Component } from 'react';
import { SForm, SHr, SIcon, SNavigation, SPopup, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import CryptoJS from 'crypto-js';

export default class SectionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    submit() {
        this.form.submit();
    }
    fadeOut() {
        Animated.timing(this.animSize, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
        }).start(() => {
            this.state.width = 0;
            this.setState({ isOpen: false, });
        });
    }
    render() {
        return (
            <SView col={"xs-12"} center>
                <SForm
                    ref={(ref) => { this.form = ref; }}
                    props={{
                        col: "xs-12",
                    }}
                    inputProps={{
                        separation: 16,
                    }}
                    inputs={{
                        usuario: {
                            placeholder: "Correo",
                            isRequired: true, keyboardType: "email-address", autoCapitalize: "none", type: "email", onKeyPress: (evt) => {
                                if (evt.key === "Enter") {
                                    this.form.focus("password");
                                }
                            },
                            // icon: <SIcon name={"InputEmail"} width={40} height={30} />
                        },
                        password: {
                            placeholder: "Contraseña",
                            type: "password", isRequired: true, onKeyPress: (evt) => {
                                if (evt.key === "Enter") {
                                    this.form.submit();
                                }
                            },
                            // icon: <SIcon name={"InputPassword"} width={40} height={30} />
                        },
                    }}
                    loading={this.state.loading}
                    error={this.state.error}
                    onSubmit={(data) => {
                        if (data) {
                            data["password"] = CryptoJS.MD5(data["password"]).toString();
                            data["usuario"] = data["usuario"].toLowerCase();
                            // Parent.Actions.login(data, this.props);
                            Model.usuario.Action.loginByKey(data).then((resp) => {
                                if (resp.data.estado == "0") {
                                    SPopup.alert("Usuario eliminado");
                                    this.setState({ loading: false, error: "Usuario eliminado" })

                                    Model.usuario.Action.unlogin();
                                    // SNavigation.reset("/");
                                    SNavigation.navigate("/login");
                                    this.fadeOut();
                                } else {
                                    SNavigation.goBack();
                                }
                               
                            }).catch((e) => {
                                if (e?.error == "error_password") {
                                    this.setState({ loading: false, error: "Usuario o contraseña incorrectos." })
                                } else {
                                    this.setState({ loading: false, error: "Ha ocurrido un error al iniciar sesión." })
                                }
                                // SPopup.alert("Error en los datos");
                            })

                        }
                    }}
                />
            </SView >
        );
    }
}
