import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SIcon, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component'
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos'
import Model from '../../Model'

export default class root extends Component {
    render() {
        const idemp = Model.usuario.Action.getUsuarioLog().idvendedor;
        if (this.state?.idz) {
            SNavigation.navigate("/reportes/clientes_sin_pedidos_mapa", { idz: this.state.idz })
        }
        return <SPage title="Reportes" >
            <MenuPages path={"/reportes/"} permiso={"page"} >
                <MenuButtom label={"Usuarios"} url={"/reportes/usuarios"} icon={<SIcon name={"MListUser"} />} />
                <MenuButtom label={"Productos más vendidos"} url={"/reportes/productos_mas_vendidos"} icon={<SIcon name={"MProductoMasV"} />} />
                <MenuButtom label={"Clientes con pedidos"} url={"/reportes/clientes_con_pedidos"} params={{ idemp: idemp }} icon={<SIcon name={"MconPedidos"} />} />
                <MenuButtom label={"Clientes con pedidos"} url={"/reportes/clientes_con_pedidos_mapa"} params={{ idemp: idemp }} icon={<SIcon name={"MConPedidosMap"} />} />
                <MenuButtom label={"Clientes sin pedidos"} url={"/reportes/clientes_sin_pedidos"} params={{ idemp: idemp }} icon={<SIcon name={"MsinPedidos"} />} />
                {/* <MenuButtom label={"Clientes sin pedidos"} url={"/reportes/clientes_sin_pedidos_mapa"} params={{ idemp: idemp }} icon={<SIcon name={"MSinPedidosMap"} />} /> */}
                <SView onPress={() => {
                    SNavigation.navigate("/tbzon", {
                        onSelect: (zona) => {
                            console.log(zona);
                            this.setState({ idz: zona.idz })
                        }
                    })
                }}
                    height={120}>
                    <SIcon name={"MSinPedidosMap"} width={65} height={65} />
                    <SText font='Roboto' fontSize={14}>Clientes sin pedidos </SText>
                </SView>
                <MenuButtom label={"Visitas del vendedor"} url={"/reportes/visita_vendedor"} params={{ idemp: idemp }} icon={<SIcon name={"MVisit"} fill={STheme.color.text} />} />
                <MenuButtom label={"Visitas del transportista"} url={"/reportes/visita_transportista"} params={{ idemp: idemp }} icon={<SIcon name={"MVisit"} fill={STheme.color.text} />} />
                <MenuButtom label={"Clientes con y sin pedidos"} url={"/reportes/clientes_con_sin_pedidos_mapa"} params={{ idemp: idemp }} icon={<SIcon name={"MConPedidosMap"} />} />
                <MenuButtom label={"Activaciones"} url={"/reportes/activaciones"} icon={<SIcon name={"MConPedidosMap"} />} />

            </MenuPages>
        </SPage>
    }
}