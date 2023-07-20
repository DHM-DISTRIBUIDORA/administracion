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
            {this.buildLabel({ label: "Id", value: this.data?.idprd })}
            {this.buildLabel({ label: "Código", value: this.data?.prdcod })}
            {this.buildLabel({ label: "Nombre", value: this.data?.prdnom })}
            {this.buildLabel({ label: "Unidad", value: this.data?.prdunid })}
            {this.buildLabel({ label: "Unidad por caja", value: this.data?.prdcxu })}
            {this.buildLabel({ label: "Precio oficial", value: this.data?.prdpoficial })}
      
            <SView col={"xs-12"}  style={{alignItems: "flex-end"}}>
                <SText fontSize={10} color={STheme.color.gray}>{this.data?.prfecmod}</SText>
            </SView>
            <SHr height={5} />
        </SView>
    }
}
export default connect(index);