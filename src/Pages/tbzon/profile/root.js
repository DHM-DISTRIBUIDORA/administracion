import React, { Component } from 'react';

import DPA, { connect } from 'servisofts-page';
import { Parent } from ".."
import { SHr, SIcon, SText, SView } from 'servisofts-component';
import Model from '../../../Model';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
import DataBase from '../../../DataBase';

class index extends DPA.profile {
    constructor(props) {
        super(
            props,
            {
                Parent: Parent,
                excludes: ["zterr", "ztipo", "idterr", "zest", "zdmsest", "zdesfin", "znsuc", "idgz", "zmarc", "sucreg", "zusumod", "zfecmod"]
            }
        );
    }


    componentDidMount() {
        DataBase.tbzon.objectForPrimaryKey(parseInt(this.pk)).then(data => {
            this.setState({ data: data })
        }).then(e => {
            console.error(e);
        })
    }
    // $inputs() {
    //     var inp = super.$inputs();
    //     inp["zcod"].label = "Código zona"
    //     inp["idemp"].label = "Id empleado"
    //     inp["znom"].label = "Nombre zona"
    //     inp["zdia"].label = "Día"
    //     return inp;
    // }


    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return this.state?.data;
        return Parent.model.Action.getByKey(this.pk);
    }
    $renderContent() {
        console.log(this.data)
        return <SView col={"xs-12"} row>
            {this.buildLabel({ label: "Código zona", value: this.data?.zcod })}
            {/* {this.buildLabel({ label: "Nombre", value: this.data?.clinom })}
            {this.buildLabel({ label: "Direccion", value: this.data?.clidir })}
            {this.buildLabel({ label: "Pedidos", value: this.data?.pedidos })}
            {this.buildLabel({ label: "Ventas", value: this.data?.ventas })} */}
        </SView>
    }
    $footer() {
        return <SView col={"xs-12"} >
            <SHr />
            <SText fontSize={16} bold>Menú</SText>
            <SHr />
            {/* <MenuPages path={Parent.path+"/profile/"} permiso={"ver"} params={{
                pk: this.pk
            }}>
            </MenuPages> */}
            <MenuPages path={Parent.path + "/profile/"} permiso={"ver"} params={{
                pk: this.pk
            }} >
                {/* <MenuButtom label='Empleados' url={Parent.path + "/profile/zona_empleado"} params={{
                    pk: this.pk
                }}></MenuButtom> */}
            </MenuPages>
        </SView>
    }

}
export default connect(index);