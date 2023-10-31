import { Text, View } from 'react-native'
import React, { Component, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import DataBase, { DB } from '.';
import { SIcon, SLoad, SText, STheme, SView, SNotification, SThread, SPopup, SDate } from 'servisofts-component';
import SDB, { TableAbstract } from 'servisofts-db';
import SSocket from 'servisofts-socket';
import SaveTop from '../Components/SaveTop';
import Model from '../Model';


type DataBaseContainerPropsType = {
    children?: any
}
export default class DataBaseContainer extends Component<DataBaseContainerPropsType> {

    static sync = async () => {

    }
    static saveChanges = async () => {

    }


    state = {
        ready: false
    }
    run = true;
    componentDidMount(): void {
        DataBase.init().then(() => {
            this.setState({ ready: true })
        }).catch(e => {
            this.setState({ ready: true })
        })
        this.run = true;
        this.hilo();
    }
    componentWillUnmount(): void {
        this.run = false;
    }

    hilo() {
        if (!this.run) return;
        new SThread(DataBase.Funciones.TimeHilo, "hilo_del_guardado", true).start(() => {
            if (!this.run) return;
            DataBase.Funciones.saveAllChanges();
            this.hilo();
        })
    }
    render() {
        const nameIcon: any = "LogoClear"
        if (!this.state.ready) return <SView col={"xs-12"} flex center >
            <SView col={"xs-6 sm-5 md-4 lg-3 xl-2 xxl-1.5"}>
                <SIcon name={nameIcon} fill={STheme.color.text} stroke={STheme.color.text} />
            </SView>
        </SView>
        return <>
            {this.props.children}
            <SaveTop />
        </>
    }
}
