import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignInForm from "../../../components/users/forms/SignInForm";

import "./SignIn.scss"

function SignIn(props){
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className={"sign-in-body"}>
                    <SignInForm/>
                </Col>
            </Row>
        </Container>
    );
}

export default SignIn
