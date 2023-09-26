import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SInput, SPage, SText, STheme, SView } from 'servisofts-component';
import { Btn, Container } from '../Components';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleOnPress = () => {
        const code = this.input.getValue();
        if (!code) {
            this.setState({ error: "Debe ingresar un código de cliente." });
            return;
        }
        this.setState({ loading: true, error: "" })
        Model.tbcli.Action.getByCode(code).then(e => {
            console.log(e);
            this.setState({ loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e.error })
        })
    }
    render() {
        return (
            <SPage title={''}>
                <Container>
                    <SText fontSize={18} bold>Ingrese su código de cliente</SText>
                    <SHr h={32} />
                    <SView col={"xs-12"} row>
                        <SView flex>
                            <SInput ref={ref => this.input = ref}
                                type='number'
                                placeholder={"Código de cliente"}
                            />
                        </SView>
                        <Btn width={80} onPress={this.handleOnPress} loading={this.state.loading}>Buscar</Btn>
                    </SView>
                    <SHr />
                    <SText color={STheme.color.danger}>{this.state.error}</SText>
                    <SHr h={32} />
                    <SText fontSize={12} color={STheme.color.gray} col={"xs-12"}>{"Solo se admiten números. Este código será proporcionado por DHM."}</SText>
                    <SHr h={32} />
                    <SText fontSize={14} underLine>{"¿No tienes un código?  Click aquí."}</SText>
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);