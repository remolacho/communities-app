import React from "react";
import {Container, Row, Col} from "react-bootstrap"
import MenuHome from "../../pages/Home/MenuHome/MenuHome";
import BannerLogo from "../../components/enterprises/profile/BannerLogo";
import useAuth from "../../hooks/contextValues/useAuth";
import "./BannerLayout.scss"

export default function BannerLayout(props) {
    const { children, setCallLogin} = props
    const {currentEnterprise} = useAuth()

    if(!currentEnterprise) return;

    return (
        <Container className={`banner-layout`}>
            <Row>
                <Col xp={2} className="banner-layout__menu">
                    <MenuHome setCallLogin={setCallLogin}/>
                </Col>
                <Col xs={12} md={10} className="banner-layout__content">
                    <div className="banner-layout__title">
                        <h2>
                            {currentEnterprise?.name}
                        </h2>
                    </div>

                    <BannerLogo enterprise={currentEnterprise} />
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
