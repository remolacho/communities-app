import "./SideBar.scss";

import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faBuilding,
  faUsers,
  faPowerOff,
  faMap,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth/authUser";
import useAuth from "../../hooks/contextValues/useAuth";
import Logo from "../../../src/assets/jpg/avatar2.jpg";
import LazyLoadedImage from "../shared/LazyImage";

function SideBar(props) {
  const { setCallLogin, menuSetting } = props;
  const [enterpriseMenuExpanded, seEnterpriseMenuExpanded] = useState(false);
  const [userMenuExpanded, setUserMenuExpanded] = useState(false);
  const [petitionsMenuExpanded, setPetitionsMenuExpanded] = useState(false);
  const [suggestionsMenuExpanded, setSuggestionsMenuExpanded] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

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

  const avatarUrl = currentUser?.avatar_url ? currentUser.avatar_url : Logo;

  const close = () => {
    logoutUser();
    setCallLogin(true);
    navigate("/");
  };

  return (
    <Nav className="flex-column">
      <LazyLoadedImage src={avatarUrl} className="avatar" />
      <div className="user">
        {currentUser?.name} {currentUser?.lastname}
      </div>

      <div className="separator" />

      {menuSetting?.dashboard?.show && (
        <div className="nav-link">
          <Link to="/home">
            <FontAwesomeIcon icon={faDashboard} /> Dashboard
          </Link>
        </div>
      )}

      {menuSetting?.enterprise?.show && (
        <div className="nav-link">
          <Link onClick={toggleEnterpriseMenu}>
            <FontAwesomeIcon icon={faBuilding} /> Empresa
          </Link>
        </div>
      )}

      {enterpriseMenuExpanded && (
        <div className="sub-menu">
          {menuSetting?.enterprise?.items.detail.show && (
            <Link to="/enterprises/profile">Ver</Link>
          )}
          {menuSetting?.enterprise?.items.edit.show && (
            <Link to="/enterprises/edit">Editar</Link>
          )}
        </div>
      )}

      {menuSetting?.users?.show && (
        <div className="nav-link">
          <Link onClick={toggleUserMenu}>
            <FontAwesomeIcon icon={faUsers} /> Usuarios
          </Link>
        </div>
      )}

      {userMenuExpanded && (
        <div className="sub-menu">
          {menuSetting?.users?.items.profile.show && (
            <Link to={`/users/profile/${currentUser.token}`}>Mi perfil</Link>
          )}
          {menuSetting?.users?.items.list.show && (
            <Link to="/users/list">Lista</Link>
          )}
          {menuSetting?.users?.items.assignRoles.show && (
            <Link to="/users/assign-roles">Asignar roles</Link>
          )}
          {menuSetting?.users?.items.removeRoles.show && (
            <Link to="/users/remove-roles">Remover roles</Link>
          )}
        </div>
      )}

      {menuSetting?.pqrs?.show && (
        <div className="nav-link">
          <Link onClick={togglePetitionMenu}>
            <FontAwesomeIcon icon={faMap} /> PQRs
          </Link>
        </div>
      )}

      {petitionsMenuExpanded && (
        <div className="sub-menu">
          {menuSetting?.pqrs?.items.create.show && (
            <Link to="/petitions/create">Crear</Link>
          )}
          {menuSetting?.pqrs?.items.selfPqrs.show && (
            <Link to="/petitions/list/list_own">Mis PQRs</Link>
          )}
          {menuSetting?.pqrs?.items.list.show && (
            <Link to="/petitions/list/list_group_roles">Listar PQRs</Link>
          )}
        </div>
      )}

      {menuSetting?.suggestions?.show && (
        <div className="nav-link">
          <Link onClick={toggleSuggestionMenu}>
            <FontAwesomeIcon icon={faComment} /> Sugerencias
          </Link>
        </div>
      )}

      {suggestionsMenuExpanded && (
        <div className="sub-menu">
          {menuSetting?.suggestions?.items.create.show && (
            <Link to="/suggestions/create">Crear</Link>
          )}
          {menuSetting?.suggestions?.items.selfSuggestions.show && (
            <Link to="/suggestions/list/list_own">Mis Sugerencias</Link>
          )}
          {menuSetting?.suggestions?.items.list.show && (
            <Link to="/suggestions/list/list_group_roles">
              Lista Sugerencias
            </Link>
          )}
        </div>
      )}

      <div className="separator" />
      <Nav.Link onClick={close}>
        <FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión
      </Nav.Link>
    </Nav>
  );
}

export default SideBar;
