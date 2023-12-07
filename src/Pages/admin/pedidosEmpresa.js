import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import { Container } from '../../Components';
import Model from '../../Model';
import DataBase from '../../DataBase';
// import item from '/item';
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
        this.calcularDatos();
        // let producto;
        // let categoria;

        // DataBase.dm_cabfac.all().then(dt => {
        //     let data = dt.map((a) => {
        //         return a
        //     }).filter((a) => new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") >= this.fecha_inicio && new SDate(a.vfec, "yyyy-MM-dd").toString("yyyy-MM-dd") <= this.fecha_fin)

        //     data.map((a) => {
        //         a.detalle.map((b) => {
        //             console.log(b)
        //             producto = DataBase.tbprd.filtered(`prdcod == $0`, b.prdcod).then((e) => {
        //                 this.setState({ dataProducto: e[0] })

        //                 categoria = DataBase.tbprdlin.filtered(`idlinea == ${(e[0].idlinea)}`).then((c) => {
        //                     this.setState({ dataCategoria: c[0] })
        //                     b.nombreCategoria = c[0].linnom;
        //                 })
        //             })
        //             return b;
        //         })
        //     })

        //     this.setState({ data: data })


        // })

    }

    async calcularDatos() {
        // const dm_cabfac = await DataBase.dm_cabfac.all();
        console.log(this.fecha_inicio, this.fecha_fin)
        // const dm_cabfac = await DataBase.dm_cabfac.filtered(`vfec >= $0 && vfec <= $1`, this.fecha_inicio + " 00:00:00.0", this.fecha_fin + " 00:00:00.0")
        // const dm_cabfac = await DataBase.dm_cabfac.all();

        const productos = await DataBase.tbprd.all();
        const tbprdlin = await DataBase.tbprdlin.all();
        const dm_cabfac = SSocket.sendPromise({
            "component": "dm_cabfac",
            "type": "getPedidos",
            "estado": "cargando",
            "idemp": this.idemp,
            "fecha": this.fecha_inicio,
        }).then((e) => {
          

            // return e.data;
            Object.values(e.data).map(pedido => {
                // console.log(pedido)
                // console.log(productos)
                pedido.detalle.map((detalle) => {
                    let producto = productos.find(a => a.prdcod == detalle.prdcod)
                    if (!lines[producto?.idlinea]) {
                        let line = tbprdlin.find(a => a.idlinea == producto?.idlinea)
                        lines[producto?.idlinea] = { total: 0, linnom: line.linnom, idlinea: producto?.idlinea };
                    }
                    lines[producto?.idlinea].total += detalle.vdcan * detalle.vdpre
    
                })
            })
            this.setState({ data: lines })
        }).catch((e) => {
            console.log(e);
            return e;
        });
        // this.setState({ cantidad_pedidos: e.length })
        let lines = {};




        // const productos = await DataBase.tbprd.all();
        // const tbprdlin = await DataBase.tbprdlin.all();
        // console.log("holuuuu")
        // console.log("dm_cabfac")
        // console.log(dm_cabfac)
      
        // Object.values(dm_cabfac).map(pedido => {
        //     console.log("holaaaa")
        //     pedido.detalle.map((detalle) => {
        //         let producto = productos.find(a => a.prdcod == detalle.prdcod)
        //         if (!lines[producto?.idlinea]) {
        //             let line = tbprdlin.find(a => a.idlinea == producto?.idlinea)
        //             lines[producto?.idlinea] = { total: 0, linnom: line.linnom, idlinea: producto?.idlinea };
        //         }
        //         lines[producto?.idlinea].total += detalle.vdcan * detalle.vdpre

        //     })
        // })
        // this.setState({ data: lines })
        console.log(lines)
    }
    header = (obj) => {

        return <SView col={"xs-12"} padding={8} row backgroundColor={STheme.color.primary} style={{ borderRadius: 4 }}>

            <SView col={"xs-6"} row>
                <SText color={STheme.color.white} bold fontSize={16} center>Categoría</SText>
                {/* <SView flex />
                <SText>{(obj.vfec + "").substring(0, 10)}</SText> */}
            </SView>
            <SView col={"xs-6"} flex style={{ alignItems: "flex-end" }}>
                <SText color={STheme.color.white} bold fontSize={16} >Monto en Bs.</SText>
            </SView>


        </SView>
    }

    component = (obj, key) => {

        return <SView col={"xs-12"} card padding={8} row>
            <SView col={"xs-6"} >
                <SText>{obj.linnom}</SText>
            </SView>
            <SView col={"xs-6"} style={{
                alignItems: "flex-end"
            }}>
                {/* <SText bold># {obj}</SText> */}
                <SText bold>Bs. {SMath.formatMoney(obj.total)}</SText>
            </SView>
        </SView>
    }
    render() {
        if (!this.state.data) return <SLoad />
        // if (!this.state.dataProducto) return <SLoad />

        return (
            <SPage >
                <Container >
                    {(this.fecha_inicio) ?
                        <SView col={"xs-12"} center>
                            <SText fontSize={20} bold >Pedidos por categoría entre: </SText>
                            <SText fontSize={16} bold >{this.fecha_inicio} y el  {this.fecha_fin}</SText>
                        </SView> : null}

                    <SHr height={20} />
                    {this.header()}
                    {/* <SHr height={20} /> */}
                    <SList
                        limit={20}
                        data={this.state.data}
                        render={this.component.bind(this)}
                        order={[{ key: "idven", order: "desc" }, { key: "vfec", order: "desc", peso: 2 }]}
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