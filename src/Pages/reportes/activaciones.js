import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SDate, SLoad, SMath, SNavigation, SPage, STable2, STheme, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
import DataBase from '../../DataBase'
export default class index extends Component {

    componentDidMount() {
        DataBase.usuario.all().then(e => {
            this.setState({ dataUser: e })
        }).catch(e => {
            console.error(e)
        })
    }

    getData({ fecha_inicio, fecha_fin }) {
        const request = {
            component: "location_info",
            type: "getAll",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
        }
        this.setState({ loading: true })

        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            var itemNew = {};
            let data = e.data;

            var newDataUser = this.state.dataUser

            Object.keys(data).map((item) => {
                itemNew = newDataUser.find(dataItem => dataItem.key === data[item].key_usuario);
                data[item].Nombres = itemNew ? itemNew.Nombres : null
                data[item].usuario = itemNew;
            });
            this.setState({ data: data, loading: false })

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
                            // { key: "key_usuario", width: 150 },
                            { key: "fecha_on", label: "Fecha registro", width: 130, order: "desc", render: a => new SDate(a).toString("yyyy-MM-dd hh:mm:ss") },
                            { key: "usuario/Nombres", width: 150 },
                            { key: "usuario/Apellidos", width: 150 },
                            {
                                key: "usuario-tipo", width: 150, render: u => {
                                    if (u.idvendedor) {
                                        return "VENDEDOR";
                                    } else if (u.idtransportista) {
                                        return "TRANSPORTISTA";
                                    }
                                    return "S/T";
                                }
                            },
                            { key: "tipo-", width: 40, component: (t) => <SView width={20} height={20} backgroundColor={t == "start" ? STheme.color.success : STheme.color.danger}></SView> },
                            { key: "tipo", width: 80 },
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
