import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SHr, SList, SLoad, SText, STheme, SView } from 'servisofts-component';

class index extends DPA.item {
    constructor(props) {
        super(props, {
            Parent: Parent,
            // row:false
        });
    }

    $renderContent() {
        return <SView col={"xs-12"} row>
            {this.buildLabel({ label: "Id", value: this.data?.prdcod })}
            {this.buildLabel({ label: "Categoría", value: this.data?.catcod })}
            {this.buildLabel({ label: "Nombre", value: this.data?.nombre })}
            {this.buildLabel({ label: "Unidad", value: this.data?.Unidad })}
            {this.buildLabel({ label: "Unidades por caja", value: this.data?.uxc })}
            {this.buildLabel({ label: "Precio", value: this.data?.Precio })}
            {this.buildLabel({ label: "Stock", value: this.data?.Stock })}
            {this.buildLabel({ label: "Id Almacén", value: this.data?.idalm })}
            
            <SHr height={5} />
        </SView>
    }
}
export default connect(index);