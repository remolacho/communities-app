import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {Button, Col, Row} from "react-bootstrap";
import {UploadIcon} from "../../../utils/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEraser} from "@fortawesome/free-solid-svg-icons";

import "./InputUploadFile.scss"

function truncate(name){
    if(name.length > 20) return name.substring(0, 20) + "..."

    return name
}

export default function InputUploadFile(props) {
    const {file, setFile, className} = props;

    const onDropFile = useCallback(acceptedFile => {
        setFile(acceptedFile[0])

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { getRootProps: getRootFileProps, getInputProps: getInputFileProps } = useDropzone({
        noKeyboard: true,
        multiple: false,
        onDrop: onDropFile
    })

    return(
        <Row>
            <Col xs= {10}  md= {11}>
                <div
                    className={className || "upload-file"}
                    {...getRootFileProps()}>

                    <input {...getInputFileProps()} />
                    <UploadIcon/>
                    {
                        file?.name
                            ? <span>{truncate(file.name)} </span>
                            : <span>Subir Archivo (opcional)</span>
                    }
                </div>
            </Col>
            {
                <Col xs={2} md={1}>
                    <Button variant="danger" onClick={()=>setFile(null)} className="delete-file" disabled={!file?.name}>
                        <FontAwesomeIcon icon={faEraser}/>
                    </Button>
                </Col>
            }
        </Row>
    )
}