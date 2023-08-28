import React, { Component } from 'react'
import { SLoad, SMapView, SNavigation, SText, STheme, SView } from 'servisofts-component'


const Card = ({ label, value, backgroundColor, onPress }) => {
    return <SView width={100} height={100} center padding={8}>
        <SView col={"xs-12"} flex card center style={{
            backgroundColor: backgroundColor ?? STheme.color.card
        }} onPress={onPress}>
            <SView flex center>
                <SText fontSize={18}>{value}</SText>
            </SView>
            <SText center fontSize={10} color={STheme.color.gray}>{label}</SText>
        </SView>
    </SView>
}
export default ({ state }) => {

    const clientes = state.data ?? [];
    const visitas = state.visitas ?? {};
    const clientes_con_ubicacion = clientes.filter(a => !!a.clilat && !!a.clilon)
    const clientes_sin_ubicacion = clientes.filter(a => !a.clilat || !a.clilon)
    const clientes_visitados = clientes.filter(a => !!visitas[a.idcli])


    return <SView col={"xs-12"}
        // backgroundColor={STheme.color.background}
        style={{
            position: "absolute"
        }}
        center
    >
        <SView row col={"xs-12"}>
            <Card label={"Clientes con ubicacion"} value={clientes_con_ubicacion.length} backgroundColor={STheme.color.success + "99"} onPress={() => {
                SNavigation.navigate("/tbemp/profile/tbcli", { pk: state.idemp })
            }} />
            <Card label={"Clientes sin ubicacion"} value={clientes_sin_ubicacion.length} backgroundColor={STheme.color.danger + "99"} onPress={() => {
                SNavigation.navigate("/tbemp/profile/tbcli", { pk: state.idemp })
            }} />
            <Card label={"visitas"} value={`${clientes_visitados.length} / ${clientes.length}`} />
        </SView>
    </SView>
}