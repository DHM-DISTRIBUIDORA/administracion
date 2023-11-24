import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SView, SText, SIcon, STheme, SForm, SInput, SNavigation, STable, SLoad, SButtom, SPopup, SMarker, SMapView2, SMapView, SThread, SDate, SHr } from 'servisofts-component';
import Model from '../../Model';
class Mapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: false,
        };
        this.circles = {};
        this.isRun = false;
    }
    componentDidMount() {
        this.isRun = true;
        this.hilo();
    }
    componentWillUnmount() {
        this.isRun = false;
    }
    hilo() {
        if (!this.isRun) return;
        this.state.data = Model.background_location.Action.CLEAR();
        this.setState({ ...this.state })
        new SThread(5000, "hilo_conductores", true).start(() => {
            if (!this.isRun) return;
            this.hilo();
        })
    }

    renderInfo() {
        return <SView style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 180,
            height: 100,
            padding: 4
        }} card>
            <SView row center>
                <SView width={20} height={20} backgroundColor={STheme.color.success}></SView>
                <SText flex font={"Roboto"}>Activados</SText>
            </SView>
            <SHr h={4} />
            <SView row center>
                <SView width={20} height={20} backgroundColor={STheme.color.warning}></SView>
                <SText flex font={"Roboto"}>Inactivos hace 5 minutos</SText>
            </SView>
            <SHr h={4} />
            <SView row center>
                <SView width={20} height={20} backgroundColor={STheme.color.danger}></SView>
                <SText flex font={"Roboto"}>Desactivados</SText>
            </SView>
        </SView>
    }
    render() {
        let usuarios = Model.usuario.Action.getAll() ?? {};
        let conductores = Model.background_location.Action.getAll();
        // if (!usuarios) return <SLoad />
        if (!conductores) {
            conductores = {};
        }

        return (
            <SPage
                title={`Conductores`}
                disableScroll
            >
                {/* {(Object.keys(conductores).length === 0) ? <SView height={40} center backgroundColor={STheme.color.primary}><SText color={STheme.color.white}>Actualmente no hay conductores disponibles.</SText></SView> : null}
                <SView></SView> */}
                <SView center height >
                    <SMapView ref={ref => this.map = ref} initialRegion={{
                        latitude: -17.783799,
                        longitude: -63.180,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}>
                        {Object.values(conductores).filter(obj => new SDate(obj.fecha_last).toString("yyyy-MM-dd") == new SDate().toString("yyyy-MM-dd")).map((obj) => {
                            return <SMapView.SMarker latitude={obj.latitude} longitude={obj.longitude} >
                                <SView width={80} height={50} center onPress={() => {
                                    SNavigation.navigate("/usuario/profile", { pk: obj.key_usuario })
                                }}>
                                    <SIcon name={"Marker"} width={25} fill={obj.tipo == "stop" ? STheme.color.danger : (new SDate(obj.fecha_last).diffTime(new SDate()) >= 1000 * 60 * 5 ? STheme.color.warning : STheme.color.success)} />
                                    <SView card>
                                        <SText fontSize={11} font={"Cascadia"} bold>{usuarios[obj.key_usuario]?.Correo}</SText>
                                        {/* <SText fontSize={10} font={"Cascadia"}>{new SDate(obj.fecha_last).toString("yyyy-MM-dd")}</SText> */}
                                        <SText fontSize={10} font={"Cascadia"}>{new SDate(obj.fecha_last).toString("hh:mm:ss")}</SText>
                                    </SView>
                                </SView>
                            </SMapView.SMarker>
                        })}
                    </SMapView>
                    {this.renderInfo()}
                </SView >
            </SPage>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Mapa);