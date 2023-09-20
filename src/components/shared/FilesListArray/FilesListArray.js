import React from "react";
import {map} from "lodash";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faDownload} from "@fortawesome/free-solid-svg-icons"

import "./FilesArray.scss"

function truncate(name){
    if(name.length > 20) return name.substring(0, 20) + "..."

    return name
}

export default function FilesListArray(props) {
    const {files} = props;

    return(
        <div className="files-list-array">
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
