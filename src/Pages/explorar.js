import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SList, SList2, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Categoria, Container } from '../Components';
import Model from '../Model';
class index extends Component {

  
    getLista() {
        var color = "";
        var contador = 0;
        const colores = ['#85BFD0', '#9B9AD9', '#90D598', '#F5AD76', '#F18684', '#E36188', '#76DEFC', '#D289E1', '#5097F8', '#17C3A5', '#A7C1D4', '#87e4ec'];
        const cat = Model.dm_categorias.Action.getAll();
        if (!cat) return <SLoad />
        console.log(cat)
        return <SList2
            horizontal
            data={cat}
            space={0}
            filter={(a) => a.nivel == 1}
            order={[{ key: "nombre", order: "asc" }]}
            // render={obj => this.getComponent(obj, contador)} />
            render={(obj, i) => {
                console.log(contador + " - "+colores.length)
                if (contador < colores.length) {
                    color = colores[contador];
                    contador++;
                } else {
                    contador = 1;
                }
                console.log(color)
                return <Categoria.Card obj={obj} color={color} indice={contador}/>
            }}
        />
    }
    render() {
        return <SPage title={"Categorías"}
            footer={this.footer()}
        >
            <Container >
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