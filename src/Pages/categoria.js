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


    getComponent(obj) {
        return <SView col={"xs-12"} style={{ backgroundColor: this.params.color, borderRadius: 15 }} center
            onPress={() => {
                SNavigation.navigate("/producto", { pk: obj.catcod })
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
                    <SIcon name='Right' height={16} fill={this.params.color} />
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
            filter={(a) => (a.catcod + "").startsWith(this.params.pk) && a.nivel == 2}
            order={[{ key: "nombre", order: "asc" }]}
            // render={obj => this.getComponent(obj)} 
            render={(obj) => {
                // console.log(obj)
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