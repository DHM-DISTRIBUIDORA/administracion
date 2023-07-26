import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SNavigation, SText, SView } from 'servisofts-component'


type UsuarioSelectProps = {
    label: string,
    onChange: (usr: any) => void,
    defaultValue: any
}
export default class Select extends Component<UsuarioSelectProps> {
    static defaultProps = {
        label: "SELECCIONAR USUARIO",
    }
    state = {
        user: null,
        user: this.props.defaultValue
    }

    constructor(props){
        super(props);
        this.state.user = this.props.defaultValue
    }
    handleOnPress = () => {
        SNavigation.navigate("/usuario/list", {
            onSelect: (usr) => {
                this.props.onChange(usr)
                this.setState({ user: usr })
            }
        })
    }
    render() {
        return (
            <SView col={"xs-12"} height={50} card center onPress={this.handleOnPress}>
                {!this.state.user ? (
                    <SText>{this.props.label} </SText>
                ) : (
                    <>
                        <SText>{`${this.state?.user?.Nombres} ${this.state?.user?.Apellidos}`}</SText>
                        <SText>{`${this.state?.user?.Correo}`}</SText>
                    </>
                )}
            </SView >
        )
    }
}