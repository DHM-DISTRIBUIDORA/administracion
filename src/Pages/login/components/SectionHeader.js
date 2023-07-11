
import React, { Component } from 'react';
import { SHr, SIcon, SNavigation, SText, STheme, SView } from 'servisofts-component';
import PButtom2 from '../../../Components/PButtom2';
export default class SectionHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center >
                <SView col={"xs-12"} height={90} >
                    <SIcon name={"LogoWhite"} fill={STheme.color.secondary} />
                </SView>
                <SHr height={20} />
                <SView col={"xs-12"} height={50} row>
                    <SView col={"xs-6"} height >
                        <PButtom2 outline={false} onPress={() => {
                        }}>Inicio Sesión</PButtom2>
                    </SView>
                    <SView col={"xs-6"} height >
                        <PButtom2 outline={true} onPress={() => {
                            SNavigation.navigate("/registro")
                        }}>Registro</PButtom2>
                    </SView>
                </SView>
            </SView>
        );
    }
}
