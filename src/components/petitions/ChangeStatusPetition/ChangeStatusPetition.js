import React, {useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";
import {listStatusesByPetitionServices} from "../../../services/petitions/statuses/listStatusesByPetitionService";
import {toast} from "react-toastify";
import {map} from "lodash";
import {updateStatusPetitionService} from "../../../services/petitions/statuses/updateStatusPetitionService";

import "./ChangeStatusPetition.scss"

export default function ChangeStatusPetition(props) {
    const { petition, setStatusId } = props
    const [statuses, setStatuses] = useState([])

    useEffect(() =>{
        if(!petition?.token) return

        listStatusesByPetitionServices(petition?.token).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setStatuses(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })
    },[petition?.token, petition?.status?.id])

    if(statuses.length === 0){
        return(
            <span style={{
                background: petition?.status?.color,
                borderRadius: "25px",
                padding: "5px 5px 5px 5px",
                fontSize: "16px",
                color: "black",
                fontWeight: "bold",
            }}>
                {petition?.status.name}
            </span>
        )
    }

    const changeStatus = (statusId) =>{
        updateStatusPetitionService(petition?.token, statusId).then(response => {
            if (!response.success) {
                toast.error(response.message, {theme: "colored"});
                return null
            }

            setStatusId(statusId)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })
    }

    return(
        <div className="change-status-petition">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {petition?.status.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {map(statuses, (status) => {
                        return <Dropdown.Item
                            key={status.id}
                            onClick={()=>{changeStatus(status.id)}}>
                            {status.name}
                        </Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
