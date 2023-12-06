import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SExcel, SLoad, SText, STheme } from 'servisofts-component';
import { TableAbstract } from 'servisofts-db';

export default class ExportExcel extends Component<{ table: TableAbstract, label: string, save?: boolean }> {
    state = {}
    componentDidMount() {
        const { table, label } = this.props;
        table.all((a) => {
            this.setState({
                data: a
            })
        }).catch(e => {

        })
    }
    handlePress = () => {
        const { table, label } = this.props;
        console.log("entro acas")

        table.all().then(data => {
            const properties_table = Object.keys(table.scheme.properties);
            let headers = [];
            properties_table.map(prop_name => {
                headers.push({ key: prop_name, label: prop_name, type: "s", style: { width: 100 } })
            })

            SExcel.createAndSave({
                name: "DHM-" + table.scheme.name + "-" + new SDate().toString("yyyyMMdd-hh:mm:ss"),
                styleHeader: { width: 400, },
                header: headers,
                data: data
            })
        }).catch(e => {
            console.error(e);
        })

    }
    render() {

        return <SText card padding={4} style={{ backgroundColor: STheme.color.success }} onPress={this.handlePress.bind(this)}>Export</SText>
        // return <SExcel
        //     name={"DHM-" + table.scheme.name + "-" + new SDate().toString("yyyyMMdd-hh:mm:ss")}
        //     styleHeader={{ width: 400, }}
        //     data={this.state.data}
        //     header={headers}
        // />
    }
}