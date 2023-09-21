import React, {useEffect, useState} from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {listPetitionsService} from "../../../../services/petitions/ListPetitions/listPetitionsService";
import TablePetitions from "../../../../components/petitions/list/TablePetitions";
import PaginationTable from "../../../../components/shared/PaginationTable";
import SearchPetitions from "../../../../components/petitions/list/SearchPetitions";

export default function ListPetitions(props) {
    const {setCallLogin} = props;
    const params = useParams();
    const [petitions, setPetitions] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const [categoryId, setCategoryId] = useState(null)
    const [statusId, setStatusId] = useState(null)
    const [paginate, setPaginate] = useState({});

    useEffect(() =>{
        listPetitionsService(params.type, categoryId, statusId, numPage).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setPaginate(response.paginate)
            setPetitions(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[categoryId, statusId, numPage])

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <SearchPetitions setCategoryId={setCategoryId}
                             setStatusId={setStatusId}
                             setNumPage={setNumPage}/>

            <TablePetitions petitions={petitions}/>

            <PaginationTable
                paginate={paginate}
                setNumPage={setNumPage}
                numPage={numPage}
            />
        </BannerLayout>
    )
}
