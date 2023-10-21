import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
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
        let categoria;

        DataBase.dm_cabfac.all().then(dt => {
            let data = dt.map((a) => {
                return a
            }).filter((a) => new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") >= this.fecha_inicio && new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") <= this.fecha_fin)

            data.map((a) => {
                a.detalle.map((b) => {
                    console.log(b)
                    producto = DataBase.tbprd.filtered(`prdcod == ${(b.prdcod + "")}`).then((e) => {
                        this.setState({ dataProducto: e[0] })

                        categoria = DataBase.tbprdlin.filtered(`idlinea == ${(e[0].idlinea)}`).then((c) => {
                            this.setState({ dataCategoria: c[0] })
                            b.nombreCategoria = c[0].linnom;
                        })
                    })
                    return b;
                })
            })
          
            this.setState({ data: data })

        })

    }

    header = (obj) => {

        return <SView col={"xs-12"}  padding={8} row backgroundColor={STheme.color.primary} style={{borderRadius:4}}>

            <SView col={"xs-6"} row>
                <SText color={STheme.color.white} bold fontSize={16} center>Nombre de empresa</SText>
                {/* <SView flex />
                <SText>{(obj.vfec + "").substring(0, 10)}</SText> */}
            </SView>
            <SView col={"xs-6"} flex style={{alignItems:"flex-end"}}>
                <SText color={STheme.color.white} bold fontSize={16} >Monto en Bs.</SText>
            </SView>


        </SView>
    }

    component = (obj) => {
        const detalle = obj.detalle ?? []
        let total = 0;
        let cantidadProductos = 0;
        let nombreLinea = "";
        detalle.map(a => {
            total += a.vdpre * a.vdcan
            cantidadProductos += a.vdcan;
            nombreLinea = nombreLinea + a.nombreCategoria + " - ";
        })
        return <SView col={"xs-12"} card padding={8} onPress={() => {
            SNavigation.navigate("/dm_cabfac/recibo", { pk: obj.idven })
        }} row>
            <SView col={"xs-12"} flex row style={{ alignItems: "flex-end" }}>
                <SText>{(obj.vfec + "").substring(0, 10)}</SText>
            </SView>
            <SView col={"xs-6"} row>
                <SText>{nombreLinea}</SText>
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
        // if (!this.state.data) return <SLoad />
        // if (!this.state.dataProducto) return <SLoad />

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