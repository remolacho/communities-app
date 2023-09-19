import React from "react";
import { Chart } from "react-google-charts";
import {map} from "lodash";

import "./ColumnChartComponent.scss"

function parseDataChart(data){
    let chart = [["Element", "PQRs Barras", { role: "style" }]]

    map(data, (value, index) => (
        chart.push([value['name'], value['counter'], value["color"]])
    ))

    return chart
}

export default function ColumnChartComponent(prop){
    const {data} = prop;

    return(
        <div className="column-chart-component">
            {/*<span className="title-chart">PQRs Barra</span>*/}
            <Chart chartType="ColumnChart" width="100%" height="300px" data={parseDataChart(data)} />
        </div>
    )
}