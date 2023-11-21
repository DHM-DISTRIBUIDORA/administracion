import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SIcon, SNavigation, SPage, SPopup, SText, STheme, SThread, SView } from 'servisofts-component'
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos'
import Model from '../../Model'

export default class root extends Component {

    navegar() {

    }
    render() {
        return <SPage title="Dash Board" >
            <MenuPages path={"/dashboard/"} permiso={"page"} >
                <MenuButtom label={"Vendedores"} url={"/dashboard/vendedor"} icon={<SIcon name={"MListUser"} />} />
            </MenuPages>
        </SPage>
    }
}