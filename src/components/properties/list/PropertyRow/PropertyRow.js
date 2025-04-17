import React, {useState} from "react";
import {Badge, Dropdown, Spinner} from "react-bootstrap";
import Swal from "sweetalert2";
import {deletePropertyService} from "../../../../services/properties/Delete/DeletePropertyService";
import {toast} from "react-toastify";
import "./PropertyRow.scss";

export default function PropertyRow(props) {
    const {property, onDelete} = props;
    const [btnLoading, setBtnLoading] = useState(false);

    const confirmDelete = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas eliminar esta propiedad?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete();
            }
        });
    };

    const handleDelete = async () => {
        setBtnLoading(true);
        try {
            const response = await deletePropertyService(property.id);
            
            if (!response.success) {
                toast.warning(response.message);
                return;
            }

            Swal.fire(
                "¡Eliminado!",
                response.message,
                "success"
            );
            
            // Notificar al componente padre para actualizar la lista
            if (onDelete) {
                onDelete(property.id);
            }
        } catch (error) {
            toast.error("Error al eliminar la propiedad");
        } finally {
            setBtnLoading(false);
        }
    };

    return(
        <tr className="property-row">
            <td>
                <span className="property-location">{property.location}</span>
            </td>
            <td className="property-type">
                {property.property_type_name}
            </td>
            <td className="d-none d-sm-table-cell property-status">
                {property.status_name}
            </td>
            <td className="d-none d-sm-table-cell">
                {
                    property.active ?
                        <Badge bg="success">Activo</Badge>
                        : <Badge bg="danger">Inactivo</Badge>
                }
            </td>
            <td className="actions">
                <Dropdown>
                    <Dropdown.Toggle 
                        variant={property.active ? "success" : "danger"} 
                        id="dropdown-basic"
                        size="sm"
                    >
                        {!btnLoading ? "Acciones" : <Spinner animation="border" size="sm"/>}
                    </Dropdown.Toggle>

                    <Dropdown.Menu disabled={btnLoading}>
                        <Dropdown.Item onClick={confirmDelete}>
                            Eliminar
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
} 