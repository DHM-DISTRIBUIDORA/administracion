import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SList, SLoad, SPage, SText, STheme, SView, SNavigation } from 'servisofts-component';
import { BottomNavigator, Categoria, Container } from '../Components';
import Model from '../Model';
class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.params = SNavigation.getAllParams();

    }

    getLista() {
        // const cat = Model.dm_categorias.Action.getAll();
        const cat = Model.tbprdlin.Action.getAll();
        if (!cat) return <SLoad />
        console.log(cat)
        return <SList
            data={cat}
            limit={20}
            // filter={(a) => a.nivel == 1}
            filter={(a) => (a.lincod + "").startsWith(this.params.pk) && a.linniv == 2}
            order={[{ key: "linnom", order: "asc" }]}
            render={(obj) => {
                return <Categoria.Card2 obj={obj} color={this.params.color}  />
            }}
        />

    }
    render() {
        return <SPage title={"Categorías"}
            footer={this.footer()}
        >
            <Container>
                <SHr height={20} />
                {this.getLista()}
                <SHr height={20} />
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