import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SIcon, SNavigation, SPage, SPopup, SText, STheme, SThread, SView } from 'servisofts-component'
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos'
import Model from '../../Model'
import { SHr } from 'servisofts-component'

export default class root extends Component {

    navegar() {

    }
    render() {
        const idemp = Model.usuario.Action.getUsuarioLog().idvendedor;
        return <SPage title="Reportes" >
            <SView col={"xs-12"} center >
                <SView col={"xs-11"}  >
                    <SText bold>Nuevos</SText>
                    <SHr />

                    <MenuPages path={"/reportes/"} permiso={"page"} >
                        <MenuButtom label={"DashBoard Vendedores"} url={"/dashboard/vendedor"} icon={<SIcon name={"Vendedor"} />} />
                        <MenuButtom label={"DashBoard Transportista"} url={"/dashboard/transportista"} icon={<SIcon name={"Vendedor"} />} />
                        <MenuButtom label={"Pedidos por vendedor"} url={"/reportes/pedidos_por_vendedor"} icon={<SIcon name={"MconPedidos"} />} />
                        <MenuButtom label={"Activaciones"} url={"/reportes/activaciones"} icon={<SIcon name={"MConPedidosMap"} />} />
                    </MenuPages>
                    <SHr />
                    <SText bold>Antiguos</SText>
                    <SHr />
                    <MenuPages path={"/reportes/"} permiso={"page"} >
                        <MenuButtom label={"Usuarios"} url={"/reportes/usuarios"} icon={<SIcon name={"MListUser"} />} />
                        <MenuButtom label={"Productos más vendidos"} url={"/reportes/productos_mas_vendidos"} icon={<SIcon name={"MProductoMasV"} />} />
                        <MenuButtom label={"Clientes con pedidos"} url={"/reportes/clientes_con_pedidos"} params={{ idemp: idemp }} icon={<SIcon name={"MconPedidos"} />} />
                        <MenuButtom label={"Clientes con pedidos Mapa"} url={"/reportes/clientes_con_pedidos_mapa"} params={{ idemp: idemp }} icon={<SIcon name={"MConPedidosMap"} />} />
                        <MenuButtom label={"Clientes sin pedidos"} url={"/reportes/clientes_sin_pedidos"} params={{ idemp: idemp }} icon={<SIcon name={"MsinPedidos"} />} />
                        <MenuButtom label={"Clientes sin pedidos Mapa"} icon={<SIcon name={"MSinPedidosMap"} />} onPress={() => {
                            SNavigation.navigate("/tbzon", {
                                onSelect: (zona) => {
                                    new SThread(100, "asdasd").start(() => {
                                        SNavigation.navigate("/reportes/clientes_sin_pedidos_mapa", { idz: zona.idz })
                                    })

                                }
                            })
                        }} />
                        <MenuButtom label={"Visitas del vendedor"} url={"/reportes/visita_vendedor"} params={{ idemp: idemp }} icon={<SIcon name={"MVisit"} fill={STheme.color.text} />} />
                        <MenuButtom label={"Visitas del vendedor Mapa"} icon={<SIcon name={"MConPedidosMap"} fill={STheme.color.text} />}
                            onPress={() => {
                                SNavigation.navigate("/reportes/profile/tbemp", {
                                    tipo: "V",
                                    onSelect: (emp) => {
                                        new SThread(100, "asdasd").start(() => {
                                            SNavigation.navigate("/reportes/clientes_sin_pedidos_mapa", { idemp: emp.idemp })
                                        })
                                    }
                                })
                                // SNavigation.navigate("/reportes/profile/tbemp")
                            }}
                        />

                        <MenuButtom label={"Visitas del transportista"} url={"/reportes/visita_transportista"} params={{ idemp: idemp }} icon={<SIcon name={"MVisit"} fill={STheme.color.text} />} />
                        <MenuButtom label={"Visitas del transportista Mapa"} icon={<SIcon name={"MConPedidosMap"} fill={STheme.color.text} />}
                            onPress={() => {
                                SNavigation.navigate("/reportes/profile/tbemp", {
                                    tipo: "T",
                                    onSelect: (emp) => {
                                        new SThread(100, "asdasd").start(() => {
                                            SNavigation.navigate("/reportes/clientes_sin_pedidos_mapa", { idemp: emp.idemp })
                                        })
                                    }
                                })
                                // SNavigation.navigate("/reportes/profile/tbemp")
                            }}
                        />
                        {/* <MenuButtom label={"Clientes con y sin pedidos"} url={"/reportes/clientes_con_sin_pedidos_mapa"} params={{ idemp: idemp }} icon={<SIcon name={"MConPedidosMap"} />} /> */}

                    </MenuPages>
                    <SHr height={30} />
                </SView>
            </SView>
        </SPage>
    }
}