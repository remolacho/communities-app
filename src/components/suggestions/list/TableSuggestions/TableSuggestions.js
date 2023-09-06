import React from "react";
import {map} from "lodash";
import {Table} from "react-bootstrap";

import "./TableSuggestions.scss"
import SuggestionRow from "../SuggestionRow";

export default function TableSuggestions(props) {
    const {suggestions} = props;

    return(
        <div className="table-suggestions">
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr className="thead">
                        <th>Nombre</th>
                        <th className="d-none d-sm-table-cell">ticket</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {map(suggestions, (suggestion) => {
                    return <SuggestionRow suggestion={suggestion} />
                })}
                </tbody>
            </Table>
        </div>
    )
}
