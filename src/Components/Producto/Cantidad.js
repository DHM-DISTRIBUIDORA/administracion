import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SIcon, SText, STheme, SThread, SView } from 'servisofts-component'

export default class Cantidad extends Component {
    state = {
        cantidad: this.props.defaultValue ?? 0,
        open: false
    }


    handleEnd = () => {
        if (this.props.onChange) this.props.onChange(this.state.cantidad)
    }
    show() {
        this.setState({ open: true });
        new SThread(1500, "Cantidad_hilo", true).start(() => {
            this.handleEnd();
            this.setState({ open: false });

        })
    }

    OpenComponent = () => {
        const { cantidad, open } = this.state;
        const size = 28;
        return <SView width={100} height={30} style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: STheme.color.text,
            backgroundColor: STheme.color.white,
        }} row center >
            <SView width={size} height={size} card center
                onPress={() => {
                    this.state.cantidad--;
                    if (this.state.cantidad <= 0) {
                        this.setState({ open: false });
                        return;
                    };

                    this.show();
                }} style={{
                    backgroundColor: STheme.color.lightGray + "50"
                }}
            >
                {(cantidad <= 1) ? < SIcon name='Delete3' width={15} height={15} /> : <SText fontSize={23} bold color={STheme.color.black} >{"-"}</SText>}
            </SView>
            <SView flex height={size} center >
                <SText fontSize={15} bold color={STheme.color.black}>{cantidad}</SText>
            </SView>
            <SView width={size} height={size} card center
                onPress={() => {
                    if(this.props.limit){
                        if(this.props.limit<=this.state.cantidad){
                            return;
                        }
                    }
                    this.state.cantidad++;
                    this.show()
                }}
                style={{
                    backgroundColor: STheme.color.lightGray + "50"
                }}
            >
                <SText fontSize={23} bold color={STheme.color.black} >{"+"}</SText>
            </SView>
        </SView >
    }
    render() {
        const { cantidad, open } = this.state;
        if (open) return this.OpenComponent()
        return (
            <SView width={30} height={30} card center style={{
                backgroundColor: (cantidad > 0 ? STheme.color.text : STheme.color.card)
            }} onPress={() => {
                if (this.state.cantidad < 1) this.state.cantidad = 1;
                this.show()
            }}>
                {cantidad > 0 ? <SText fontSize={16} bold color={STheme.color.background} >{cantidad}</SText> : <SText fontSize={23} bold >{"+"}</SText>}
            </SView>
        )
    }
}