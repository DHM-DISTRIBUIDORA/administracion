import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SPage, SText, STheme, SView } from 'servisofts-component';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={'Mapas'}>
                <SHr height={32} />
                <MenuPages path={"/mapa/"} permiso={"view"}>
                    <MenuButtom label={"Test"} url='/mapa/test' icon={<SIcon name={"Tienda"} />} />
                    <MenuButtom label={"Rastreo"} url='/mapa/rastreo' icon={<SIcon name={"Ajustes"} />} />
                    <MenuButtom label={"Conductores"} url='/mapa/conductores' icon={<SIcon name={"IConductores"} />} />
                </MenuPages>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);