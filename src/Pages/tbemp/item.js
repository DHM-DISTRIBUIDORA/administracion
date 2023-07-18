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
        return <SView col={"xs-12"}>
            {this.buildLabel({ label: "Código", value: this.data?.empcod })}
            {this.buildLabel({ label: "Nombre", value: this.data?.empnom })}
            {this.buildLabel({ label: "Dirección", value: this.data?.empdir })}
            {this.buildLabel({ label: "Teléfono", value: this.data?.emptel })}
            <SView col={"xs-12"}  style={{alignItems: "flex-end"}}>
                <SText fontSize={10} color={STheme.color.gray}>{this.data?.empfecmod}</SText>
            </SView>
            <SHr height={5} />
        </SView>
    }
}
export default connect(index);