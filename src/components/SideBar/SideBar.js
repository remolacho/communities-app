import React,  { useState }  from "react";
import {Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faDashboard, faBuilding, faUsers, faPowerOff, faMap} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom';
import {logoutUser} from "../../services/auth/authUser";
import useAuth from "../../hooks/contextValues/useAuth";
import Logo from "../../../src/assets/png/logo2.png";
import "./SideBar.scss"

function SideBar(props) {
    const {setCallLogin } = props
    const [enterpriseMenuExpanded, seEnterpriseMenuExpanded] = useState(false);
    const [userMenuExpanded, setUserMenuExpanded] = useState(false);
    const [petitionsMenuExpanded, setPetitionsMenuExpanded] = useState(false);
    const navigate = useNavigate()
    const {currentUser, currentEnterprise} = useAuth()

    const toggleEnterpriseMenu = () => {
        seEnterpriseMenuExpanded(!enterpriseMenuExpanded);
    };

    const toggleUserMenu = () => {
        setUserMenuExpanded(!userMenuExpanded);
    };

    const togglePetitionMenu = () => {
        setPetitionsMenuExpanded(!petitionsMenuExpanded);
    };

    const logoUrl = currentEnterprise?.logo_url
        ? currentEnterprise.logo_url
        : Logo

    const close = ()=> {
        logoutUser()
        setCallLogin(true)
        navigate('/')
    }

    return (
        <Nav className="flex-column">
            <div className="logo"><img src={logoUrl} alt="Communities"/></div>
            <div className="user">{currentUser?.name} {currentUser?.lastname}</div>

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
    );
}

export default SideBar;