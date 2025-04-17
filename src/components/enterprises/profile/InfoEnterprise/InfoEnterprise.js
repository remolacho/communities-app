import React from "react";
import moment from "moment";
import location from "moment/locale/es"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faLocation, faUser, faMailBulk, faMap} from "@fortawesome/free-solid-svg-icons"
import {BirthdateIcon} from "../../../../utils/icons";

import "./InfoEnterprise.scss"
import {Col, Row} from "react-bootstrap";

export default function InfoEnterprise(props){
    const { enterprise } = props;

    return(
        <div className="info-enterprise">
            <h2 className="name">
                { enterprise.name }
            </h2>

            <p className="email">
                <FontAwesomeIcon icon={faMailBulk} />
                { enterprise.email }
            </p>

            <Row className="more-info">
               <Col xs={12} md={6}>
                    {  enterprise.identifier &&
                        <p className="">
                            <FontAwesomeIcon icon={faUser} />
                            { enterprise.document_type } {  enterprise.identifier }
                        </p>
                    }
                </Col>

                <Col xs={12} md={6}>
                { enterprise.address &&
                        <p className="">
                            <FontAwesomeIcon icon={faLocation} />
                            { enterprise.address }
                        </p>
                    }
                </Col>
            </Row>

            <Row className="more-info">
                <Col xs={12} md={6}>
                    { enterprise.subdomain &&
                        <p className="">
                            <FontAwesomeIcon icon={faMap} />
                            { enterprise.subdomain }
                        </p>
                    }
                </Col>

                <Col xs={12} md={6}>
                    { enterprise.created_at &&
                        <p className="">
                            <BirthdateIcon />
                            { moment(enterprise.created_at).locale("es", location).format("LL") }
                        </p>
                    }
                </Col>
            </Row>
        </div>
    )
}
