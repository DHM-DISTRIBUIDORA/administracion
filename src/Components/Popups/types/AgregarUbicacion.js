import React, { Component } from 'react';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView, SThread } from 'servisofts-component';
import Sounds from '../../Sounds';
import { Container, PButtom } from '../..';

type PropsType = {

}

export default class AgregarUbicacion extends Component<PropsType> {
    static POPUP_CODE = "POPUP_AGREGAR_UBICACION";
    static open(props: PropsType) {
        SPopup.open({
            key: this.POPUP_CODE,
            content: <AgregarUbicacion {...props} />
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
  
    render() {
        return <SView col={"xs-11 md-8 xl-6"} row center style={{ height: 250, borderRadius: 8, }} backgroundColor={STheme.color.background} >
            <SView col={"xs-11"} height={40} />
            <SView col={"xs-11"}  >
                <SIcon name={"SinUbicacion"} height={100} fill={STheme.color.primary} />
            </SView>
            <SView col={"xs-11"} height={15} />
            <SView col={"xs-12"} center  >
                <SText center color={STheme.color.text} style={{ fontSize: 18, fontWeight: "bold" }}>Debes AGREGAR UBICACIÓN para concretar la visita.</SText>
            </SView>
            <SHr height={10} />
            {/* <SView col={"xs-12"} center  >
            <SButtom onPress={this.hanldeRequest_categorias.bind(this)}>AÑADIR</SButtom>
        </SView> */}
            <SView col={"xs-11"} height={30} />
        </SView>
    }
}