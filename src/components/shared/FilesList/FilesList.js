import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {filesListService} from "../../../services/FilesList/filesListService";
import {map} from "lodash";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faDownload} from "@fortawesome/free-solid-svg-icons"

import "./FilesList.scss"

function truncate(name){
    if(name.length > 20) return name.substring(0, 20) + "..."

    return name
}

export default function FilesList(props) {
    const [files, setFiles] = useState([])
    const {token, type} = props;

    useEffect(() =>{
        filesListService(token, type).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setFiles(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{

        })
    },[token, type])

    return(
        <div className="files-list">
                {
                    map(files, (value, key) => {
                       return <Link to={value.url} target='_blank' key={key}>
                           <div><FontAwesomeIcon icon={faDownload} />{truncate(value.name)}</div>
                       </Link>
                    })
                }
        </div>
    )
}
