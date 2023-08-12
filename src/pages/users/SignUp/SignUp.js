import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignUpForm from "../../../components/users/forms/SignUpForm";

import "./SignUp.scss"

function SignUp(props){
    const {setCallLogin } = props

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className={"sign-up-page"}>
                    <SignUpForm setCallLogin={setCallLogin}/>
                </Col>
            </Row>
        </Container>
    );
}

export default SignUp
