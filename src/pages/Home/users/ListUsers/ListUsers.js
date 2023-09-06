import React, {useState, useEffect} from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import TableUsers from "../../../../components/users/list/TableUsers";
import {toast} from "react-toastify";
import {listUsersService} from "../../../../services/users/ListUsers/listUsersService";
import SearchUsers from "../../../../components/users/list/SearchUsers";
import PaginationTable from "../../../../components/shared/PaginationTable";

import "./ListUsers.scss";

export default function ListUsers(props){
    const {setCallLogin} = props;
    const [users, setUsers] = useState([]);
    const [paginate, setPaginate] = useState({});
    const [numPage, setNumPage] = useState(1);
    const [attr, setAttr] = useState("");
    const [term, setTerm] = useState("");

    useEffect(() =>{
        listUsersService(attr, term, numPage).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setPaginate(response.paginate)
            setUsers(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{

        })
    },[numPage, term])

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <SearchUsers
                setTerm={setTerm}
                setAttr={setAttr}
                setNumPage={setNumPage}/>

            <TableUsers users={users}/>

            <PaginationTable
                paginate={paginate}
                setNumPage={setNumPage}
                numPage={numPage}
            />
        </BannerLayout>
    )
}