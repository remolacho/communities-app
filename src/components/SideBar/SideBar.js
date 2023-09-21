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
                <div><Link to="/home"><FontAwesomeIcon icon={faDashboard}/> Dashboard</Link></div>
            }

            {
                menuSetting?.enterprise?.show &&
                <div><Link onClick={toggleEnterpriseMenu}><FontAwesomeIcon icon={faBuilding} /> Empresa</Link></div>
            }

            {enterpriseMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.enterprise?.items.detail.show &&
                        <div> <Link to="/enterprises/profile">Ver</Link></div>
                    }
                    {
                        menuSetting?.enterprise?.items.edit.show &&
                        <div><Link to="/enterprises/edit">Editar</Link></div>
                    }
                </div>
            )}

            {
                menuSetting?.users?.show &&
                <div><Link onClick={toggleUserMenu}><FontAwesomeIcon icon={faUsers}/> Usuarios</Link></div>
            }

            {userMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.users?.items.profile.show &&
                        <div><Link to={`/users/profile/${currentUser.token}`}>Mi perfil</Link></div>
                    }
                    {
                        menuSetting?.users?.items.list.show &&
                        <div><Link to="/users/list">Lista</Link></div>
                    }
                    {
                        menuSetting?.users?.items.assignRoles.show &&
                        <div><Link to="/users/assign-roles">Asignar roles</Link></div>
                    }
                    {
                        menuSetting?.users?.items.removeRoles.show &&
                        <div><Link to="/users/remove-roles">Remover roles</Link></div>
                    }
                </div>
            )}

            {
                menuSetting?.pqrs?.show &&
                <div><Link onClick={togglePetitionMenu}><FontAwesomeIcon icon={faMap}/> PQRs</Link></div>
            }

            {petitionsMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.pqrs?.items.create.show &&
                        <div><Link to="/petitions/create">Crear</Link></div>
                    }
                    {
                        menuSetting?.pqrs?.items.selfPqrs.show &&
                        <div> <Link to="/petitions/list/list_own">Mis PQRs</Link></div>
                    }
                    {
                        menuSetting?.pqrs?.items.list.show &&
                        <div><Link to="/petitions/list/list_group_roles">Listar PQRs</Link></div>
                    }
                </div>
            )}

            {
                menuSetting?.suggestions?.show &&
                <div><Link onClick={toggleSuggestionMenu}><FontAwesomeIcon icon={faComment} /> Sugerencias</Link></div>
            }

            {suggestionsMenuExpanded && (
                <div className="sub-menu">
                    {
                        menuSetting?.suggestions?.items.create.show &&
                        <div><Link to="/suggestions/create">Crear</Link></div>
                    }
                    {
                        menuSetting?.suggestions?.items.selfSuggestions.show &&
                        <div><Link to="/suggestions/list/list_own">Mis Sugerencias</Link></div>
                    }
                    {
                        menuSetting?.suggestions?.items.list.show &&
                        <div><Link to="/suggestions/list/list_group_roles">Lista Sugerencias</Link></div>
                    }
                </div>
            )}

            <div className="separator" />
                    <div><Link onClick={close}><FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión</Link></div>
        </Nav>
    );
}

export default SideBar;