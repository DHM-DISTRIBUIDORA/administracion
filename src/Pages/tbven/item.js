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
            {this.buildLabel({ label: "Id", value: this.data?.idven })}
            {this.buildLabel({ label: "vdoc", value: this.data?.vdoc })}
            {this.buildLabel({ label: "vdet", value: this.data?.vdet })}
            {this.buildLabel({ label: "idcli", value: this.data?.idcli })}
            {this.buildLabel({ label: "vtipo", value: this.data?.vtipo })}
      
            <SView col={"xs-12"}  style={{alignItems: "flex-end"}}>
                <SText fontSize={10} color={STheme.color.gray}>{this.data?.vfec}</SText>
            </SView>
            <SHr height={5} />
        </SView>
    }
}
export default connect(index);