import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SHr, SList, SLoad, SText, STheme, SView } from 'servisofts-component';
import DataBase from '../../DataBase';

const dia = [
    // { key: "", content: "Seleccione..." },
    { key: 0, content: "Domingo" },
    { key: 1, content: "Lunes" },
    { key: 2, content: "Martes" },
    { key: 3, content: "Miércoles" },
    { key: 4, content: "Jueves" },
    { key: 5, content: "Viernes" },
    { key: 6, content: "Sábado" }
]
class index extends DPA.item {
    constructor(props) {
        super(props, {
            Parent: Parent,
            // row:false
        });
    }

    componentDidMount() {
      
    }
    $renderContent() {
        return <SView col={"xs-12"} row>
            {/* {this.buildLabel({ label: "Id", value: this.data?.idz })} */}
            {this.buildLabel({ label: "Código", value: this.data?.zcod })}
            {this.buildLabel({ label: "Nombre Zona", value: this.data?.znom })}
            {/* {this.buildLabel({ label: "Día", value: dia[this.data?.zdia]?.content })} */}
            {/* {this.buildLabel({ label: "Emp", value: this.state?.empleado?.empnom })} */}
            {/* {this.buildLabel({ label: "Ventas", value: this.data?.ventas })} */}
            {/* {this.buildLabel({ label: "Tipo Zona", value: this.data?.ztipo })} */}
            <SView col={"xs-12"} style={{ alignItems: "flex-end" }}>
                <SText fontSize={10} color={STheme.color.gray}>{this.data?.zfecmod}</SText>
            </SView>
            {/* <SHr height={5} /> */}
        </SView>
    }
}
export default connect(index);