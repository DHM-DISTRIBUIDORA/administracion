import React, { Component } from 'react';
import { SHr, SLoad, SNavigation, SPage, SText, SUuid, SView } from 'servisofts-component';

import { DBComponent } from '../DataBase/DBComponent';
import { Container } from '../Components';

export default class index extends Component {


    render() {
        return <SPage>
            <Container>
                <DBComponent />
            </Container>
        </SPage>
    }

}
