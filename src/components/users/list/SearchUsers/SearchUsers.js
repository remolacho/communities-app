import React, {useState, useRef} from "react";

import "./SearchUsers.scss"
import {Form, Col, Row, Button} from "react-bootstrap";

function initializer(){
    return {
        textTerm: "",
        filter: ""
    }
}

export default function SearchUsers(props) {
    const {setAttr, setTerm, setNumPage} = props;
    const [formData, setFormData] = useState(initializer())
    const textFilterRef = useRef()

    const onSubmit = (e) =>{
        e.preventDefault();

        setAttr(formData.filter)
        setTerm(formData.textTerm)
        setNumPage(1)
    }

    const onChange = e => {
        if (e.target.name === "filter" && e.target.value === ""){
            textFilterRef.current.value = ""
            setFormData(initializer)
            return
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return(
        <div className="search-users">
             <Form onSubmit={onSubmit} onChange={onChange}>
                 <Row>
                     <Col xs="2" md="1">
                         <Form.Label className="label-search">Buscar:</Form.Label>
                     </Col>
                     <Col xs="3" md="3">
                         <Form.Select defaultValue={formData.filter}
                                      className="mr-sm-2"
                                      name="filter">
                             <option value="">Seleccionar algun filtro ...</option>
                             <option value="name">Nombre</option>
                             <option value="lastname">Apellido</option>
                             <option value="email">Email</option>
                             <option value="identifier">Cedula</option>
                             <option value="reference">Referencia</option>
                         </Form.Select>
                     </Col>
                     <Col xs="4" md="3">
                         <Form.Control
                             type="text"
                             placeholder="Buscar"
                             className=" mr-sm-2"
                             name="textTerm"
                             defaultValue={formData.textTerm}
                             ref={textFilterRef}
                         />
                     </Col>
                     <Col xs="3" md="3">
                         <Button  type="submit">Enviar</Button>
                     </Col>
                 </Row>
             </Form>
        </div>
    )
}
