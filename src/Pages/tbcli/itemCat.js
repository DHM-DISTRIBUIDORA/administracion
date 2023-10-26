import React, { Component } from 'react';

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
            {this.buildLabel({ label: "Codigo", value: this.data?.catcod })}
            {this.buildLabel({ label: "Nombre", value: this.data?.catnom })}
        </SView>
    }
}
export default connect(index);