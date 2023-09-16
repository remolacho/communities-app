import React from "react";
import {map} from "lodash";
import {Table} from "react-bootstrap";

import "./TablePetitions.scss"
import PetitionRow from "../PetitionRow";

export default function TablePetitions(props) {
    const {petitions} = props;

    return(
        <div className="table-petitions">
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr className="thead">
                        <th>Nombre</th>
                        <th className="d-none d-sm-table-cell">Ticket</th>
                        <th>Tipo</th>
                        <th className="d-none d-sm-table-cell">Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {map(petitions, (petition) => {
                    return <PetitionRow petition={petition} />
                })}
                </tbody>
            </Table>
        </div>
    )
}