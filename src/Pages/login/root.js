import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SLoad, SNavigation, SPage, SPopup, SText, STheme, SThread, SView } from 'servisofts-component';
import { AccentBar, BottomNavigator, Container } from '../../Components';
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
    componentDidMount() {
        new SThread(100, "render_window", true).start(() => {
            this.setState({ ready: true })
        })
    }

    render() {
        // if (!this.state.ready) return <SLoad />
        return (
            <SPage hidden footer={<BottomNavigator url={"/login"} float={80}/>}>
                <SView col={"xs-12"} center>
                    <SView col={"xs-12"} backgroundColor={STheme.color.primary}>
                        <Container>
                            <SHr height={50} />
                            <SectionHeader select={"user"} />
                            <SHr height={16} />
                        </Container>
                    </SView>
                    <Container loading={!this.state.ready}>
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