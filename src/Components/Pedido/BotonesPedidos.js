import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SImage, SList, SMath, SNavigation, SPage, SScroll, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { Container } from '..';
import Model from '../../Model';
export type BotonesPedidosPropsType = {
    url: any,
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<BotonesPedidosPropsType> {
    constructor(props) {
        super(props);
        this.state = {
            filtros: {

            }
        };
    }


    getButtom({ label, url, corner }) {
        var select = (this.props.url != url)
        const radius = 8;
        var extraStyle = {
            // borderRadius: 8,
        };
        if (corner == "left") {
            extraStyle = {
                borderTopLeftRadius: radius,
                borderBottomLeftRadius: radius
            }
        }
        if (corner == "right") {
            extraStyle = {
                borderTopRightRadius: radius,
                borderBottomRightRadius: radius
            }
        }
        return <SView col={"xs-6"} center height={40} style={{
            backgroundColor: !select ? STheme.color.primary : null,
            borderWidth: 2,
            borderColor: STheme.color.primary,
            ...extraStyle,

        }} onPress={() => {
            if (url) {
                SNavigation.navigate(url);
            }
        }}>
            <SText fontSize={18} color={!select ? STheme.color.white : STheme.color.text}>{label}</SText>
        </SView>
    }
    render() {
        return (
            <Container>
                <SView col={"xs-12"} row>
                    <SHr height={5} />
                    {this.getButtom({ label: "PEDIDOS", url: "/pedidos", corner: "left" })}
                    {this.getButtom({ label: "HISTORICO", url: "/pedidos/historico", corner: "right" })}
                    <SHr height={5} />
                </SView>
            </Container >
        );
    }
}
export default (index);