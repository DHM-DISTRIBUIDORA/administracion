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
            {this.buildLabel({ label: "Codigo", value: this.data?.clicod })}
            {this.buildLabel({ label: "Nombre", value: this.data?.clinom })}
            {this.buildLabel({ label: "Direccion", value: this.data?.clidir })}
        </SView>
    }
}
export default connect(index);