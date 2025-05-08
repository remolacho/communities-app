import React, { useState, useEffect } from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import TableProperties from "../../../../components/properties/list/TableProperties";
import SearchProperties from "../../../../components/properties/list/SearchProperties";
import PaginationTable from "../../../../components/shared/PaginationTable";
import Loading from "../../../../components/shared/Loading";
import {listPropertiesService} from "../../../../services/properties/ListProperties/listPropertiesService";
import {toast} from "react-toastify";
import { Card } from "react-bootstrap";
import "./ListProperties.scss";

export default function ListPropertiesPage(props) {
    const { setCallLogin } = props;
    const [properties, setProperties] = useState([]);
    const [loadingProperties, setLoadingProperties] = useState(true);
    const [term, setTerm] = useState("");
    const [statusId, setStatusId] = useState("");
    const [typeId, setTypeId] = useState("");
    const [numPage, setNumPage] = useState(1);
    const [paginate, setPaginate] = useState({});

    useEffect(() => {
        setLoadingProperties(true);
        
        listPropertiesService(statusId, typeId, term, numPage).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setPaginate(response.paginate)
            setProperties(response.data)
        }).catch(() => {
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() => {
            setLoadingProperties(false)
        })
    }, [numPage, term, statusId, typeId]);

    if(loadingProperties) return (<Loading/>);

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <Card>
                <Card.Body>
                    <Card.Title>Listado de propiedades</Card.Title>
                    
                    <SearchProperties
                        setTerm={setTerm}
                        setStatusId={setStatusId}
                        setTypeId={setTypeId}
                        setNumPage={setNumPage}
                    />

                    <TableProperties 
                        properties={properties} 
                        setProperties={setProperties}
                    />

                    <PaginationTable
                        paginate={paginate}
                        setNumPage={setNumPage}
                        numPage={numPage}
                    />
               </Card.Body>
            </Card>
        </BannerLayout>
    )
} 