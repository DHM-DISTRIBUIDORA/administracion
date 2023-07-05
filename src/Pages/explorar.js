import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SPage, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container } from '../Components';
class index extends Component {
    render() {
        return <SPage title={"Categorías"}
            footer={this.footer()}
        >
            <Container>
                <SHr height={20} />
                <SView col={"xs-12"} height={55} style={{ backgroundColor: STheme.color.primary, padding: 15, borderRadius: 15 }} row center
                    onPress={() => {

                    }}
                >
                    <SView col={"xs-11"} row>
                        <SIcon name='Logosolo' height={23} width={20} />
                        <SView width={15} />
                        <SText color={STheme.color.white} fontSize={18} bold>Bebés</SText>
                    </SView>
                    <SView col={"xs-1"} row>
                        <SIcon name='Right' height={16} fill={STheme.color.primary} />
                    </SView>
                </SView>
                <SHr height={10} />
                <SView col={"xs-12"} height={55} style={{ backgroundColor: STheme.color.primary, padding: 15, borderRadius: 15 }} row center
                    onPress={() => {

                    }}
                >
                    <SView col={"xs-11"} row>
                        <SIcon name='Logosolo' height={23} width={20} />
                        <SView width={15} />
                        <SText color={STheme.color.white} fontSize={18} bold>Bebidas sin alcohol</SText>
                    </SView>
                    <SView col={"xs-1"} row>
                        <SIcon name='Right' height={16} fill={STheme.color.primary} />
                    </SView>
                </SView>
                <SHr height={10} />
                <SView col={"xs-12"} height={55} style={{ backgroundColor: STheme.color.primary, padding: 15, borderRadius: 15 }} row center
                    onPress={() => {

                    }}
                >
                    <SView col={"xs-11"} row>
                        <SIcon name='Logosolo' height={23} width={20} />
                        <SView width={15} />
                        <SText color={STheme.color.white} fontSize={18} bold>Despensa</SText>
                    </SView>
                    <SView col={"xs-1"} row>
                        <SIcon name='Right' height={16} fill={STheme.color.primary} />
                    </SView>
                </SView>
                <SHr height={10} />
                <SView col={"xs-12"} height={55} style={{ backgroundColor: STheme.color.primary, padding: 15, borderRadius: 15 }} row center
                    onPress={() => {

                    }}
                >
                    <SView col={"xs-11"} row>
                        <SIcon name='Logosolo' height={23} width={20} />
                        <SView width={15} />
                        <SText color={STheme.color.white} fontSize={18} bold>Higiene y cuidados</SText>
                    </SView>
                    <SView col={"xs-1"} row>
                        <SIcon name='Right' height={16} fill={STheme.color.primary} />
                    </SView>
                </SView>
            </Container>
        </SPage>
    }

    footer() {
        return <BottomNavigator url={"/explorar"} />
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);