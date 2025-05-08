import React, {useState, useCallback} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {UploadIcon} from "../../../utils/icons";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import {importFineCategoriesService} from "../../../services/fines/Import/importFineCategoriesService";
import {API_HOST, TEMPLATE_FINE_CATEGORIES} from "../../../utils/variablesApi";
import "./ImportBulkCategories.scss"

export default function ImportBulkCategories() {
    const [xlsxFile, setXlsxFile] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false)
    const templateUrl = `${API_HOST}/${TEMPLATE_FINE_CATEGORIES}`;
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
        
        importFineCategoriesService(xlsxFile)
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


    return(
        <div className="d-flex justify-content-center align-items-center import-bulk-categories">
            <Card>
                <Card.Body>
                    <Card.Title>Importación de Categorías de Multas</Card.Title>
                    <Card.Text>
                        Puedes cargar de forma masiva las categorías de multas, descarga la plantilla en el enlace, luego agrega
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
                            <a 
                                href={templateUrl}
                                className="download-link"
                                download="plantilla_categorias_multas.xlsx"
                            >
                                Descargar plantilla
                            </a>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}