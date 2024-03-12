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
        // this.getData();

    }
    getData({ fecha }) {
        const request = {
            component: "dhm",
            type: "dashboardTransportista",
            fecha: fecha
            // type: "dashboardVendedor",
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(async e => {
            console.log(e);
            let arr = Object.values(e.data)
            console.log(arr);
            let promises = arr.map(async (emp) => {
                const af = await DataBase.usuario.filtered(`idtransportista == '${parseInt(emp.idemp)}'`)
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

        console.log("this.state.data data");
        console.log(this.state.data);

        return <SList
            data={this.state.data}
            limit={20}
            buscador
            render={(obj) => {
                return <Dashboard.Cardt data={obj} fecha={this.state.fecha}  />
            }}
        />
    }
    render() {

        return (
            <SPage title="Pedidos para transportistas" >
                <Container>
                    <SelectFecha onChange={(e) => {
                        this.setState({ data: null })
                        this.getData({ fecha: e.fecha });
                        this.setState({ fecha: e.fecha })
                    }} />
                    {this.renderData()}
                    <SHr height={20} />

                </Container>
            </SPage>
        )
    }
}