import React from "react";
import {Container} from "react-bootstrap"
import SideMenu from "../../components/SideMenu/SideMenu";
import useAuth from "../../hooks/contextValues/useAuth";
import "./MainLayout.scss"

export default function MainLayout(props) {
    const { children, className, setCallLogin} = props
    const {currentEnterprise} = useAuth()

    if(!currentEnterprise) return null;

    return (
        <div className="layout-wrapper">
            <SideMenu 
                setCallLogin={setCallLogin} 
                menuSetting={currentEnterprise.menu}
            />
            <main className={`main-content ${className || ''}`}>
                <Container fluid>
                    {children}
                </Container>
            </main>
        </div>
    )
}
