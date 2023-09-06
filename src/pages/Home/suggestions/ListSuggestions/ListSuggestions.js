import React, {useEffect, useState} from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import TableSuggestions from "../../../../components/suggestions/list/TableSuggestions";
import {listSuggestionsService} from "../../../../services/suggestions/ListSuggestions/listSuggestionsService";
import {toast} from "react-toastify";

import "./ListSuggestions.scss"

export default function ListSuggestions(props) {
    const {setCallLogin} = props;
    const [suggestions, setSuggestions] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const [read, setRead] = useState(null);
    const [anonymous, setAnonymous] = useState(null);

    useEffect(() =>{
        listSuggestionsService("list_group_roles", read, anonymous, numPage).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setSuggestions(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{

        })
    },[read, anonymous, numPage])

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <TableSuggestions suggestions={suggestions}/>
        </BannerLayout>
    )
}
