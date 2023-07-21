import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SMath, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PButtomSmall from '../PButtomSmall';
export type ProductoCardPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<ProductoCardPropsType> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    enviarDatosItems = () => {
        const datos = {
            tbprd: this.props.data,
            items: this.state.count,
            precio: this.props.data.prdpoficial,
        };
        this.props.items(datos);
    };

    render() {
        var active = true;
        var Stock = 10; // por determinar
        var { prdpoficial, prdunid, catcod, idalm, prdnom, prdcod, prdcxu } = this.props.data;
        (Stock <= 0) ? active = false : active = true;
        return (
            <SView col={"xs-12"} card row {...this.props}
                pointerEvents={!active ? 'none' : 'auto'}
                style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    padding: 10,
                    opacity: active ? 1 : 0.6,
                    borderColor: !active ? "#D20C0C" : "#E2E2E2"
                }}
            >
                <SView col={"xs-3"} height={105}>
                    <SImage src={require('../../Assets/img/foto.png')} style={{ resizeMode: "contain" }} />
                </SView>
                <SView col={"xs-0.5"}></SView>
                <SView col={"xs-8.5"}>
                    <SText fontSize={16}>{prdnom}</SText>
                    <SView col={"xs-12"} row>
                        <SText fontSize={11} color={STheme.color.gray}>Stock: {Stock} </SText>
                        <SView width={5}><SText fontSize={11}>|</SText></SView>
                        <SText fontSize={11} color={STheme.color.gray}> Ud: {prdunid} </SText>
                        <SView width={5}><SText fontSize={11}>|</SText></SView>
                        <SText fontSize={11} color={STheme.color.gray}> UxC: {prdcxu}</SText>
                    </SView>

                    <SHr />
                    <SView row>
                        <SView col={"xs-7"} row center>
                            <SView center width={45} height={45} style={{ borderRadius: 17, borderColor: "#E2E2E2", borderWidth: 1 }}
                                onPress={() => {
                                    if (this.state.count <= 0) return;
                                    this.setState({ count: this.state.count - 1 });
                                }}
                            >
                                <SIcon name='Menos' height={4} />
                            </SView>
                            <SView row  >
                                <SView width={10} />
                                <SText fontSize={16}>{this.state?.count ? this.state.count : 0}</SText>
                                <SView width={10} />
                            </SView>
                            <SView center width={45} height={45} style={{ borderRadius: 17, borderColor: "#E2E2E2", borderWidth: 1 }}
                                onPress={() => {
                                    if (this.state.count >= Stock) return;
                                    this.setState({ count: this.state.count + 1 })
                                }}
                            >
                                <SIcon name='Mas' height={18} />
                            </SView>
                        </SView>
                        <SView col={"xs-5"} style={{ alignItems: "flex-end" }}>
                            <SText fontSize={18} bold>Bs. {SMath.formatMoney(prdpoficial)}</SText>
                            <SHr />
                            {this.state.count >= 1 ? <PButtomSmall fontSize={13}
                                onPress={this.enviarDatosItems}
                            // onPress={() => {
                            //     this.enviarDatosItems

                            // }}
                            >Añadir
                            </PButtomSmall> : <SView height={24} />}
                        </SView>
                    </SView>
                </SView>
            </SView>
        );
    }
}
export default (index);