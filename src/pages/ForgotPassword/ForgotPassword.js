import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import ForgotPasswordForm from "../../components/users/forms/ForgotPasswordForm";
import "./ForgotPassword.scss"

function ForgotPassword(){
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className={"home-login"}>
                    <ForgotPasswordForm/>
                </Col>
            </Row>
        </Container>
    );
}

export default ForgotPassword
