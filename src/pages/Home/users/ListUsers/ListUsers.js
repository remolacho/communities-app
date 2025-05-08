import "./ListUsers.scss";
import React, {useState, useEffect} from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import TableUsers from "../../../../components/users/list/TableUsers";
import {toast} from "react-toastify";
import {listUsersService} from "../../../../services/users/ListUsers/listUsersService";
import SearchUsers from "../../../../components/users/list/SearchUsers";
import PaginationTable from "../../../../components/shared/PaginationTable";
import Loading from "../../../../components/shared/Loading";
import { Card } from "react-bootstrap";
export default function ListUsers(props){
    const {setCallLogin} = props;
    const [users, setUsers] = useState([]);
    const [paginate, setPaginate] = useState({});
    const [numPage, setNumPage] = useState(1);
    const [attr, setAttr] = useState("");
    const [term, setTerm] = useState("");
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() =>{
        setLoadingPage(true)

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
            setLoadingPage(false)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[numPage, term])

    if(loadingPage) return (<Loading/>);

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <Card>
                <Card.Body>
                    <Card.Title>Listado de usuarios</Card.Title>
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
            </Card.Body>
        </Card>
        </BannerLayout>
    )
}