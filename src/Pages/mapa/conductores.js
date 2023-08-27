import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SView, SText, SIcon, STheme, SForm, SInput, SNavigation, STable, SLoad, SButtom, SPopup, SMarker, SMapView2, SMapView, SThread, SDate } from 'servisofts-component';
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
                                <SView width={50} height={50} center onPress={() => {
                                    SNavigation.navigate("/usuario/profile", { pk: obj.key_usuario })
                                }}>
                                    <SIcon name={"Marker"} fill={obj.tipo == "start" ? STheme.color.success : STheme.color.danger} />
                                    <SText fontSize={10}>{usuarios[obj.key_usuario]?.Correo}</SText>
                                    <SText fontSize={12}>{new SDate(obj.fecha_last).toString("hh:mm")}</SText>
                                </SView>
                            </SMapView.SMarker>
                        })}
                    </SMapView>
                </SView >
            </SPage>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Mapa);