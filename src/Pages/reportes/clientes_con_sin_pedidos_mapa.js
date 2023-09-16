import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SImage, SLoad, SMapView, SMath, SNavigation, SPage, SPopup, STable2, SText, STheme, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // curdate: new SDate("2023-08-28", "yyyy-MM-dd"),
            // curdate: new SDate(),
            // idemp: SNavigation.getParam("idemp"),
            data: [],
            data2: [],
        }
    }
    componentDidMount() {
        if (!SNavigation.getParam("idemp")) {
            SNavigation.goBack();
            SPopup.alert("Usted no tiene un idemp")
        }
    }
    getData({ fecha_inicio, fecha_fin }) {

        //con pedidos
        const request = {
            component: "tbcli",
            type: "getAllPedidos",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            idemp: SNavigation.getParam("idemp")
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            this.setState({ data: e.data, loading: false })
            console.log(e);
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })

        //sin pedidos
        const request2 = {
            component: "tbcli",
            type: "getSinPedidos",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            idemp: SNavigation.getParam("idemp")
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request2).then(e => {
            this.setState({ data2: e.data, loading: false })
            console.log(e);

            // unir data y data2
            var dataFinal = [...this.state.data, ...this.state.data2];
            this.setState({ dataFinal: dataFinal })
            console.log(dataFinal);
            console.log("OK");

        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })


    }
    renderMarker = ({ latitude, longitude, data }) => {
        console.log(SSocket.api.root + "/tbcli/" + data?.idcli + "");
        return <SMapView.SMarker latitude={latitude} longitude={longitude}  >
            <SView style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                borderWidth: 2,
                borderColor: (data.cantidad) ? STheme.color.success : STheme.color.danger,
                backgroundColor: STheme.color.card,
            }} onPress={() => {
                SNavigation.navigate("/tbcli/profile", { pk: data.idcli + "" })
            }}>
                <SView style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                    overflow: "hidden",
                }}>
                    <SImage src={SSocket.api.root + "tbcli/" + data?.idcli + ""} style={{
                        resizeMode: "cover"
                    }} />
                </SView>
                <SView style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                }} center>
                    <SText fontSize={8} center >{data.clinom}</SText>
                </SView>
                {(data.cantidad) ?
                    <SView style={{
                        position: "absolute",
                        width: 30,
                        height: 30,
                        right: -10,
                        top: -10,
                        borderRadius: 100,
                        overflow: "hidden",
                        backgroundColor: STheme.color.danger,
                    }} center>
                        <SText fontSize={14} color={STheme.color.white}>{data.cantidad}</SText>
                    </SView>
                    : null}
            </SView>
        </SMapView.SMarker>
    }
    render_map() {
        if (this.state?.loading || !this.state?.dataFinal) return <SLoad />
        const arrLatLng = []
        this.state.dataFinal.map(o => {
            if (!o.clilat || !o.clilon) return;
            arrLatLng.push({ latitude: o.clilat, longitude: o.clilon, data: o })
        })
        if (!arrLatLng) return <SText>Clientes sin ubicación</SText>
        if (!arrLatLng.length) return <SText>Clientes sin ubicación</SText>
        return <SMapView ref={map => {
            if (map) this.map = map
            this.map.fitToCoordinates(arrLatLng, {})
        }}>
            <></>
            {arrLatLng.map(o => this.renderMarker(o))}
        </SMapView>
    }
    render() {
        return (
            <SPage title="Clientes con pedidos" disableScroll>
                <SelectEntreFechas onChange={e => this.getData(e)} />
                <SView flex>
                    {this.render_map()}
                </SView>
            </SPage>
        )
    }
}