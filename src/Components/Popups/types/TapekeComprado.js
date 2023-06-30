import React, { Component } from 'react';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView, SThread } from 'servisofts-component';
import Sounds from '../../Sounds';
import { Container, PButtom } from '../..';

type PropsType = {

}

export default class TapekeComprado extends Component<PropsType> {
    static POPUP_CODE = "POPUP_TAPEKES_COMPRADOS";
    static open(props: PropsType) {
        SPopup.open({
            key: this.POPUP_CODE,
            content: <TapekeComprado {...props} />
        })
    }
    static close() {
        SPopup.close(this.POPUP_CODE)
    }
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount() {
        Sounds.play()
        new SThread(3500, "detalle_del_pedido", true).start(() => {
            TapekeComprado.close();
        })
    }
    render() {
        return <SView col={"xs-12"} height center style={{ borderRadius: 8 }} withoutFeedback backgroundColor={STheme.color.background}>
            <Container>
                <SView col={"xs-9"} center>
                    <SText bold fontSize={30}>¡Listo!</SText>
                    <SHr height={25} />
                    <SText bold fontSize={16} center>Tu pedido fue realizado exitosamente.</SText>
                </SView>
                <SView col={"xs-12"} row center>
                    <SHr height={40} />
                    <SIcon fill="#99CC00" name={"Check2"} height={150} />
                </SView>
                <SHr height={60} />
                <PButtom onPress={() => {
                    TapekeComprado.close();
                    // SNavigation.navigate("/root")
                }}>ACEPTAR</PButtom>
            </Container>
        </SView>
    }
}