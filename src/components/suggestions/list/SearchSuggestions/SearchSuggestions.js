import React, {useState, useRef} from "react";
import {Form, Col, Row, Button} from "react-bootstrap";

import "./SearchSuggestions.scss"

function initializer(){
    return {
        read: "",
        anonymous: ""
    }
}

export default function SearchSuggestions(props) {
    const {setRead, setAnonymous, setNumPage} = props;
    const [formData, setFormData] = useState(initializer())

    const onSubmit = (e) =>{
        e.preventDefault();

        setRead(formData.read)
        setAnonymous(formData.anonymous)
        setNumPage(1)
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return(
        <div className="search-suggestions">
             <Form onSubmit={onSubmit} onChange={onChange}>
                 <Row>
                     <Col md="1" className="d-none d-sm-table-cell">
                         <Form.Label className="label-search">Buscar:</Form.Label>
                     </Col>
                     <Col xs="4" md="3">
                         <Form.Select defaultValue={formData.read}
                                      className="mr-sm-2"
                                      name="read">
                             <option value="">Seleccionar...</option>
                             <option value="0">No leidos</option>
                             <option value="1">Leidos</option>
                         </Form.Select>
                     </Col>
                     <Col xs="4" md="3">
                         <Form.Select defaultValue={formData.anonymous}
                                      className="mr-sm-2"
                                      name="anonymous">
                             <option value="">Seleccionar...</option>
                             <option value="0">Perfil publico</option>
                             <option value="1">Perfil Anonimo</option>
                         </Form.Select>
                     </Col>
                     <Col xs="4" md="3">
                         <Button  type="submit">Enviar</Button>
                     </Col>
                 </Row>
             </Form>
        </div>
    )
}
