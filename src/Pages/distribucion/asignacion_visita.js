import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SInput, SLoad, SNavigation, SPage, SText, SView } from 'servisofts-component';
import { Container } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getSelectVendedor() {
        return <SView col={"xs-12"} card height={35} center onPress={() => {
            SNavigation.navigate("/tbemp", {
                onSelect: (e) => {
                    this.setState({ vendedor: e })
                }
            })
        }}>
            <SText>{this.state.vendedor ? this.state.vendedor.empnom : "SELECCIONA UN VENDEDOR"}</SText>
        </SView>
    }

    getSelectDayOfWeek() {
        return <SInput type='select' options={["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]} />
    }

    getRutaDia() {
        let rutaDia = Model.tbrutadia.Action.getAll();
        if (!rutaDia) return <SLoad />
        return <SView col={"xs-12"} >
            <SText>Rutas</SText>
        </SView>
    }
    render() {
        return (
            <SPage title={'Asignacion de visitas'}>
                <Container>
                    {this.getSelectVendedor()}
                    <SHr />
                    {this.getSelectDayOfWeek()}
                    <SHr />
                    {this.getRutaDia()}
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);