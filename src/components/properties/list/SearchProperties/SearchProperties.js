import React, {useState, useRef, useEffect} from "react";
import "./SearchProperties.scss"
import {Form, Col, Row, Button} from "react-bootstrap";
import {listStatusesPropertyServices} from "../../../../services/properties/Statuses/StatusesPropertyService";
import {listPropertyTypesServices} from "../../../../services/properties/PropertyTypes/PropertyTypesService";
import {toast} from "react-toastify";

function initializer() {
    return {
        textTerm: "",
        propertyStatus: "",
        propertyType: ""
    }
}

export default function SearchProperties(props) {
    const {setTerm, setNumPage, setStatusId, setTypeId} = props;
    const [formData, setFormData] = useState(initializer())
    const [propertyStatuses, setPropertyStatuses] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const textFilterRef = useRef()

    useEffect(() => {
        Promise.all([
            listStatusesPropertyServices(),
            listPropertyTypesServices()
        ])
        .then(([statusesResponse, typesResponse]) => {
            if (!statusesResponse.success) {
                toast.warning(statusesResponse.message);
                return;
            }
            if (!typesResponse.success) {
                toast.warning(typesResponse.message);
                return;
            }
            
            setPropertyStatuses(statusesResponse.data);
            setPropertyTypes(typesResponse.data);
        })
        .catch(() => {
            toast.error("Error al cargar los datos");
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        setTerm(formData.textTerm);
        setStatusId(formData.propertyStatus);
        setTypeId(formData.propertyType);
        setNumPage(1);
    }

    const onChange = e => {
        if (e.target.value === "" && e.target.name === "textTerm") {
            textFilterRef.current.value = "";
            setFormData(initializer());
            // Resetear todos los filtros cuando se limpia la búsqueda
            setTerm("");
            setStatusId("");
            setTypeId("");
            setNumPage(1);
            return;
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return(
        <div className="search-properties">
             <Form onSubmit={onSubmit} onChange={onChange}>
                 <Row>
                     <Col xs="6" md="3">
                         <Form.Control
                             type="text"
                             placeholder="Buscar ubicación"
                             className="mr-sm-2"
                             name="textTerm"
                             defaultValue={formData.textTerm}
                             ref={textFilterRef}
                         />
                     </Col>
                     <Col className="d-none d-md-block" md="3">
                         <Form.Select 
                             name="propertyStatus"
                             value={formData.propertyStatus}
                             className="mr-sm-2"
                             disabled={loading}
                         >
                             <option value="">Estado</option>
                             {propertyStatuses.map(status => (
                                 <option key={status.id} value={status.id}>
                                     {status.as_name}
                                 </option>
                             ))}
                         </Form.Select>
                     </Col>
                     <Col className="d-none d-md-block" md="3">
                         <Form.Select
                             name="propertyType"
                             value={formData.propertyType}
                             className="mr-sm-2"
                             disabled={loading}
                         >
                             <option value="">Tipo</option>
                             {propertyTypes.map(type => (
                                 <option key={type.id} value={type.id}>
                                     {type.name}
                                 </option>
                             ))}
                         </Form.Select>
                     </Col>
                     <Col xs="4" md="3">
                         <Button type="submit">Buscar</Button>
                     </Col>
                 </Row>
             </Form>
        </div>
    )
} 