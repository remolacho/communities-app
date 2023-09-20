import React from "react";
import {Container, Row, Col} from "react-bootstrap"

import "./SignInSignUpLayout.scss"
import Logo from "../../assets/png/logo2.png";
import {getLogoEnterpriseApi} from "../../services/auth/authSubdomain";

export default function SignInSignUpLayout(props) {
    const { children } = props
    const logoEnterprise = getLogoEnterpriseApi()

    const logoUrl = logoEnterprise
        ? logoEnterprise
        : Logo

    return (
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }} className="sign-in-sign-up-layout">
                    <div className="sign-in-sign-up-layout__form">
                        <h2><center><img src={logoUrl} alt="Communities"/></center></h2>
                        {children}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
