import React, {useEffect, useState} from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import TableSuggestions from "../../../../components/suggestions/list/TableSuggestions";
import {listSuggestionsService} from "../../../../services/suggestions/ListSuggestions/listSuggestionsService";
import {toast} from "react-toastify";
import SearchSuggestions from "../../../../components/suggestions/list/SearchSuggestions";
import PaginationTable from "../../../../components/shared/PaginationTable";
import {useParams} from "react-router-dom";

import "./ListSuggestions.scss"

export default function ListSuggestions(props) {
    const {setCallLogin} = props;
    const params = useParams();
    const [suggestions, setSuggestions] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const [read, setRead] = useState(null);
    const [anonymous, setAnonymous] = useState(null);
    const [paginate, setPaginate] = useState({});

    useEffect(() =>{
        listSuggestionsService(params.type, read, anonymous, numPage).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setPaginate(response.paginate)
            setSuggestions(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[read, anonymous, numPage, params.type])

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <SearchSuggestions
             setNumPage={setNumPage}
             setRead={setRead}
             setAnonymous={setAnonymous}/>

            <TableSuggestions suggestions={suggestions}/>

            <PaginationTable
                paginate={paginate}
                setNumPage={setNumPage}
                numPage={numPage}
            />
        </BannerLayout>
    )
}
