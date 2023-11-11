import React, { Component } from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SHr, SNavigation, SPopup, SView } from 'servisofts-component';
import Model from '../../Model';
import CryptoJS from 'crypto-js';
import { PButtom } from '../../Components';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["Password"]
        });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $inputs() {
        var inputs = super.$inputs();
        // inputs["Password"].type = "password"
        inputs["Correo"].type = "email"
        // inputs["Telefono"].type = "phone"
        return inputs;
    }
    $onSubmit(data) {

        // data["Password"] = CryptoJS.MD5(data["Password"]).toString();
        Parent.model.Action.editar({
            data: {
                ...this.data,
                ...data
            },
            key_usuario: ""
        }).then((resp) => {
            SNavigation.replace("/usuario/profile", { pk: this.pk })

        }).catch(e => {
            console.error(e);
        })
    }

    getCambiarPass() {
        return <>

            <SView col={"xs-12"} center>
                <PButtom fontSize={20} onPress={() => {
                    SNavigation.navigate("/perfil/changepass" , { pk: this.pk })
                }}>CAMBIAR CONTRASEÑA</PButtom>
            </SView>
        </>
    }

    $footer() {
        return <SView col={"xs-12"} center>
            <SHr height={30}/>
            {this.getCambiarPass()}
            <SHr />
        </SView>
    }
}

export default connect(index);