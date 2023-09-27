import React, { Component } from 'react';
import { SHr, SIcon, SPage, SText, STheme, SView, SMapView, SLoad } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import sql from '../sql/sql';

const pedidos_donde_se_hicieron = `
SELECT  *
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
            `
const clientes_ubicacion = `
	select 
        tbcli.idcli,
		tbcli.clilat as lat,
		tbcli.clilon as lng
	from tbcli
	where 
        tbcli.clilat <> 0
	and tbcli.clilon <> 0 
            `

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
            select: clientes_ubicacion,
        }).then((resp) => {
            this.setState({ error: "", data: resp.data, loading: false })
            console.log(resp);
        }).catch(e => {
            this.setState({ error: e.error, data: null, loading: false })
            console.error(e);
        })
    }


    getMapa() {
        if (!this.state.data) return <SLoad />
        const renderCluster = (data) => {
            return <SMapView.SMarker
                latitude={data.location?.latitude}
                longitude={data.location?.longitude} width={50} height={50}>
                <SView width={50} height={50} >
                    <SIcon name={"Marker"} fill={"#ff0000"} />
                    <SText style={{
                        position: "absolute"
                    }}>{data?.count}</SText>
                </SView>
            </SMapView.SMarker>
        }
        const getMarkers = (data) => {
            return <SMapView.SMarker
                latitude={data.location?.latitude}
                longitude={data.location?.longitude} >
                <SIcon name={"Marker"} fill={STheme.color.text} />
            </SMapView.SMarker>
        }
        let data = [];
        this.state.data.map(o => {
            if (!o.lat || !o.lng) return;
            data.push({
                id: o.clicod,
                location: {
                    latitude: o.lat,
                    longitude: o.lng
                }
            });
            // dataLatLng.push({ latitude: o.clilat, longitude: o.clilon });
        });
        return <SMapView.Cluster initialRegion={{
            latitude: -17.783799,
            longitude: -63.180,
            latitudeDelta: 0.7,
            longitudeDelta: 0.7
        }}
            renderMarker={getMarkers}
            renderCluster={renderCluster}
            data={data}
        >
            {/* {this.getMarkers()} */}
        </SMapView.Cluster>
    }
    render() {

        return <SPage title={'Mapa Test'} disableScroll>
            {this.getMapa()}
        </SPage>
    }
}