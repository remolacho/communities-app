import React, { useState, useMemo } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/contextValues/useAuth";
import { deleteFineCategoryService } from "../../../../services/fines/categories/deleteFineCategoryService";
import "./FineCategoryRow.scss";

export default function FineCategoryRow(props) {
    const { category, onDelete } = props;
    const [btnLoading, setBtnLoading] = useState(false);
    const { currentEnterprise } = useAuth();

    const formatter = useMemo(() => {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currentEnterprise?.country?.currency_code || 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }, [currentEnterprise?.country?.currency_code]);

    const formatCurrency = (value) => formatter.format(value);

    const confirmDelete = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas eliminar esta categoría de multa?",
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
            const response = await deleteFineCategoryService(category.id);
            
            if (!response.success) {
                toast.warning(response.message);
                return;
            }

            Swal.fire(
                "¡Eliminado!",
                response.message,
                "success"
            );
            
            if (onDelete) {
                onDelete(category.id);
            }
        } catch (error) {
            toast.error("Error al eliminar la categoría");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <tr className="fine-category-row">
            <td>{category.name}</td>
            <td>{formatCurrency(category.value)}</td>
            <td className="actions">
                <Dropdown>
                    <Dropdown.Toggle 
                        variant="success"
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
    );
} 