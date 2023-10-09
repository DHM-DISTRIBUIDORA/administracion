import React, { Component } from 'react';
import { SDate, SForm, SHr, SInput, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { Btn, Container, PButtom } from '../../Components';
import DataBase from '../../DataBase';
import Model from '../../Model';
export default class editar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.idven = SNavigation.getParam("pk");
    }


    componentDidMount() {
        DataBase.dm_cabfac.objectForPrimaryKey(this.idven).then((e) => {
            this.setState({ data: e })
        })

    }

    renderForm() {
        const data = this.state.data;
        if (!data) return <SLoad />
        return <SForm inputs={{
            "vfec": { label: "vfec", defaultValue: data["vfec"] },
            // "nombrecliente": { label: "nombrecliente", defaultValue: data["nombrecliente"] },
            "nit": { label: "nit", defaultValue: data["nit"] },
            "vobs": { label: "vobs", defaultValue: data["vobs"], type: "textArea" },
            "detalle": { label: "detalle", defaultValue: JSON.stringify(data["detalle"]), type: "textArea" },
            // "fecha": { defaultValue: data["fecha"] /}
        }}
            onSubmitName={"editar"}
            onSubmit={(val) => {
                val.detalle = JSON.parse(val.detalle)
                DataBase.dm_cabfac.update({
                    ...data,
                    ...val,
                    sync_type: "update"
                }).then(e => {
                    console.log(e);
                    SNavigation.goBack();
                }).catch(e => {
                    console.error(e);
                })
            }}
        />
    }
    render() {
        return (<SPage >
            <Container>
                <SHr height={20} />
                <SText font={'AcherusGrotesque-Bold'} fontSize={24} bold style={{ textDecorationLine: 'underline' }} >PEDIDO</SText>
                {/* <SText>{JSON.stringify(this.state)}</SText> */}
                {this.renderForm()}
            </Container>
        </SPage>
        );
    }
}
