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
            {this.buildLabel({ label: "Id", value: this.data?.idtg })}
            {this.buildLabel({ label: "Tipo", value: this.data?.tgdoc })}
            {this.buildLabel({ label: "Detalle", value: this.data?.tgdet })}
            {this.buildLabel({ label: "Estado", value: this.data?.tgest })}
      
            <SView col={"xs-12"}  style={{alignItems: "flex-end"}}>
                <SText fontSize={10} color={STheme.color.gray}>{this.data?.tgfec}</SText>
            </SView>
            <SHr height={5} />
        </SView>
    }
}
export default connect(index);