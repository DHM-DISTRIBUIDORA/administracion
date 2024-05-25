import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SDate, SLoad, SMath, SNavigation, SPage, STable2, SText, STheme, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
import DataBase from '../../DataBase'
export default class index extends Component {

    componentDidMount() {
        DataBase.tbemp.all().then(e => {
            this.setState({ dataEmp: e })
        }).catch(e => {
            console.error(e)
        })
    }

    getData({ fecha_inicio, fecha_fin }) {
        const request = {
            component: "visita_vendedor",
            type: "getReporteVisitas",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            // idemp: SNavigation.getParam("idemp")
        }
        this.setState({ loading: true })
        var itemNew = {};
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            console.log(e);

            let data = e.data;
            let arr = data.map(val => parseInt((val.idcli + "").trim()));
            const uniqueArr = [...new Set(arr)];
            console.log("uniqueArr", uniqueArr)
            SSocket.sendHttpAsync(SSocket.api.root + "api", {
                component: "tbcli",
                type: "getByKeys",
                keys: arr
            }).then(e => {
                console.log(e);
                const clientes = e.data ?? [];
                const empleados = this.state.dataEmp;
                data.map(obj => {
                    obj.tbcli = clientes.filter(a => a.idcli == obj.idcli)
                    obj.tbemp = empleados.find(a => a.idemp == obj.idemp)
                })

                this.setState({ data, loading: false })
                console.log(data);

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
                            { key: "fecha", width: 80, render: a => new SDate(a).toString("yyyy-MM-dd") },
                            { key: "idemp", width: 70 },
                            { key: "tbemp/empnom", width: 200, label: "Nombre empleado" },
                            // { key: "idcli", width: 70 },
                            { key: "tbcli/0/clicod", label: "Código de cliente", width: 100 },
                            { key: "tbcli/0/clinom", label: "Nombre de cliente", width: 180 },
                            
                            {
                                key: "tipo", width: 150, component: (a) => {
                                    let color = STheme.color.danger;
                                    if (a == "REALIZO PEDIDO") color = STheme.color.success
                                    return <SText bold fontSize={10} color={color}>{a}</SText>
                                }
                            },
                            { key: "fecha_on", label: "Fecha registro", width: 130, order: "desc", render: a => new SDate(a).toString("yyyy-MM-dd hh:mm") },
                            { key: "descripcion", width: 300, label: "Descripción" },
                            // { key: "idemp", width: 200 },
                            // { key: "idemp", width: 150 },

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
