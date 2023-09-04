import React, {useState, useCallback} from "react";
import {API_HOST} from "../../../../utils/variablesApi"
import {Button, Card, Spinner} from "react-bootstrap";
import {getSubdomainApi} from "../../../../services/auth/authSubdomain";
import {getLang} from "../../../../services/auth/authLang";
import {UploadIcon} from "../../../../utils/icons";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import {removeFileUserRolesService} from "../../../../services/usersRoles/Import/removeFileUserRolesService";

import "../AssignBulkRoles/AssignBulkRoles.scss"

export default function RemoveBulkRoles() {
    const [xlsxFile, setXlsxFile] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false)

    const onDropFile = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setXlsxFile(file);
    }, [])

    const { getRootProps: getRootFileProps, getInputProps: getInputFileProps } = useDropzone({
        noKeyboard: true,
        multiple: false,
        onDrop: onDropFile
    })

    const uploadFile = () =>{
        setBtnLoading(true)

        removeFileUserRolesService(xlsxFile).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            toast.success(response.message, {theme: "colored"});
            setXlsxFile(null)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false)
        })
    }

    return(
        <div className="d-flex justify-content-center align-items-center assign-bulk-roles">
            <Card>
                <Card.Body>
                    <Card.Title>Remover roles</Card.Title>
                    <Card.Text>
                        Puedes remover de forma masiva roles a los usuarios, descarga la plantilla en el enlace, luego agrega
                        la cedula en la columna identifier y marca con una x la columna del role o roles que deseas remover.
                    </Card.Text>
                    <div
                        className="upload-file"
                        {...getRootFileProps()}>

                        <input {...getInputFileProps()} />
                        <UploadIcon/>
                    </div>
                    <div className="action-button">
                        <Button variant="primary" disabled={!xlsxFile || btnLoading} onClick={uploadFile}>
                            {!btnLoading ? " Enviar plantilla" : <Spinner animation="border"/> }
                        </Button>
                    </div>
                    <div className="link-action">
                        <div>
                            {
                                xlsxFile?.name &&
                                <span className="file-name">
                                    Archivo a subir: {xlsxFile.name}
                                </span>
                            }
                        </div>
                        <div>
                            <a href={`${API_HOST}/${getSubdomainApi()}/v1/user_roles/templates/import?lang=${getLang()}`}>Descargar plantilla</a>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
