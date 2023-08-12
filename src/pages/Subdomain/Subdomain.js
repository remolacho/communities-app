import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import "./Subdomain.scss"
import SubdomainForm from "../../components/enterprises/forms/SubdomainForm";

function Subdomain(props){
    const {setCallLogin } = props

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className={"home-subdomain"}>
                    <SubdomainForm setCallLogin={setCallLogin} />
                </Col>
            </Row>
        </Container>
    );
}

export default Subdomain
