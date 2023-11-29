import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SDate, SHr, SList, SLoad, SMath, SPage, STable2, SText, STheme, SView } from 'servisofts-component'
import { Container, Dashboard } from '../../Components';
import DataBase from '../../DataBase';
import { SelectFecha } from '../../Components/Fechas';
import Model from '../../Model';
export default class index extends Component {
    state = {
    }

    componentDidMount() {

    }
    getData({ fecha }) {
        const request = {
            component: "dhm",
            type: "dashboardVendedor",
            fecha: fecha
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(async e => {
            console.log(e);
            let arr = Object.values(e.data)
            let promises = arr.map(async (emp) => {
                const af = await DataBase.usuario.filtered(`idvendedor == ${parseInt(emp.idemp)}`)
                emp.usuario = af[0]
            })
            const response = await Promise.all(promises);

            this.setState({ data: arr, loading: false })
        }).catch(e => {
            this.setState({ loading: false, error: e.message ?? e })
            console.error(e);
        })

        //background location
        let conductores =  Model.background_location.Action.getAll();
        (!conductores) ? this.setState({ conductores: {} }) : this.setState({ conductores: conductores });
    }


    renderData() {
        if (this.state?.error) return <SText color={STheme.color.danger}>{JSON.stringify(this.state.error)}</SText>
        if (!this.state?.data) return <SLoad />
        const moving = Model.background_location.Action.getAll(); 

        this.state.data.forEach((objeto) => {
            // Verificar si 'moving' es un objeto
            if (typeof moving === 'object' && moving !== null) {
                for (let key in moving) {
                    if ((moving.hasOwnProperty(key)) && (moving[key].key_usuario === objeto?.usuario?.key) && (new SDate(moving[key].fecha_last).toString("yyyy-MM-dd") == new SDate().toString("yyyy-MM-dd"))) {
                        objeto.visita = moving[key];
                        console.log("objeto.visita");
                        console.log(objeto.visita);
                        break; // Si se encuentra una coincidencia, salir del bucle
                    }
                }
            } else {
                console.error("'moving' no es un objeto");
            }
        });

        console.log(this.state.data);

        return <SList
            data={this.state.data}
            limit={20}
            buscador
            // filter={(a) => a.nivel == 1}
            // order={[{ key: "idven", order: "desc" }]}
            render={(obj) => {
                // var obj2 = this.state.usuarios.filter(e => e.idvendedor == obj.idemp)
                // obj.key = obj2[0].key
                return <Dashboard.Card data={obj} />
            }}
        />
    }
    render() {
      
        return (
            <SPage title="Pedidos por vendedores" >
                <Container>
                    <SelectFecha onChange={(e) => {
                        this.setState({ data: null })
                        this.getData({ fecha: e.fecha });
                    }} />
                    {this.renderData()}
                    <SHr h={20} />
                </Container>
            </SPage>
        )
    }
}