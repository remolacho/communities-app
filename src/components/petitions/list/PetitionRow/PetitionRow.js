import React from "react";
import Avatar from "../../../../assets/jpg/avatar2.jpg";
import {Image, Dropdown} from "react-bootstrap";

import "./PetitionRow.scss"

export default function PetitionRow(props) {
    const {petition} = props;

    const avatarUrl = petition.user.avatar_url
        ?  petition.user.avatar_url
        : Avatar

    return(
        <tr className="petition-row">
            <td>
                <Image className="petition-row__avatar"
                       src={avatarUrl}
                       roundedCircle
                />
                <span className="petition-row__user-name">{petition.user.name} {petition.user.lastname}</span>
                <p className="petition-row__user-identifier">{petition.user.identifier}</p>
            </td>
            <td className="d-none d-sm-table-cell petition-row__user-ticket">
                {petition.ticket}
            </td>
            <td>
                {petition.category.name}
            </td>
            <td className="d-none d-sm-table-cell petition-row__status">
                <span style={{
                    background: petition.status.color,
                    borderRadius: "25px",
                    padding: "5px 5px 5px 5px",
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "bold",
                }}>
                    {petition.status.name}
                </span>
            </td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Acciones
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href={`#`}>Ver detalle</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}
