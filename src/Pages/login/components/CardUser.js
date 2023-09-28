import React, { Component } from 'react'
// import PButtom from '../../../Components/PButtom'
import { SText, STheme, SView, SNavigation, SImage, SIcon, SHr } from 'servisofts-component';
import SSocket from 'servisofts-socket'

export default class CardUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("pk");
    }

    render() {
        console.log(this.props.datas)
        var { idcli, clinom, clinit, clidir } = this.props.datas;
        return (
            <SView col={"xs-12"}
                padding={10}
                style={{
                    borderRadius: 10,
                    borderColor: STheme.color.darkGray,
                    borderWidth: 1
                }}
                row center
                // onPress={() => {
                //     SNavigation.navigate("/paquete/membresia/confirmar", { ...this.props.datas });
                // }}
                onPress={this.props.onPress}
            >
                <SView width={90} row padding={8}>
                    {/* USUARIO */}
                    <SView card col={"xs-12"} colSquare style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 60,
                        overflow: "hidden"
                    }}>
                        <SImage enablePreview src={SSocket.api.root + "tbcli/" + idcli + "?date=" + new Date().getTime()} width={"100%"} height={"100%"}
                            style={{
                                resizeMode: 'cover',
                            }}
                        />
                        {/* <SImage enablePreview src={require('../../../Assets/img/entrenador1.jpg')} width={"100%"} height={"100%"}
                                        style={{
                                            resizeMode: 'cover',
                                        }}
                                    /> */}
                    </SView>
                </SView>
                <SView flex >
                    {/* USUARIO */}
                    <SText color={STheme.color.text} fontSize={20} bold>
                        {clinom}
                    </SText>
                    <SHr height={2} />
                    <SView row>
                        <SView row>
                            <SText fontSize={12} color={STheme.color.gray}>NIT: {clinit}</SText>
                        </SView>
                        <SView  col={"xs-12"}  >
                            <SText fontSize={12} color={STheme.color.gray}>Dirección: {clidir}</SText>
                        </SView>
                    </SView>
                </SView>
            </SView>
        )
    }
}