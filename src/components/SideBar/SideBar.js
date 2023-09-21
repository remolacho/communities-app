import React,  { useState }  from "react";
import {Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faDashboard, faBuilding, faUsers, faPowerOff, faMap, faComment} from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from 'react-router-dom';
import {logoutUser} from "../../services/auth/authUser";
import useAuth from "../../hooks/contextValues/useAuth";
import Logo from "../../../src/assets/jpg/avatar2.jpg";

import "./SideBar.scss"

function SideBar(props) {
    const {setCallLogin, menuSetting } = props
    const [enterpriseMenuExpanded, seEnterpriseMenuExpanded] = useState(false);
    const [userMenuExpanded, setUserMenuExpanded] = useState(false);
    const [petitionsMenuExpanded, setPetitionsMenuExpanded] = useState(false);
    const [suggestionsMenuExpanded, setSuggestionsMenuExpanded] = useState(false);

    const navigate = useNavigate()
    const {currentUser} = useAuth()

    const toggleEnterpriseMenu = () => {
        seEnterpriseMenuExpanded(!enterpriseMenuExpanded);
    };

    const toggleUserMenu = () => {
        setUserMenuExpanded(!userMenuExpanded);
    };

    const togglePetitionMenu = () => {
        setPetitionsMenuExpanded(!petitionsMenuExpanded);
    };

    const toggleSuggestionMenu = () => {
        setSuggestionsMenuExpanded(!suggestionsMenuExpanded);
    };

    const avatarUrl = currentUser?.avatar_url
        ? currentUser.avatar_url
        : Logo

    const close = ()=> {
        logoutUser()
        setCallLogin(true)
        navigate('/')
    }

    return (
        <Nav className="flex-column">
            <div className="avatar"
                 style={{ backgroundImage: `url('${avatarUrl}')`}}>
            </div>
            <div className="user">{currentUser?.name} {currentUser?.lastname}</div>

            <div className="separator" />

            {
                menuSetting?.dashboard?.show &&
                <Nav.Link href="/home"><FontAwesomeIcon icon={faDashboard}/> Dashboard</Nav.Link>
            }

            {
                menuSetting?.enterprise?.show &&
                <Nav.Link onClick={toggleEnterpriseMenu}><FontAwesomeIcon icon={faBuilding} /> Empresa</Nav.Link>
            }

            {enterpriseMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.enterprise?.items.detail.show &&
                        <Nav.Link href="/enterprises/profile">Ver</Nav.Link>
                    }
                    {
                        menuSetting?.enterprise?.items.edit.show &&
                        <Nav.Link href="/enterprises/edit">Editar</Nav.Link>
                    }
                </div>
            )}

            {
                menuSetting?.users?.show &&
                <Nav.Link onClick={toggleUserMenu}><FontAwesomeIcon icon={faUsers}/> Usuarios</Nav.Link>
            }

            {userMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.users?.items.profile.show &&
                        <Nav.Link href={`/users/profile/${currentUser.token}`}>Mi perfil</Nav.Link>
                    }
                    {
                        menuSetting?.users?.items.list.show &&
                        <Nav.Link href="/users/list">Lista</Nav.Link>
                    }
                    {
                        menuSetting?.users?.items.assignRoles.show &&
                        <Nav.Link href="/users/assign-roles">Asignar roles</Nav.Link>
                    }
                    {
                        menuSetting?.users?.items.removeRoles.show &&
                        <Nav.Link href="/users/remove-roles">Remover roles</Nav.Link>
                    }
                </div>
            )}

            {
                menuSetting?.pqrs?.show &&
                <Nav.Link onClick={togglePetitionMenu}><FontAwesomeIcon icon={faMap}/> PQRs</Nav.Link>
            }

            {petitionsMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.pqrs?.items.create.show &&
                        <Nav.Link href="/petitions/create">Crear</Nav.Link>
                    }
                    {
                        menuSetting?.pqrs?.items.selfPqrs.show &&
                        <Nav.Link href="/petitions/list/list_own">Mis PQRs</Nav.Link>
                    }
                    {
                        menuSetting?.pqrs?.items.list.show &&
                        <Nav.Link href="/petitions/list/list_group_roles">Listar PQRs</Nav.Link>
                    }
                </div>
            )}

            {
                menuSetting?.suggestions?.show &&
                <Nav.Link onClick={toggleSuggestionMenu}><FontAwesomeIcon icon={faComment} /> Sugerencias</Nav.Link>
            }

            {suggestionsMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.suggestions?.items.create.show &&
                        <Nav.Link href="/suggestions/create">Crear</Nav.Link>
                    }
                    {
                        menuSetting?.suggestions?.items.selfSuggestions.show &&
                        <Nav.Link href="/suggestions/list/list_own">Mis Sugerencias</Nav.Link>
                    }
                    {
                        menuSetting?.suggestions?.items.list.show &&
                        <Nav.Link href="/suggestions/list/list_group_roles">Lista Sugerencias</Nav.Link>
                    }
                </div>
            )}

            <div className="separator" />

            <Nav.Link onClick={close}><FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión</Nav.Link>
        </Nav>
    );
}

export default SideBar;