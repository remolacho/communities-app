import React from "react";
import { Table } from "react-bootstrap";
import { map } from "lodash";
import FineCategoryRow from "../FineCategoryRow";
import "./TableFineCategories.scss";

export default function TableFineCategories(props) {
    const { categories, setCategories } = props;

    const handleDelete = (categoryId) => {
        const updatedCategories = categories.filter(
            (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
    };

    return (
        <div className="table-fine-categories">
            <Table responsive striped bordered hover>
                <thead>
                    <tr className="thead">
                        <th width="60%">Nombre</th>
                        <th width="20%">Monto</th>
                        <th width="20%">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {map(categories, (category) => (
                        <FineCategoryRow 
                            key={category.id} 
                            category={category}
                            onDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
} 