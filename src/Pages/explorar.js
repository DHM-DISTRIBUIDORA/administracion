import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SList, SList2, SLoad, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { BottomNavigator, Categoria, Container } from '../Components';
import Model from '../Model';
class index extends Component {

    state = {
        load: false
    }

    componentDidMount() {
        new SThread(10, "load").start(() => {
            this.setState({ load: true })
        })
    }
    getLista() {
        var color = "";
        var contador = 0;
        const colores = ['#85BFD0', '#9B9AD9', '#90D598', '#F5AD76', '#F18684', '#E36188', '#76DEFC', '#D289E1', '#5097F8', '#17C3A5', '#A7C1D4', '#87e4ec'];
        // const cat = Model.dm_categorias.Action.getAll();
        const cat = Model.tbprdlin.Action.getAll()
        if (!cat) return <SLoad />
        return <SList2
            horizontal
            data={cat}
            space={0}
            filter={(a) => a.linniv == 1}
            order={[{ key: "linnom", order: "asc" }]}
            // render={obj => this.getComponent(obj, contador)} />
            render={(obj, i) => {
                if (contador < colores.length) {
                    color = colores[contador];
                    contador++;
                } else {
                    contador = 1;
                }
                return <Categoria.Card obj={obj} color={color} indice={contador} />
            }}
        />
    }
    renderData() {
        if (!this.state.load) return <SLoad />
        return <Container >
            <SHr height={20} />
            {this.getLista()}
            <SHr height={20} />
        </Container>
    }
    render() {
        return <SPage title={"Categorías"}
            footer={this.footer()}
        >
            {this.renderData()}
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