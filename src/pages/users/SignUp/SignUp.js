import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignUpForm from "../../../components/users/forms/SignUpForm";

import "./SignUp.scss"

function SignUp(){
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className={"sign-up-page"}>
                    <SignUpForm/>
                </Col>
            </Row>
        </Container>
    );
}

export default SignUp
