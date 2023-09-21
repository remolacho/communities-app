import React,  { useState }  from "react";
import {Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faDashboard, faBuilding, faUsers, faPowerOff, faMap, faComment} from "@fortawesome/free-solid-svg-icons"
import {Link, useNavigate} from 'react-router-dom';
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
                <div className="nav-link"><Link to="/home"><FontAwesomeIcon icon={faDashboard}/> Dashboard</Link></div>
            }

            {
                menuSetting?.enterprise?.show &&
                <div className="nav-link"><Link onClick={toggleEnterpriseMenu}><FontAwesomeIcon icon={faBuilding} /> Empresa</Link></div>
            }

            {enterpriseMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.enterprise?.items.detail.show &&
                        <Link to="/enterprises/profile" className="nav-link">Ver</Link>
                    }
                    {
                        menuSetting?.enterprise?.items.edit.show &&
                        <Link to="/enterprises/edit" className="nav-link">Editar</Link>
                    }
                </div>
            )}

            {
                menuSetting?.users?.show &&
                <div className="nav-link"><Link onClick={toggleUserMenu}><FontAwesomeIcon icon={faUsers}/> Usuarios</Link></div>
            }

            {userMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.users?.items.profile.show &&
                        <Link to={`/users/profile/${currentUser.token}`} className="nav-link">Mi perfil</Link>
                    }
                    {
                        menuSetting?.users?.items.list.show &&
                        <Link to="/users/list" className="nav-link">Lista</Link>
                    }
                    {
                        menuSetting?.users?.items.assignRoles.show &&
                        <Link to="/users/assign-roles" className="nav-link">Asignar roles</Link>
                    }
                    {
                        menuSetting?.users?.items.removeRoles.show &&
                       <Link to="/users/remove-roles" className="nav-link">Remover roles</Link>
                    }
                </div>
            )}

            {
                menuSetting?.pqrs?.show &&
                <div className="nav-link"><Link onClick={togglePetitionMenu}><FontAwesomeIcon icon={faMap}/> PQRs</Link></div>
            }

            {petitionsMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.pqrs?.items.create.show &&
                       <Link to="/petitions/create" className="nav-link">Crear</Link>
                    }
                    {
                        menuSetting?.pqrs?.items.selfPqrs.show &&
                        <Link to="/petitions/list/list_own" className="nav-link">Mis PQRs</Link>
                    }
                    {
                        menuSetting?.pqrs?.items.list.show &&
                        <Link to="/petitions/list/list_group_roles" className="nav-link">Listar PQRs</Link>
                    }
                </div>
            )}

            {
                menuSetting?.suggestions?.show &&
                <div className="nav-link" ><Link onClick={toggleSuggestionMenu}><FontAwesomeIcon icon={faComment} /> Sugerencias</Link></div>
            }

            {suggestionsMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.suggestions?.items.create.show &&
                        <Link to="/suggestions/create" className="nav-link">Crear</Link>
                    }
                    {
                        menuSetting?.suggestions?.items.selfSuggestions.show &&
                        <Link to="/suggestions/list/list_own" className="nav-link">Mis Sugerencias</Link>
                    }
                    {
                        menuSetting?.suggestions?.items.list.show &&
                        <Link to="/suggestions/list/list_group_roles" className="nav-link">Lista Sugerencias</Link>
                    }
                </div>
            )}

            <div className="separator" />
            <Nav.Link onClick={close}><FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión</Nav.Link>
        </Nav>
    );
}

export default SideBar;