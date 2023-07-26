import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, Container } from '../../Components';
// import SectionApis from './components/SectionApis';
import SectionFooter from './components/SectionFooter';
import SectionForm from './components/SectionForm';
import SectionHeader from './components/SectionHeader';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <SPage hidden >
                <SView col={"xs-12"} center>
                    <SView col={"xs-12"} backgroundColor={STheme.color.primary}>
                        <Container>
                            <SHr height={50} />
                            <SectionHeader />
                            <SHr height={16} />
                        </Container>
                    </SView>
                    <Container>
                        <SHr height={16} />
                        <SectionForm ref={ref => this._sectionForm = ref} />
                        <SHr height={25} />
                        {/* <SectionApis/> */}
                        <SHr height={35} />
                        <SectionFooter onPress={() => {
                            this._sectionForm.submit();
                        }} />
                        <SHr height={50} />
                    </Container>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(login);