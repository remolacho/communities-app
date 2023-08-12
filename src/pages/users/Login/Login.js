import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignInForm from "../../../components/users/forms/SignInForm";

import "./Login.scss"

function Login(props){
    const {setCallLogin } = props

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className={"home-login"}>
                    <SignInForm setCallLogin={setCallLogin}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Login
