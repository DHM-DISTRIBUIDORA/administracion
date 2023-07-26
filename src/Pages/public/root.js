import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native'
import { SHr, SPage, SText, SView, SLoad, STheme, SImage, SIcon, SNavigation, SList, SMath } from 'servisofts-component';
import { Banner, BottomNavigator, Container, TopBar, } from '../../Components';
import Model from '../../Model';
const FotoPerfil = require('../../Assets/img/foto.png')
class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            btn: 0
        };
    }


    renderItem(obj) {
        return <SView width={170} height={280} card
            style={{
                padding: 9,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: STheme.color.card,
            }}>
            <SView col={"xs-12"} height={145} card>
                <SImage src={FotoPerfil} style={{ resizeMode: "contain" }} />
            </SView>
            <SHr />
            <SText fontSize={16}>{obj.prdnom}</SText>
            {/* <SText fontSize={14} color={STheme.color.gray}>12 x 100ml.</SText> */}
            {/* <SHr height={20} /> */}
            <SView flex />
            <SView col={"xs-12"} row center>
                <SView col={"xs-8"}>
                    <SText fontSize={18} bold>Bs. {SMath.formatMoney(obj.prdpoficial)}</SText>
                </SView>
                <SView col={"xs-4"} style={{ alignItems: "flex-end" }}
                    onPress={() => {
                        const data = {
                            [obj.idprd]: { cantidad: 1, data: obj },
                        }
                        let productos_data = Model.carrito.Action.getState().productos;
                        Object.assign(productos_data, data);
                        Model.carrito.Action.setState({ productos_data });
                        this.setState({ btn: 1 })
                    }}
                >
                    {/* <SIcon name={(this.state.btn == 0) ? 'BtnMas' : 'Check2'} height={45} /> */}
                    <SIcon name='BtnMas' height={30} />
                </SView>
            </SView>
        </SView>
    }


    publicidadItem({ src }) {
        return <SView width={140} height={140} padding={4}>
            <SImage enablePreview src={src} style={{ resizeMode: "contain", borderRadius: 8 }} />
        </SView>
    }
    publicidadBanners() {
        return <FlatList horizontal data={[
            { src: require('../../Assets/img/banner1.jpg') },
            { src: require('../../Assets/img/banner2.jpg') },
            { src: require('../../Assets/img/banner3.jpg') },
            { src: require('../../Assets/img/banner4.jpg') },
            { src: require('../../Assets/img/banner5.jpg') },
            { src: require('../../Assets/img/banner6.jpg') },
            { src: require('../../Assets/img/banner1.jpg') },
            { src: require('../../Assets/img/banner2.jpg') },
            { src: require('../../Assets/img/banner3.jpg') },
            { src: require('../../Assets/img/banner4.jpg') },
            { src: require('../../Assets/img/banner5.jpg') },
            { src: require('../../Assets/img/banner6.jpg') },
            { src: require('../../Assets/img/banner1.jpg') },
            { src: require('../../Assets/img/banner2.jpg') },
            { src: require('../../Assets/img/banner3.jpg') },
            { src: require('../../Assets/img/banner4.jpg') },
            { src: require('../../Assets/img/banner5.jpg') },
            { src: require('../../Assets/img/banner6.jpg') },
        ]}
            renderItem={row => this.publicidadItem(row.item)}
        />
    }

    render() {
        // let productos = Model.dm_productos.Action.getAll();
        var productos = Model.tbprd.Action.getAllSimple();
        if (!productos) return <SLoad />
        // console.log(productos)
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
                            SNavigation.navigate("/explorar")
                        }}
                    >
                        <SText color={STheme.color.primary} fontSize={16} bold>VER TODO</SText>
                    </SView>
                    <SHr />
                </SView>

            </Container>
            <SView col={"xs-12"}>
                <ScrollView
                    horizontal
                    contentContainerStyle={{
                        width: null,
                    }}>
                    <SView width={8} />
                    <SList
                        horizontal
                        filter={(a) => a.stock != 0}
                        data={productos} limit={10}
                        render={obj => this.renderItem(obj)}
                    />
                </ScrollView>
            </SView>
            <SHr height={25} />
            <SView col={"xs-12"}>
                {this.publicidadBanners()}
            </SView>
            <SHr height={30} />
        </SPage >
    }

    navBar() {
        return <TopBar type={"menu"} title='' />
    }

    footer() {
        return <BottomNavigator url={"/public"} />
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);

