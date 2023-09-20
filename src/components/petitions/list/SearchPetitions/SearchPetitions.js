import React, {useEffect, useState} from "react";
import {Form, Col, Row, Button} from "react-bootstrap";

import "./SearchPetitions.scss"

import {
    listCategoriesPetitionsServices
} from "../../../../services/categoriesPetitions/list/listCategoriesPetitionsService";

import {toast} from "react-toastify";
import {map} from "lodash";
import {listStatusesPetitionsServices} from "../../../../services/petitions/statuses/listStatusesPetitionsService";

function initializer(){
    return {
        category_petition_id: null,
        status_id: null
    }
}

export default function SearchPetitions(props) {
    const {setStatusId, setCategoryId, setNumPage} = props;
    const [formData, setFormData] = useState(initializer())

    const [categories, setCategories] = useState([])
    const [statuses, setStatuses] = useState([])

    useEffect(() =>{
        listCategoriesPetitionsServices().then(response => {
            if (!response.success) {
                toast.error(response.message, {theme: "colored"});
                return null
            }

            setCategories(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })

        listStatusesPetitionsServices().then(response => {
            if (!response.success) {
                toast.error(response.message, {theme: "colored"});
                return null
            }

            setStatuses(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })
    },[])


    const onSubmit = (e) =>{
        e.preventDefault();

        setCategoryId(formData.category_petition_id)
        setStatusId(formData.status_id)
        setNumPage(1)
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return(
        <div className="search-petitions">
             <Form onSubmit={onSubmit} onChange={onChange}>
                 <Row>
                     <Col md="1" className="d-none d-sm-table-cell">
                         <Form.Label className="label-search">Buscar:</Form.Label>
                     </Col>
                     <Col xs="4" md="3">
                         <Form.Select defaultValue={formData.category_petition_id}
                                      className="mr-sm-2"
                                      name="category_petition_id">
                             <option value="">Todos los tipos...</option>
                             {
                                 map(categories, (category) => {
                                     return <option key={category.id} value={category.id}>{category.name}</option>
                                 })
                             }
                         </Form.Select>
                     </Col>
                     <Col xs="4" md="3">
                         <Form.Select defaultValue={formData.status_id}
                                      className="mr-sm-2"
                                      name="status_id">
                             <option value="">Todos los estado...</option>
                             {
                                 map(statuses, (status) => {
                                     return <option key={status.id} value={status.id}>{status.as_name}</option>
                                 })
                             }
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
