import React, { Component } from 'react';
import { SDate, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import BarraCargando from '../BarraCargando';
// import Restaurante from '../Restaurante';
import Pedido from '../../Components/Pedido';

// import DetalleBox from './DetalleBox';
// import HoraEstimada from './HoraEstimada';
export type BotonesEstadoPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<BotonesEstadoPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;
        this.props.onPress(this.props.data)
    }

    render_buttom({ label, icon, loading, complete, chat }) {
        return <SView col={"xs-3.5"} style={{ borderBottomWidth: 3, }} border={'transparent'} center>
            <SHr height={8} />

            {(chat == false) ? <Pedido.Chat data={this.props.data} /> : null}
            <SView width={48} height={48}>
                <SIcon name={icon} fill={STheme.color.primary} />
            </SView>
            <SHr height={8} />
            <SView col={"xs-12"} height={10} backgroundColor={STheme.color.card} style={{ borderRadius: 16, overflow: 'hidden', }} >
                {!!loading ? <BarraCargando height={8} /> : null}
                {!!complete ? <SView col={"xs-12"} height backgroundColor={STheme.color.primary} /> : null}
            </SView>
            <SHr height={4} />
            <SText color={STheme.color.primary} style={{ fontSize: 12 }} bold>{label}</SText>
        </SView>
    }
    render_buttom_({ label, loading }) {
        return <SView col={"xs-3.5"} style={{ borderBottomWidth: 3, }} border={'transparent'} center>
            <SHr height={8} />

            {/* {(chat == false) ? <Pedido.Chat data={this.props.data} /> : null} */}
            <SView width={48} height={48}>
                {/* <SIcon name={'MPedido'} fill={STheme.color.primary} /> */}
            </SView>
            <SHr height={8} />
            <SView col={"xs-12"} height={10} backgroundColor={STheme.color.card} style={{ borderRadius: 16, overflow: 'hidden', }} >
                {!!loading ? <BarraCargando height={8} /> : null}
                {/* {!!complete ? <SView col={"xs-12"} height backgroundColor={STheme.color.primary} /> : null} */}
                
            </SView>
            <SHr height={4} />
            <SText color={STheme.color.white} style={{ fontSize: 12 }} bold>{label}</SText>
        </SView>
    }
    getBotones() {
        const state = this.props?.data?.state;
        var confirmado = false;
        var preparacion = false;
        var delivery = false;

        if (state == "listo" || state == "buscando_conductor" || state == "confirmando_conductor" || state == "esperando_conductor") {
            confirmado = true;
        }
        if (state == "entregado_conductor" || state == "conductor_llego") {
            console.log(state)
            confirmado = true;
            preparacion = true;
        }
        if (state == "entregado") {
            confirmado = true;
            preparacion = true;
            delivery = true;
        }
        return (<>
            <SView col={"xs-12  "} height={90} row center >
                {this.render_buttom({ label: "Confirmación", icon: "PedConfirmacion", loading: !confirmado, complete: confirmado })}
                <SView width={5} height />
                {this.render_buttom({ label: "Preparación", icon: "PedPreparacion", loading: !preparacion && confirmado, complete: preparacion })}
                <SView width={5} height />
                {this.render_buttom({ label: "Delivery", icon: "PedDelivery", loading: !delivery && preparacion, complete: delivery, chat: !preparacion })}

            </SView>
        </>
        );
    }


  

    render() {

        return <SView col={"xs-12"} center>
            <SView col={"xs-12 md-7"} center style={{ borderRadius: 12,  }} onPress={() => {
            }} >
                <SHr height={10} />
               
                <SView col={"xs-12"} center>
                    <SIcon name='Idetall' height={10} />
                </SView>
                <SHr height={4} />
                <SView height={56} col={"xs-12"} center>
                    {/* <HoraEstimada {...this.props} /> */}
                </SView>
               
                {this.render_buttom_({label:"El repartidor está en camino",loading:true})}
                <SHr />
            </SView >
        </SView >
    }
}
export default (index);