import React from "react";
import PropertyRow from "../PropertyRow";
import { map } from "lodash";
import "./TableProperties.scss";
import { Table } from "react-bootstrap";

export default function TableProperties(props) {
  const { properties, setProperties } = props;

  const handleDelete = (propertyId) => {
    // Filtrar la propiedad eliminada de la lista
    const updatedProperties = properties.filter(
      (property) => property.id !== propertyId
    );
    setProperties(updatedProperties);
  };

  return (
    <div className="table-properties">
      <Table responsive striped bordered hover>
        <thead>
          <tr className="thead">
            <th>Ubicación</th>
            <th>Tipo de Propiedad</th>
            <th className="d-none d-sm-table-cell">Estado de Propiedad</th>
            <th className="d-none d-sm-table-cell">Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {map(properties, (property) => {
            return (
              <PropertyRow 
                key={property.id} 
                property={property} 
                onDelete={handleDelete}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
} 