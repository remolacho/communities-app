import React from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import { Card } from "react-bootstrap";
import PQRsDashboard from "../../../../components/petitions/dashboard/PQRsDashboard";
import "./DashboardPQRs.scss";

function DashboardPQRs(props) {
    const { setCallLogin } = props;

    return (
        <BannerLayout setCallLogin={setCallLogin}>
            <div className="d-flex justify-content-center align-items-center dashboard-pqrs">
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Dashboard de PQRs
                        </Card.Title>

                        <PQRsDashboard />
                    </Card.Body>
                </Card>
            </div>
        </BannerLayout>
    );
}

export default DashboardPQRs; 