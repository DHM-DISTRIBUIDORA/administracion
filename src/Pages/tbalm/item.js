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
        const { almcod, almnom } = this.data
        return <SView col={"xs-12"}>
            {/* {this.buildLabel({ label: "Id", value: this.data?.idprd })} */}
            {this.buildLabel({ label: "Código", value: almcod })}
            {this.buildLabel({ label: "Nombre", value: almnom })}
            <SHr height={5} />
        </SView>
    }
}
export default connect(index);