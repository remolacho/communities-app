import React from "react";
import BannerLayout from "../../../layouts/BannerLayout";
import {Card, Col, Row} from "react-bootstrap";
import PQRsDashboard from "../../../components/petitions/dashboard/PQRsDashboard";
import "./Dashboard.scss"

function Dashboard(props){
    const {setCallLogin } = props

    return (
        <BannerLayout setCallLogin={setCallLogin}>
            <div className="d-flex justify-content-center align-items-center dashboard">
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Dashboard
                        </Card.Title>

                        <PQRsDashboard/>
                    </Card.Body>
                </Card>
            </div>
        </BannerLayout>
    );
}

export default Dashboard