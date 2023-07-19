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
            {this.buildLabel({ label: "Id", value: this.data?.idus })}
            {this.buildLabel({ label: "Usuario", value: this.data?.usuario })}
            {this.buildLabel({ label: "Nombre", value: this.data?.nombre })}
            {/* {this.buildLabel({ label: "Tipo Zona", value: this.data?.ztipo })} */}
            <SView col={"xs-12"}  style={{alignItems: "flex-end"}}>
                <SText fontSize={10} color={STheme.color.gray}>{this.data?.fecmod}</SText>
            </SView>
            <SHr height={5} />
        </SView>
    }
}
export default connect(index);