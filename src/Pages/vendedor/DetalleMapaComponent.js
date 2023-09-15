import React, { Component } from 'react'
import { SHr, SLoad, SMapView, SNavigation, SText, STheme, SView } from 'servisofts-component'


const Card = ({ label, value, backgroundColor, onPress }) => {
    return <SView width={100} height={100} center padding={8}>
        <SView col={"xs-12"} flex card center style={{
            backgroundColor: backgroundColor ?? STheme.color.card,
            borderWidth: 2,
            borderColor: backgroundColor
        }} onPress={onPress}>
            <SView flex center>
                <SText fontSize={18} color={STheme.color.text}>{value}</SText>
            </SView>
            <SText center fontSize={10} color={STheme.color.text}>{label}</SText>
            <SHr height={15}/>
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
            <Card label={"Clientes con ubicación"} value={clientes_con_ubicacion.length} backgroundColor={STheme.color.success + "AA"} onPress={() => {
                SNavigation.navigate("/vendedor/list", { pk: state.idemp, ubicacion: "true" })
            }} />
            <Card label={"Clientes sin ubicación"} value={clientes_sin_ubicacion.length} backgroundColor={STheme.color.danger + "AA"} onPress={() => {
                SNavigation.navigate("/vendedor/list", { pk: state.idemp, ubicacion: "false" })
            }} />
            <Card label={"Visitas"} value={`${clientes_visitados.length} / ${clientes.length}`} 
            onPress={()=>{
                SNavigation.navigate("/vendedor/list", { pk: state.idemp})
            }}
            backgroundColor={STheme.color.primary + "AA"}
            />
        </SView>
    </SView>
}