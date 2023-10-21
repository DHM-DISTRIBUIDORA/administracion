import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SMath, SNavigation, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { Container } from '../../../Components';
import Model from '../../../Model';
import DataBase from '../../../DataBase';
import item from '../item';
class pedidosEmpresa extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.idemp = SNavigation.getParam("pk")
        this.fecha_inicio = SNavigation.getParam("fecha_inicio");
        this.fecha_fin = SNavigation.getParam("fecha_fin");
    }

    componentDidMount() {
        let producto;

        DataBase.dm_cabfac.all().then(dt => {
            let data = dt.map((a) => {
                // a.filter((a) => new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") >= this.fecha_inicio && new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") <= this.fecha_fin)
                // a.detalle = JSON.parse(a.detalle);
                return a
            }).filter((a) => new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") >= this.fecha_inicio && new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") <= this.fecha_fin)


            console.log("DATA:")
            console.log(data)

            // let tbprd = DataBase.tbprd.filtered();
            let tbprd;
            // console.log(tbprd)

            // let tbprdlin = DataBase.tbprdlin.all();
         

            data.map((a) => {
                a.detalle.map((b) => {
                    console.log(b)
                    // const elemento =  tbprd.filter((c) => c.prdcod === b.prdcod);
                    // let tbprd = DataBase.tbprd.filtered(`prdcod == ${b.prdcod}`);
                    producto = DataBase.tbprd.filtered(`prdcod == ${(b.prdcod+"")}`).then((e) => {
                        console.log(tbprd)
                        this.setState({ dataProducto: e })
                    })
                    return b;
                })
            })
            // const resultado = data.map((a) => {
            //     a.detalle = a.detalle.filter((b) => {
            //         //   const elemento = tbprd.find((c) => c.prdcod === b.prdcod);
            //         let tbprd = DataBase.tbprd.filtered(b.prdcod);
            //         console.log(tbprd)
            //         return elemento !== undefined;
            //     });
            //     return a;
            // });

            console.log("PRODUCTO:")

            console.log(this.state.dataProducto)
            this.setState({ data: data })

            // function obtenerLinnom(idlinea) {
            //     const elemento = tbprdlin.find(item => item.idlinea === idlinea);
            //     return elemento ? elemento.linnom : null;
            //   }

            //   // Filtrar dm_cabfac por idprd = 26
            //   const filtroDmCabfac = dm_cabfac.filter(item => item.idprd === 26);

            //   // Obtener idlinea de tbprd
            //   const idlineaTbprd = tbprd.find(item => item.idprd === 26)?.idlinea;

            //   // Obtener linnom de tbprdlin basado en idlinea
            //   const linnom = obtenerLinnom(idlineaTbprd);

            //   // Combinar los datos en dm_cabfac
            //   if (filtroDmCabfac.length > 0 && idlineaTbprd !== undefined && linnom !== null) {
            //     filtroDmCabfac[0].linnom = linnom;
            //   }
        })




        // SSocket.sendPromise({
        //     component: "dm_cabfac",
        //     type: "getPedidos",
        //     idemp: this.idemp
        // }).then((a) => {
        //     this.setState({ data: a.data })
        // })
    }

    header = (obj) => {

        return <SView col={"xs-12"} card padding={8} row>

            <SView col={"xs-6"} row>
                <SText>Nombre de empresa</SText>
                {/* <SView flex />
                <SText>{(obj.vfec + "").substring(0, 10)}</SText> */}
            </SView>
            <SView col={"xs-6"} row>
                <SText>Monto en Bs.</SText>
            </SView>


        </SView>
    }

    component = (obj) => {
        const detalle = obj.detalle ?? []
        let total = 0;
        let cantidadProductos = 0;
        detalle.map(a => {
            total += a.vdpre * a.vdcan
            cantidadProductos += a.vdcan;
        })
        return <SView col={"xs-12"} card padding={8} onPress={() => {
            SNavigation.navigate("/dm_cabfac/recibo", { pk: obj.idven })
        }} row>
            <SView col={"xs-12"} flex row style={{ alignItems: "flex-end" }}>
                <SText>{(obj.vfec + "").substring(0, 10)}</SText>
            </SView>
            <SView col={"xs-6"} row>
                <SText>Nombre de empresa</SText>
                {/* <SView flex />
                <SText>{(obj.vfec + "").substring(0, 10)}</SText> */}
            </SView>
            <SView col={"xs-6"} row>
                <SView col={"xs-3"} row>

                </SView>
                <SView col={"xs-9"} flex row>
                    <SText>{obj.clicod}  - {obj.nombrecliente}</SText>
                    <SText>{obj.razonsocial}</SText>
                    <SText bold># {cantidadProductos}</SText>
                    <SText bold>Bs. {SMath.formatMoney(total)}</SText>
                </SView>

            </SView>


        </SView>
    }
    render() {
        if (!this.state.data) return <SLoad />
        // console.log("DATA:")
        // console.log(this.state.data)
        return (
            <SPage title={'Pedidos por Empresa'} >
                <Container >

                    {(this.fecha_inicio) ?
                        <SView col={"xs-12"} center>
                            <SText fontSize={20} bold >Pedidos entre: </SText>
                            <SText fontSize={20} bold >{this.fecha_inicio} , {this.fecha_fin}</SText>
                        </SView> : null}

                    <SHr height={20} />
                    {this.header()}
                    <SHr height={20} />
                    <SList
                        limit={20}
                        data={this.state.data}
                        render={this.component.bind(this)}
                        order={[{ key: "idven", order: "desc" }, { key: "vfec", order: "desc", peso: 2 }]}
                        {...this.fecha_inicio ?
                            {
                                filter: (a) => new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") >= this.fecha_inicio && new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") <= this.fecha_fin
                            } : null}
                        // filter={(a) => new SDate(a.vfec).toString("yyyy-MM-dd") >= this.fecha_inicio && new SDate(a.vfec).toString("yyyy-MM-dd") <= this.fecha_fin} : null}

                        buscador={true}
                    />
                </Container>
                <SHr height={30} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(pedidosEmpresa);