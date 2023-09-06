import React from "react";
import Logo from "../../../../assets/png/logo2.png";
import {Badge, Image, Dropdown} from "react-bootstrap";

import "./SuggestionRow.scss"

export default function SuggestionRow(props) {
    const {suggestion} = props;

    const avatarUrl = suggestion.user.avatar_url
        ?  suggestion.user.avatar_url
        : Logo

    return(
        <tr className="suggestion-row">
            <td>
                <Image className="avatar"
                       src={avatarUrl}
                       roundedCircle
                />
                <span className="user-name">{suggestion.user.name} {suggestion.user.lastname}</span>
                <p className="user-identifier">{suggestion.user.identifier}</p>
            </td>
            <td className="d-none d-sm-table-cell user-ticket">
                {suggestion.ticket}
            </td>
            <td>
                {
                    suggestion.read ?
                        <Badge bg="primary">Leido</Badge>
                        : <Badge bg="secondary">No leido</Badge>
                }
            </td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Acciones
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href={`/suggestions/detail/${suggestion.token}`}>Ver detalle</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}
