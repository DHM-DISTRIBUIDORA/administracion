import React, { Component } from 'react';
import { SHr, SIcon, SPage, SText, STheme, SView, SMapView, SLoad, SNavigation, SInput, SPopup, SDate, SBuscador } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../../Model';
import { Parent } from ".."
import { connect } from 'react-redux';
import MarkerCircle from '../../../Components/Marker/MarkerCircle';
import PopupAutoCompleteCliente from './components/PopupAutoCompleteCliente';
import { GeolocationMapSelect } from 'servisofts-rn-geolocation'
import DataBase from '../../../DataBase';
import MapaComponent from '../../vendedor/MapaComponentCluster';
import { Trigger } from 'servisofts-db';


// const Parent2 = {
//     name: "Clientes del empleado",
//     path: `/tbcli`,
//     model: Model.tbcli
// }

const Marker = React.memo(({ onPress }) => <SView width={20} height={20} center onPress={onPress}>
    <SIcon name={"Marker"} fill={STheme.color.text} />
</SView>, (prevProps, nextProps) => prevProps === nextProps);
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ...this.state,
            curdate: new SDate(),
            pk: SNavigation.getParam("pk"),
        };
        this.pk = SNavigation.getParam("pk")
    }




    componentDidMount() {
        this.loadDataAsync();
        this.t1 = Trigger.addEventListener({
            on: ["insert", "update", "delete"],
            tables: ["visita_vendedor"]
        }, (evt) => {
            console.log("ENTRO EN EL TRIGGERRRRRR", evt)
            this.loadDataAsync();
        });
    }
    componentWillUnmount() {
        Trigger.removeEventListener(this.t1);
    }

    async loadDataAsync() {
        this.setState({ loading: true })
        try {

            console.log()
            // const zonas = await DataBase.tbzon.filtered("zdia == $0",new SDate().date.getDay());
            // const zonas = await DataBase.tbzon.filtered("idemp == $0", parseInt(this.pk));
            // let query = "";
            // zonas.map((zon, i) => {
            //     if (i > 0) {
            //         query += " || "
            //     }
            //     query += ` idz == ${zon.idz} `
            // })
            // let clientes = []
            // if (query) {
            //     clientes = await DataBase.tbcli.filtered(query);
            // }

            const clientes = await DataBase.tbcli.all();
            const visitas = await DataBase.visita_vendedor.all();
            console.log(visitas.length)
            // console.log("zonas", zonas);
            this.setState({
                loading: false,
                data: clientes,
                visitas: visitas
            })

        } catch (error) {
            this.setState({ loading: false })
            console.error(error);
        }
    }


    render() {
        console.log("asldalsda")
        return <SPage disableScroll title={this.state.curdate.toString("DAY, dd de MONTH.")}>
            <SView col={"xs-12"} center row padding={4} height={50}>
                <SView flex center>
                    <SBuscador onChange={(e) => {
                        this.setState({ busqueda: e })
                        console.log(e)
                    }} />
                    {/* <SInput placeholder={"Buscar al cliente"} /> */}
                    {/* <SText col={"xs-11"} fontSize={12}>Activate para visitar a tus clientes.</SText> */}
                </SView>
            </SView>
            <SView col={"xs-12"} flex>
                <MapaComponent state={this.state} setState={this.setState.bind(this)} />
                {/* <DetalleMapaComponent state={this.state} setState={this.setState.bind(this)} /> */}
            </SView>
            {/* <SLoad type='window' hidden={!this.state.loading} /> */}
        </SPage>
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);