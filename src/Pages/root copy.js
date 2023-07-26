import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native'
import { SHr, SPage, SText, SView, SLoad, STheme, SImage, SIcon, SNavigation, SList, SMath } from 'servisofts-component';
import { Banner, BottomNavigator, Container, TopBar, } from '../Components';
import Model from '../Model';
class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render_mas_vendidos() {
        var productos = Model.productos.Action.getAll();
        if (!productos) return <SLoad />
        return <SView col={"xs-12"} height={195}>
            <SList
                horizontal
                initSpace={8}
                data={productos}
                render={(data) => {
                    return <SView card width={318} height={150} style={{
                        overflow: "hidden"
                    }}>
                        <SText>{data}</SText>
                        {/* <SImage src={SSocket.api.root + "productos/" + data.key} style={{
                            resizeMode: "cover"
                        }} /> */}
                    </SView>
                }}
            />
            {/* </SScrollView2> */}
        </SView>
    }


    renderItem(obj) {
        return <SView width={170} card
            style={{
                padding: 10,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: "#E2E2E2",

            }}>
            <SView col={"xs-12"} row height={145}>
                <SImage src={require('../Assets/img/foto.png')} style={{ resizeMode: "contain" }} />
            </SView>
            <SHr />
            <SText fontSize={16}>{obj.nombre}</SText>
            {/* <SText fontSize={14} color={STheme.color.gray}>12 x 100ml.</SText> */}
            {/* <SHr height={20} /> */}
            <SView flex />
            <SView col={"xs-12"} row center>
                <SView col={"xs-8"}>
                    <SText fontSize={18} bold>Bs. {SMath.formatMoney(obj.Precio)}</SText>
                </SView>
                <SView col={"xs-4"} flex style={{ alignItems: "flex-end" }}
                    onPress={() => { }}
                >
                    <SIcon name='BtnMas' height={45} />
                </SView>
            </SView>
        </SView>
    }
    render() {
        let productos = Model.dm_productos.Action.getAll();
        console.log(productos)
        return <SPage
            // hidden
            navBar={this.navBar()}
            footer={this.footer()}
        >
            <SHr height={25} />
            <Container>
                <Banner />
                <SHr height={20} />
                <SView col={"xs-12"}>
                    <SText fontSize={20} bold>MÁS VENDIDOS</SText>
                    <SView col={"xs-12"} flex style={{ alignItems: "flex-end" }}
                        onPress={() => {
                            SNavigation.navigate("/producto")
                        }}
                    >
                        <SText color={STheme.color.primary} fontSize={16} bold>VER TODO</SText>
                    </SView>
                    <SHr />
                </SView>

            </Container>

            {/* {this.render_mas_vendidos()} */}
            <SView col={"xs-12"}>
                <ScrollView
                    horizontal
                    contentContainerStyle={{
                        width: null,
                    }}>
                        <SView width={8}/>
                    <SList horizontal data={productos} limit={10} render={obj => this.renderItem(obj)} />
                </ScrollView>
            </SView>
              <SHr height={30} />      
        </SPage >
    }

    navBar() {
        return <TopBar type={"menu"} title='' />
    }

    footer() {
        return <BottomNavigator url={"/root"} />
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);

