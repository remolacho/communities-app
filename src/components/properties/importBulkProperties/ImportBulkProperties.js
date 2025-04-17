import React, {useState, useCallback} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {UploadIcon} from "../../../utils/icons";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import {downloadPropertiesTemplateService} from "../../../services/properties/Import/downloadTemplateService";
import {importPropertiesService} from "../../../services/properties/Import/importPropertiesService";

import "./ImportBulkProperties.scss"

export default function ImportBulkProperties() {
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

    const uploadFile = () => {
        setBtnLoading(true)
        
        importPropertiesService(xlsxFile)
            .then(response => {
                if (!response.success) {
                    toast.warning(response.message, {theme: "colored"});
                    return null;
                }

                toast.success(response.message, {theme: "colored"});
                setXlsxFile(null);
            })
            .catch(() => {
                toast.error("Error del servidor", {theme: "colored"});
            })
            .finally(() => {
                setBtnLoading(false);
            });
    }

    const downloadTemplate = () => {
        downloadPropertiesTemplateService()
            .then(response => {
                if (!response.success) {
                    toast.error(response.message, {theme: "colored"});
                }
            })
            .catch(() => {
                toast.error("Error al descargar la plantilla", {theme: "colored"});
            });
    }

    return(
        <div className="d-flex justify-content-center align-items-center import-bulk-properties">
            <Card>
                <Card.Body>
                    <Card.Title>Importación de Propiedades</Card.Title>
                    <Card.Text>
                        Puedes cargar de forma masiva las propiedades, descarga la plantilla en el enlace, luego agrega
                        los datos requeridos en las columnas correspondientes.
                    </Card.Text>
                    <div
                        className="upload-file"
                        {...getRootFileProps()}>

                        <input {...getInputFileProps()} />
                        <UploadIcon/>
                    </div>
                    <div className="action-button">
                        <Button variant="primary" disabled={!xlsxFile || btnLoading} onClick={uploadFile}>
                            {!btnLoading ? "Enviar plantilla" : <Spinner animation="border"/> }
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
                            <Button 
                                variant="link" 
                                className="download-link" 
                                onClick={downloadTemplate}
                            >
                                Descargar plantilla
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
} 