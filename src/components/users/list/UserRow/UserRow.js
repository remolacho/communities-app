import React, {useState} from "react";
import Logo from "../../../../assets/png/logo2.png";
import {Badge, Dropdown, Spinner} from "react-bootstrap";
import {changeStatusService} from "../../../../services/users/ChangeStatus/changeStatusService";
import {toast} from "react-toastify";

import "./UserRow.scss"
import LazyLoadedImage from "../../../shared/LazyImage";

export default function UserRow(props) {
    const {user} = props;
    const [active, setActive] = useState(user.active)
    const [btnLoading, setBtnLoading] = useState(false)

    const avatarUrl = user.avatar_url
        ?  user.avatar_url
        : Logo

    const changeStatus = () =>{
        setBtnLoading(true)

        changeStatusService(user.token).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            toast.success(response.message, {theme: "colored"});
            setActive(!active)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false)
        })
    }

    return(
        <tr className="user-row">
            <td>
                <LazyLoadedImage
                    src={avatarUrl}
                    className="avatar"
                    roundedCircle={true}
                />
                <span className="user-name">{user.name} {user.lastname}</span>
                <p className="user-identifier">{user.identifier}</p>
            </td>
            <td>
                {
                    active ?
                          <Badge bg="success">Activo</Badge>
                        : <Badge bg="danger">Inactivo</Badge>}

            </td>
            <td className="d-none d-sm-table-cell user-reference">
                {user.reference}
            </td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant={active ? "success" : "danger"} id="dropdown-basic">
                        {!btnLoading ? "Acciones" : <Spinner animation="border"/> }
                    </Dropdown.Toggle>

                    <Dropdown.Menu disabled={btnLoading}>
                        <Dropdown.Item onClick={changeStatus}>
                            {
                                !active
                                    ? "Activar"
                                    : "Desactivar"
                            }
                        </Dropdown.Item>
                        <Dropdown.Item href={`/users/profile/${user.token}`}>Ver perfil</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}
