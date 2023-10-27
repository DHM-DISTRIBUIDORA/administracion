import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SDate, SLoad, SMath, SNavigation, SPage, STable2, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
export default class index extends Component {


    getData({ fecha_inicio, fecha_fin }) {
        const request = {
            component: "location_info",
            type: "getAll",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            console.log(e);
            let data = e.data;
            this.setState({ data, loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })
    }


    render() {

        return (
            <SPage title="Activaciones" disableScroll>
                <SelectEntreFechas onChange={e => this.getData(e)} />
                <SView flex>
                    <STable2
                        header={[
                            { key: "index" },
                            { key: "key_usuario", width: 300 },
                            { key: "fecha_on", label: "Fecha registro", width: 130, order: "desc", render: a => new SDate(a).toString("yyyy-MM-dd hh:mm:ss") },
                            { key: "tipo", width: 150 },
                            { key: "latitude", width: 150 },
                            { key: "longitude", width: 150 },

                        ]}
                        limit={50}
                        rowHeight={30}
                        data={this.state?.data ?? {}} />
                    {/* <SLoad type='window' hidden={!this.state?.loading} /> */}
                </SView>
            </SPage>
        )
    }
}
