import React, { Component } from 'react';
import { SHr, SIcon, SPage, SText, STheme, SView, SMapView } from 'servisofts-component';
import SSocket from 'servisofts-socket'

const Marker = React.memo(({ }) => <SView width={20} height={20} center onPress={() => {
}}>
    <SIcon name={"Marker"} fill={STheme.color.text} />
</SView>, (prevProps, nextProps) => prevProps === nextProps);
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        SSocket.sendPromise({
            component: "dhm",
            type: "get",
            select: `
            SELECT top 100 *
FROM (
	select 
		dm_cabfac.clicod,
		MAX(dm_cabfac.vlatitud) as lat,
		MAX(dm_cabfac.vlongitud) as lng
	from dm_cabfac
	where 
		vlatitud <> 0
	and vlongitud <> 0
	group by dm_cabfac.clicod
) sq1 JOIN dm_clientes ON sq1.clicod = dm_clientes.clicod

            `,
        }).then((resp) => {
            this.setState({ error: "", data: resp.data, loading: false })
            console.log(resp);
        }).catch(e => {
            this.setState({ error: e.error, data: null, loading: false })
            console.error(e);
        })
    }

    getMarkers() {

        if (!this.state.data) return null;
        return this.state.data.map((obj) => {
            if (!obj.lat || !obj.lng) return null;
            return <SMapView.SMarker
                latitude={parseFloat(obj?.lat ?? 0)}
                longitude={parseFloat(obj?.lng ?? 0)} >
                <Marker />
            </SMapView.SMarker>
        })
    }
    render() {
        return <SPage title={'Mapa Test'} disableScroll>
            <SMapView initialRegion={{
                latitude: -17.783799,
                longitude: -63.180,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            }}>
                {this.getMarkers()}
            </SMapView>
        </SPage>
    }
}