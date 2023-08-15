import React,  { useState }  from "react";
import {Container, Nav, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faDashboard, faBuilding, faUsers, faPowerOff, faMap} from "@fortawesome/free-solid-svg-icons"
import {logoutUser} from "../../../services/auth/authUser";
import {getLogoEnterpriseApi} from "../../../services/auth/authSubdomain";
import { useNavigate } from 'react-router-dom';

import Logo from "../../../assets/png/logo2.png";
import "./MenuHome.scss"

function MenuHome(props) {
    const {setCallLogin } = props
    const [expanded, setExpanded] = useState(false);
    const [enterpriseMenuExpanded, seEnterpriseMenuExpanded] = useState(false);
    const [userMenuExpanded, setUserMenuExpanded] = useState(false);
    const [petitionsMenuExpanded, setPetitionsMenuExpanded] = useState(false);
    const logoEnterprise = getLogoEnterpriseApi()
    const navigate = useNavigate()

    const toggleEnterpriseMenu = () => {
        seEnterpriseMenuExpanded(!enterpriseMenuExpanded);
    };

    const toggleUserMenu = () => {
        setUserMenuExpanded(!userMenuExpanded);
    };

    const togglePetitionMenu = () => {
        setPetitionsMenuExpanded(!petitionsMenuExpanded);
    };

    const logoUrl = logoEnterprise === null
        ? logoEnterprise
        : Logo

    const close = ()=> {
        logoutUser()
        setCallLogin(true)
        navigate('/')
    }

    return (
        <Navbar
            className={`sidebar ${expanded ? 'expanded' : ''}`}
            variant="dark"
            expand="md"
        >
            <Container>
                <Navbar.Toggle
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="sidebar-nav"
                    className="mobile-toggle ml-auto"
                />
                <Navbar.Collapse id="sidebar-nav">
                    <Nav className="flex-column">
                        <div className="logo"><img src={logoUrl} alt="Communities"/></div>
                        <div className="separator" />
                        <Nav.Link href="/home"><FontAwesomeIcon icon={faDashboard} /> Dashboard</Nav.Link>
                        <Nav.Link onClick={toggleEnterpriseMenu}><FontAwesomeIcon icon={faBuilding} /> Empresa</Nav.Link>
                        {enterpriseMenuExpanded && (
                            <div className="sub-menu">
                                <Nav.Link href="#">Perfil</Nav.Link>
                                <Nav.Link href="#">Asignar roles</Nav.Link>
                            </div>
                        )}
                        <Nav.Link onClick={toggleUserMenu}><FontAwesomeIcon icon={faUsers} /> Usuarios</Nav.Link>
                        {userMenuExpanded && (
                            <div className="sub-menu">
                                <Nav.Link href="/users/profile">Mi perfil</Nav.Link>
                                <Nav.Link href="#">Listar</Nav.Link>
                            </div>
                        )}
                        <Nav.Link onClick={togglePetitionMenu}><FontAwesomeIcon icon={faMap} /> Peticiones</Nav.Link>
                        {petitionsMenuExpanded && (
                            <div className="sub-menu">
                                <Nav.Link href="#">Mis peticiones</Nav.Link>
                                <Nav.Link href="#">Crear</Nav.Link>
                                <Nav.Link href="#">Listar todas</Nav.Link>
                            </div>
                        )}
                        <div className="separator" />

                        <Nav.Link onClick={close}><FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MenuHome;