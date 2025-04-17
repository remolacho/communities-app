import React from "react";
import {Container} from "react-bootstrap"
import SideMenu from "../../components/SideMenu/SideMenu";
import BannerLogo from "../../components/enterprises/profile/BannerLogo";
import useAuth from "../../hooks/contextValues/useAuth";
import "./BannerLayout.scss"

export default function BannerLayout(props) {
    const { children, setCallLogin} = props
    const {currentEnterprise} = useAuth()

    if(!currentEnterprise) return null;

    return (
        <div className="layout-wrapper">
            <SideMenu 
                setCallLogin={setCallLogin} 
                menuSetting={currentEnterprise.menu}
            />
            <main className="main-content banner-layout">
                <div className="banner-layout__title">
                    <h2>{currentEnterprise?.name}</h2>
                </div>
                <BannerLogo enterprise={currentEnterprise} />
                <Container fluid className="banner-layout__content">
                    {children}
                </Container>
            </main>
        </div>
    )
}
