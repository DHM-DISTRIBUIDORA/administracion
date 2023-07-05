import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SList, SLoad, SPage, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container } from '../Components';
import Model from '../Model';
class index extends Component {

    getComponent(obj) {
        return <SView col={"xs-12"} style={{ backgroundColor: STheme.color.primary, borderRadius: 15 }} center
            onPress={() => {

            }}
        >
            <SHr />
            <SView col={"xs-12"} row center>
                <SView width={8} />
                <SIcon name='Logosolo' height={25} width={25} />
                <SView width={15} />
                <SView flex >
                    <SText color={STheme.color.white} fontSize={18} bold>{obj.nombre}</SText>
                    <SText color={STheme.color.white} fontSize={8} >{obj.catcod}</SText>
                </SView>
                <SView width={20}>
                    <SIcon name='Right' height={16} fill={STheme.color.primary} />
                </SView>
                <SView width={4} />
            </SView>
            <SHr />
        </SView>
    }
    getLista() {
        const cat = Model.dm_categorias.Action.getAll();
        if (!cat) return <SLoad />
        console.log(cat)
        return <SList
            data={cat}
            limit={20}
            // filter={(a) => a.nivel == 1}
            filter={(a) => (a.catcod+"").startsWith("01") && a.nivel == 2}
            order={[{ key: "nombre", order: "asc" }]}
            render={obj => this.getComponent(obj)} />
    }
    render() {
        return <SPage title={"Categorías"}
            footer={this.footer()}
        >
            <Container>
                <SHr height={20} />
                {this.getLista()}
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