import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SIcon, SPage, STheme, SView } from 'servisofts-component'
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos'
import Model from '../../Model'

export default class root extends Component {
    render() {
        const idemp = Model.usuario.Action.getUsuarioLog().idvendedor;
        return <SPage title="Reportes">
            <MenuPages path={"/reportes/"} permiso={"page"}>
                <MenuButtom label={"Usuarios"} url={"/reportes/usuarios"} icon={<SIcon name={"Ajustes"} />} />
                <MenuButtom label={"Productos más vendidos"} url={"/reportes/productos_mas_vendidos"} icon={<SIcon name={"MProductoMasV"} />} />
                <MenuButtom label={"Clientes con pedidos"} url={"/reportes/clientes_con_pedidos"} params={{ idemp: idemp }} icon={<SIcon name={"MconPedidos"} />} />
                <MenuButtom label={"Clientes con pedidos"} url={"/reportes/clientes_con_pedidos_mapa"} params={{ idemp: idemp }} icon={<SIcon name={"Marker"} fill={STheme.color.text} bgr='#8E8E95' />} />
                <MenuButtom label={"Clientes sin pedidos"} url={"/reportes/clientes_sin_pedidos"} params={{ idemp: idemp }} icon={<SIcon name={"MsinPedidos"} />} />
                <MenuButtom label={"Clientes sin pedidos"} url={"/reportes/clientes_sin_pedidos_mapa"} params={{ idemp: idemp }} icon={<SIcon name={"Marker"} fill={STheme.color.text} bgr='#8E8E95' />} />
                <MenuButtom label={"Visitas del vendedor"} url={"/reportes/visita_vendedor"} params={{ idemp: idemp }} icon={<SIcon name={"Ajustes"} fill={STheme.color.text}  />} />
            </MenuPages>
        </SPage>
    }
}