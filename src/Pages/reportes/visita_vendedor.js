import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SDate, SLoad, SMath, SNavigation, SPage, STable2, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
export default class index extends Component {


    getData({ fecha_inicio, fecha_fin }) {
        const request = {
            component: "visita_vendedor",
            type: "getReporteVisitas",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            idemp: SNavigation.getParam("idemp")
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            console.log(e);
            let data = e.data;
            let arr = data.map(val => val.idcli);
            const uniqueArr = [...new Set(arr)];
            SSocket.sendHttpAsync(SSocket.api.root + "api", {
                component: "tbcli",
                type: "getByKeys",
                keys: arr
            }).then(e => {
                const clientes = e.data;
                data.map(obj => {
                    obj.tbcli = clientes.filter(a => a.idcli == obj.idcli)
                })
                this.setState({ data, loading: false })

            })
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })
    }


    render() {

        return (
            <SPage title="Visitas de vendedores" disableScroll>
                <SelectEntreFechas onChange={e => this.getData(e)} />
                <SView flex>
                    <STable2
                        header={[
                            { key: "index" },
                            { key: "idemp", width: 70 },
                            // { key: "idcli", width: 70 },
                            { key: "tbcli/0/clicod", label: "Codigo de cliente", width: 200 },
                            { key: "tbcli/0/clinom", label: "Nombre de cliente", width: 200 },
                            { key: "fecha", width: 80, render: a => new SDate(a).toString("yyyy-MM-dd") },
                            { key: "fecha_on", label: "Fecha registro", width: 130, order: "desc", render: a => new SDate(a).toString("yyyy-MM-dd hh:mm") },
                            { key: "tipo", width: 150 },
                            { key: "descripcion", width: 300 },

                        ]}
                        limit={50}
                        rowHeight={30}
                        data={this.state?.data ?? {}} />
                    <SLoad type='window' hidden={!this.state?.loading} />
                </SView>
            </SPage>
        )
    }
}
