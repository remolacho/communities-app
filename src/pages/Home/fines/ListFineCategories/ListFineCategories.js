import React, { useState, useEffect } from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import TableFineCategories from "../../../../components/fines/list/TableFineCategories";
import PaginationTable from "../../../../components/shared/PaginationTable";
import Loading from "../../../../components/shared/Loading";
import { listFineCategoriesService } from "../../../../services/fines/categories/listFineCategoriesService";
import "./ListFineCategories.scss";

export default function ListFineCategories(props) {
    const { setCallLogin } = props;
    const [categories, setCategories] = useState([]);
    const [paginate, setPaginate] = useState();
    const [numPage, setNumPage] = useState(1);
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        setLoadingPage(true);

        listFineCategoriesService(numPage).then(response => {
            if (!response.success) {
                toast.warning(response.message, { theme: "colored" });
                return null;
            }

            setPaginate(response.paginate);
            setCategories(response.data);
        }).catch(() => {
            toast.error("Error del servidor", { theme: "colored" });
        }).finally(() => {
            setLoadingPage(false);
        });
    }, [numPage]);

    if (loadingPage) return (<Loading />);

    return (
        <BannerLayout setCallLogin={setCallLogin}>
            <Card>
                <Card.Body>
                    <Card.Title>Listado de Categorías Disciplinarias</Card.Title>

                    <TableFineCategories 
                        categories={categories}
                        setCategories={setCategories}
                    />

                    {paginate.total_pages > 1 && (
                        <PaginationTable
                            paginate={paginate}
                            setNumPage={setNumPage}
                            numPage={numPage}
                        />
                    )}
                </Card.Body>
            </Card>
        </BannerLayout>
    );
} 