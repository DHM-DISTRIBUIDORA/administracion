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
        };
    }

    // render_foto_perfil() {
    //     var { key } = this.props.data;
    //     return <SView width={50} height={50} style={{
    //         left: 8,
    //         borderRadius: 100,
    //         overflow: "hidden",
    //         position: "absolute",
    //         borderColor: STheme.color.secondary,
    //         borderWidth: 1,
    //     }} card>
    //         <SImage src={SSocket.api.root + "restaurante/" + key} style={{
    //             resizeMode: "cover"
    //         }} />
    //     </SView>
    // }
    // render_portada() {
    //     var { key, nombre } = this.props.data;
    //     return <SView col={"xs-12"} height={100} backgroundColor={STheme.color.card}>
    //         <SImage src={SSocket.api.root + "restaurante/portada/" + key} style={{
    //             resizeMode: "cover"
    //         }} />
    //     </SView>
    // }
    // handlePress() {
    //     if (!this.props.onPress) return null;
    //     this.props.onPress(this.props.data)
    // }
    render() {
        var { key, nombre, proximo_horario, distancia } = this.props.data;

        return (
            <SView col={"xs-12"} card row
                style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: "#E2E2E2",
                    padding: 10
                }}
            >
                <SView col={"xs-3"} height={115}>
                    {/* <SView col={"xs-12"} row height={115}> */}
                    <SImage src={require('../../Assets/img/producto1.png')} style={{ resizeMode: "contain" }} />
                    {/* </SView> */}
                </SView>
                <SView col={"xs-9"}>
                    <SText fontSize={16}>Alcohol Chico</SText>
                    <SText fontSize={14} color={STheme.color.gray}>12 x 100ml</SText>
                    <SHr />
                    <SView row>
                        <SView col={"xs-8"} row center>
                            <SView center width={45} height={45} style={{borderRadius:17, borderColor:"#E2E2E2", borderWidth:1}}>
                                <SIcon name='Menos' height={4} />
                            </SView>
                            <SView  row  >
                                <SView width={10}/>
                                <SText fontSize={16}>2</SText>
                                <SView width={10}/>
                            </SView>
                            <SView center width={45} height={45} style={{borderRadius:17, borderColor:"#E2E2E2", borderWidth:1}}>
                                <SIcon name='Mas' height={18} />
                            </SView>
                        </SView>
                        <SView col={"xs-4"}>
                            <SText fontSize={18} bold>Bs 4.99</SText>
                            <SHr />
                            <PButtomSmall fontSize={13}>Añadir</PButtomSmall>
                        </SView>
                    </SView>
                </SView>
            </SView>
        );
    }
}
export default (index);