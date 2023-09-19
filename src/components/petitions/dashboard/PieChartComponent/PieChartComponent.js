import React from "react";
import { Chart } from "react-google-charts";
import {map} from "lodash";

import "./PieChartComponent.scss"

function parseDataChart(data){
    let chart = [["Element", "PQRs Torta", { role: "style" }]]

    map(data, (value, index) => (
        chart.push([value['name'], value['percentage'], value["color"]])
    ))

    return chart
}

export default function PieChartComponent(prop){
    const {data} = prop;

    return(
        <div className="pie-chart-component">
            {/*<span className="title-chart">PQRs Torta</span>*/}
            <Chart chartType="PieChart" width="100%" height="300px" data={parseDataChart(data)} />
        </div>
    )
}