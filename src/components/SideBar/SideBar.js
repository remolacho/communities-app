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
  faMoneyBill,
  faHome,
  faCog
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
  const [finesMenuExpanded, setFinesMenuExpanded] = useState(false);
  const [propertiesMenuExpanded, setPropertiesMenuExpanded] = useState(false);
  const [configMenuExpanded, setConfigMenuExpanded] = useState(false);
  const [dashboardMenuExpanded, setDashboardMenuExpanded] = useState(false);

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

  const toggleFinesMenu = () => {
    setFinesMenuExpanded(!finesMenuExpanded);
  };

  const togglePropertiesMenu = () => {
    setPropertiesMenuExpanded(!propertiesMenuExpanded);
  };

  const toggleConfigMenu = () => {
    setConfigMenuExpanded(!configMenuExpanded);
  };

  const toggleDashboardMenu = () => {
    setDashboardMenuExpanded(!dashboardMenuExpanded);
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

      <div className="menu-content">
        <div className="menu-items">
          <div className="nav-link">
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </div>

          {menuSetting?.settings?.show && (
            <div className="nav-link">
              <Link onClick={toggleConfigMenu}>
                <FontAwesomeIcon icon={faCog} /> Configuraciones
              </Link>
            </div>
          )}

          {configMenuExpanded && (
            <div className="sub-menu">
              {menuSetting?.settings?.items.import_properties.show && (
                <Link to="/properties/import">
                  Importar Propiedades
                </Link>
              )}
              {menuSetting?.settings?.items.assign_user_roles.show && (
                <Link to="/users/assign-roles">
                  Asignar roles
                </Link>
              )}
              {menuSetting?.settings?.items.remove_user_roles.show && (
                <Link to="/users/remove-roles">
                  Remover roles
                </Link>
              )}
              {menuSetting?.settings?.items.fines_category_import.show && (
                <Link to="/fines/categories/import">
                  Importar cat disciplinarias
                </Link>
              )}
            </div>
          )}

          {menuSetting?.dashboard?.show && (
            <div className="nav-link">
              <Link onClick={toggleDashboardMenu}>
                <FontAwesomeIcon icon={faDashboard} /> Dashboard
              </Link>
            </div>
          )}

          {dashboardMenuExpanded && (
            <div className="sub-menu">
              {menuSetting?.dashboard?.items?.pqr_graph?.show && (
                <Link to="/dashboard/pqrs">
                  Vista Pqrs
                </Link>
              )}
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

          {menuSetting?.properties?.show && (
            <div className="nav-link">
              <Link onClick={togglePropertiesMenu}>
                <FontAwesomeIcon icon={faHome} /> Propiedades
              </Link>
            </div>
          )}

          {propertiesMenuExpanded && (
            <div className="sub-menu">
              {menuSetting?.properties?.items.list.show && (
                <Link to="/properties/list">Lista</Link>
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

          {menuSetting?.fines?.show && (
            <div className="nav-link">
              <Link onClick={toggleFinesMenu}>
                <FontAwesomeIcon icon={faMoneyBill} /> Gest. disciplinaria
              </Link>
            </div>
          )}

          {finesMenuExpanded && (
            <div className="sub-menu">
              {menuSetting?.fines?.items.categories_fine_list.show && (
                <Link to="/fines/categories/list">
                  Lista categorías
                </Link>
              )}
              {menuSetting?.fines?.items.create_fine.show && (
                <Link to="/fines/create">
                  Crear
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="logout-section">
        <Nav.Link onClick={close}>
          <FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión
        </Nav.Link>
      </div>
    </Nav>
  );
}

export default SideBar;
