import React, {useState, useCallback} from "react";
import UserRow from "../UserRow";
import {map} from "lodash";

import "./TableUsers.scss"
import {Table} from "react-bootstrap";

export default function TableUsers(props) {
    const {users} = props;

    return(
        <div className="table-users">
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr className="thead">
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th className="d-none d-sm-table-cell">Referencia</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {map(users, (user) => {
                        return <UserRow key={user.id} user={user}/>
                    })}
                </tbody>
            </Table>
        </div>
    )
}
