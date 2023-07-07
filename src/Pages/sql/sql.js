import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native'
import { SHr, SPage, SText, SView, SLoad, STheme, SImage, SIcon, SNavigation, SButtom, SInput, STable2, SStorage, SList } from 'servisofts-component';
import { Banner, BottomNavigator, Container, TopBar, } from '../../Components';
import SSocket from 'servisofts-socket'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            default: "select * from tbzon"
        };
    }
    componentDidMount() {
        // SSocket.sendPromise({
        //     component: "dhm",
        //     type: "get",
        //     select: "select * from sysobjects where xtype = 'U'",
        // }).then((resp) => {
        //     this.setState({ tables: resp.data, loading: false })
        //     console.log(resp);
        // }).catch(e => {
        //     this.setState({ error: e.error, loading: false })
        //     console.error(e);
        // })
    }

    hanldeRequest_select() {
        let value = this.inp.getValue();
        if (!value) return;
        this.setState({ loading: true, data: null, error: null })
        SSocket.sendPromise({
            component: "dhm",
            type: "get",
            select: value,
        }).then((resp) => {
            this.setState({ error: "", data: resp.data, loading: false })
            console.log(resp);
        }).catch(e => {
            this.setState({ error: e.error, data: null, loading: false })
            console.error(e);
        })
    }

    getHeaders() {
        if (!this.state.data) return [];
        let keys = this.state.data.reduce((accumulator, current) => {
            return accumulator.concat(Object.keys(current));
        }, []);
        let uniqueKeys = [...new Set(keys)];
        let arr = [];
        for (let index = 0; index < uniqueKeys.length; index++) {
            arr.push({
                key: uniqueKeys[index],
                width: 100,
            })

        }
        return arr;

    }
    getError() {
        if (!this.state.error) return null;
        return <SText>{this.state.error}</SText>
    }
    getTable() {
        if (!this.state.data) return null;
        return <STable2
            header={[
                { key: "index", label: "#" },
                ...this.getHeaders(),
            ]}
            data={this.state.data ?? {}}
        />
    }

    getCreateQuery() {

    }
    getTableNames() {
        if (!this.state.tables) return <SLoad />
        return <SList
            buscador
            space={0}
            data={this.state.tables}
            limit={40}
            render={(obj) => {
                return <SView col={"xs-12"} onPress={() => {
                    this.setState({ tableSelect: obj })
                    // this.inp.setValue("SELECT * top 100 FROM " + obj.name)
                }} style={{
                    backgroundColor: this.state?.tableSelect?.name == obj.name ? "#000" : "",
                    padding: 4
                }}>
                    <SText bold>{obj.name}</SText>
                </SView>
            }}
        />
    }
    render() {
        return <SPage disableScroll hidden>
            <SView col={"xs-12"} row height>
                <SView col={"xs-12"} height>
                    <SButtom styleText={{ color: STheme.color.text }} onPress={this.hanldeRequest_select.bind(this)}>EXECUTE</SButtom>
                    <SView col={"xs-12"} height={200} card>
                        <SInput ref={ref => this.inp = ref} type={"textArea"} height defaultValue={this.state.default} />
                    </SView>
                    <SView flex col={"xs-12"}>
                        <SLoad hidden={!this.state.loading} />
                        {this.getError()}
                        {this.getTable()}
                    </SView>
                </SView>
            </SView>

        </SPage>
    }


}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);