import React, { Component } from 'react';
import { SButtom, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component'
import SCharts, { Example, SChartStyleType, SChartsPropsType } from "servisofts-charts"

// const colors = ["#900", "#990", "#090"];
const colors = ["#67B7DC", "#6794DC", "#6771DC", "#8067DC", "#A367DC", "#C767DC", "#DC67CE"];
// const colors = [];
const data: SChartsPropsType["data"] = [
    { color: colors[0], key: "ventas", val: 10, },
    {
        color: colors[1], key: "ventas", val: {
            "2023-08-01": 15,
            "2023-08-02": 25,
            "2023-08-03": 10,
        },
    },
    {
        color: colors[2], key: "compras", val: {
            "2023-08-01": 10,
            "2023-08-02": 18,
            "2023-08-03": 5,
        }
    },
    { color: colors[3], key: "algo", val: 15, },
    { color: colors[4], key: "compras", val: 25 },
    { color: colors[5], key: "otros", val: 1, },
]

const styleForAll: SChartStyleType = {
    // strokeWidth: 30
}


const Box = ({ children }) => <SView col={"xs-12 sm-6 md-6 lg-6 xl-4"} height={300} border={STheme.color.card}>{children}</SView>
const Chart = (props: SChartsPropsType) => <Box><SCharts data={data} style={styleForAll} {...props} /></Box>
export default class index extends Component {
    render() {
        const style2: SChartStyleType = {
            // strokeWidth: 30
            stroke: STheme.color.text,
            strokeWidth: 5
        }
        return <SPage title={"Test"}>
            <SView col={"xs-12"} center padding={8}>
                <SText fontSize={10}>{JSON.stringify(styleForAll, "\n", "\t")}</SText>
            </SView>
            <SView col={"xs-12"} row>
                {/* <SView col={"xs-12"} height={300}>
                    <SCharts data={data} type={"bar"} />
                </SView> */}
                <SText col={"xs-12"}>bar</SText>
                <Chart type={"bar"} />
                <SView flex />
                <Chart type={"bar"} style={style2} />
                <SView flex />
                <Chart type={"bar"} style={{ fill: "transparent", strokeWidth: 4 }} />
                <SText col={"xs-12"}>donut_gauge</SText>
                <Chart type={"donut_gauge"} />
                <SView flex />
                <Chart type={"donut_gauge"} style={style2} />
                <SView flex />
                <Chart type={"donut_gauge"} style={{ fill: "transparent", strokeWidth: 5 }} />

                <SText col={"xs-12"}>donut_gauge_round</SText>
                <Chart type={"donut_gauge_round"} />
                <SView flex />
                <Chart type={"donut_gauge_round"} style={style2} />
                <SView flex />
                <Chart type={"donut_gauge_round"} style={{ fill: "transparent", strokeWidth: 5 }} />

                <SText col={"xs-12"}>donut</SText>
                <Chart type={"donut"} />
                <SView flex />
                <Chart type={"donut"} style={style2} />
                <SView flex />
                <Chart type={"donut"} style={{ fill: "transparent", strokeWidth: 5 }} />



                <SText col={"xs-12"}>pie</SText>
                <Chart type={"pie"} />
                <SView flex />
                <Chart type={"pie"} style={style2} />
                <SView flex />
                <Chart type={"pie"} style={{ fill: "transparent", strokeWidth: 5 }} />

                <SText col={"xs-12"}>pie_scale</SText>
                <Chart type={"pie_scale"} />
                <SView flex />
                <Chart type={"pie_scale"} style={style2} />
                <SView flex />
                <Chart type={"pie_scale"} style={{ fill: "transparent", strokeWidth: 5 }} />

                <SText col={"xs-12"}>BARRAS ANTIGUAS</SText>
                <Chart type={"barras_horizontal"} />
                <Chart type={"barras_verticales"} />

            </SView>
        </SPage>
    }


}
