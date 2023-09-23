import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import PieChartComponent from "../PieChartComponent";
import ColumnChartComponent from "../ColumnChartComponent";
import {chartStatusesServices} from "../../../../services/petitions/dashboards/chartStatusesServices";
import {toast} from "react-toastify";
import Loading from "../../../shared/Loading";

export default function PQRsDashboard(){
    const [dataChart, setDataChart] = useState([])
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        chartStatusesServices().then(response => {
            if (!response.success) {
                toast.error(response.message, {theme: "colored"});
                return
            }

            setDataChart(response.data)
            setLoadingPage(false)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })
    }, []);

    if(loadingPage) return (<Loading/>);
    if(dataChart.length === 0) return

    return(
        <>
           <Row>
               <Col>
                    <PieChartComponent data={dataChart}/>
               </Col>
           </Row>
            <Row>
                <Col>
                    <ColumnChartComponent data={dataChart}/>
                </Col>
            </Row>
        </>
    )
}