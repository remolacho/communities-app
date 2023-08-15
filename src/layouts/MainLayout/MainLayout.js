import React from "react";
import {Container, Row, Col} from "react-bootstrap"
import MenuHome from "../../pages/Home/MenuHome/MenuHome";

import "./MainLayout.scss"

export default function MainLayout(props) {
    const { children, className, setCallLogin} = props

    return (
        <Container className={`main-layout ${className}`}>
            <Row>
                <Col xp={2} className="main-layout__menu">
                    <MenuHome setCallLogin={setCallLogin}/>
                </Col>
                <Col xs={12} md={10} className="main-layout__content">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
