import "./PetitionRow.scss"
import React from "react";
import Avatar from "../../../../assets/jpg/avatar2.jpg";
import {Dropdown} from "react-bootstrap";
import moment from "moment/moment";
import location from "moment/locale/es"
import LazyLoadedImage from "../../../shared/LazyImage";

export default function PetitionRow(props) {
    const {petition} = props;

    const avatarUrl = petition.user.avatar_url
        ?  petition.user.avatar_url
        : Avatar

    return(
        <tr className="petition-row">
            <td>
                <LazyLoadedImage
                    src={avatarUrl}
                    className="petition-row__avatar"
                    roundedCircle={true}
                />

                <span className="petition-row__user-name">{petition.user.name} {petition.user.lastname}</span>
            </td>
            <td className="d-none d-sm-table-cell petition-row__user-ticket">
                { moment(petition.created_at).locale("es", location).format("LL") }
            </td>
            <td>
                { moment(petition?.updated_at).calendar() }
            </td>
            <td className="d-none d-sm-table-cell">
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
                        <Dropdown.Item href={`/petitions/detail/${petition.token}`}>Ver detalle</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}
