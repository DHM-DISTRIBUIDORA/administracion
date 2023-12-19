import React, { Component } from 'react'
import { SHr, SLoad, SMapView, SNavigation, SText, STheme, SView } from 'servisofts-component'


const Card = ({ label, value, backgroundColor, onPress }) => {
    return <SView width={80} height={80} center padding={4}>
        <SView col={"xs-12"} flex card center style={{
            backgroundColor: backgroundColor ?? STheme.color.card
        }} onPress={onPress}>
            <SView flex center>
                <SText fontSize={18}>{value}</SText>
            </SView>
            <SText center fontSize={8} color={STheme.color.black}>{label}</SText>
            <SHr height={10} />

        </SView>
    </SView>
}
export default ({ state }) => {

    const clientes = state.data ?? [];
    const visitas = state.visitas ?? {};
    const clientes_con_ubicacion = clientes.filter(a => !!a.clilat && !!a.clilon)
    const clientes_sin_ubicacion = clientes.filter(a => !a.clilat || !a.clilon)
    const clientes_visitados = clientes.filter(a => !!visitas.find(v => v.idven == a.idven))
    const fecha = SNavigation.getParam("fecha")


    return <SView 
        // backgroundColor={STheme.color.background}
        style={{
            position: "absolute"
        }}
        center
    >
        <SView row col={"xs-12"}>
            <Card label={"Clientes con ubicación"} value={clientes_con_ubicacion.length} backgroundColor={STheme.color.success + "99"} onPress={() => {
                SNavigation.navigate("/transporte/list", { pk: state.idemp, ubicacion: "true" })
            }} />
            <Card label={"Clientes sin ubicación"} value={clientes_sin_ubicacion.length} backgroundColor={STheme.color.danger + "99"} onPress={() => {
                SNavigation.navigate("/transporte/list", { pk: state.idemp, ubicacion: false })
            }} />
            <Card label={"Visitas"} value={`${clientes_visitados.length} / ${clientes.length}`}
                onPress={() => {
                    SNavigation.navigate("/transporte/list", { pk: state.idemp })
                }} />
            {clientes.length > 0 ?
                <Card label={(state.mapa == 1) ? "Agrupar Mapa" : "Desagrupar Mapa"} value={""} backgroundColor={STheme.color.lightGray + "99"}
                    onPress={() => {
                        (state.mapa == 1) ? SNavigation.navigate("/transporte", { idemp: state.idemp, fecha: fecha, mapa: 0 }) : SNavigation.navigate("/transporte/desgrup", { idemp: state.idemp, fecha: fecha, mapa: 1 })
                    }} />
                : null
            }
        </SView>
    </SView>
}