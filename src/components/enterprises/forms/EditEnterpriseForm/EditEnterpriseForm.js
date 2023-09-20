import React, {useState, useCallback} from "react";
import {Form, Button, Row, Col, Spinner, Card} from "react-bootstrap";
import { useDropzone } from "react-dropzone"
import {CameraIcon} from "../../../../utils/icons"
import {toast} from "react-toastify";
import {updateEnterpriseService} from "../../../../services/enterprises/Enterprise/updateEnterpriseService";
import LogoAlt from "../../../../assets/png/logo2.png";
import BannerAlt from "../../../../assets/png/banner.png";
import "./EditEnterpriseForm.scss"

function attributes(){
    return  {
        name: "",
        rut:  "",
        email: "",
        address:  "",
        logo: null,
        banner: null
    }
}

function initializer(enterprise){
    let enterpriseAttributes = attributes();

    if (!enterprise) return enterpriseAttributes;

    enterpriseAttributes.name = enterprise.name
    enterpriseAttributes.rut = enterprise.rut
    enterpriseAttributes.email = enterprise.email
    enterpriseAttributes.address = enterprise.address

    return enterpriseAttributes
}

export default function EditEnterpriseForm(props){
    const { enterprise } = props;
    const [formData, setFormData] = useState(initializer(enterprise));
    const [btnLoading, setBtnLoading] = useState(false)

    const [bannerFile, setBannerFile] = useState(null);
    const [bannerUrl, setBannerUrl] = useState(
        enterprise.banner_url ?
            enterprise.banner_url
            : BannerAlt

    );

    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setBannerUrl(URL.createObjectURL(file));
        setBannerFile(file);
    }, [])


    const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner
    })


    const [logoFile, setLogoFile] = useState(null);
    const [logoUrl, setLogoUrl] = useState(
        enterprise.logo_url
            ? enterprise.logo_url
            : LogoAlt
    );

    const onDropLogo = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setLogoUrl(URL.createObjectURL(file));
        setLogoFile(file);
    }, [])


    const { getRootProps: getRootLogoProps, getInputProps: getInputLogoProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: onDropLogo
    })

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) =>{
        e.preventDefault();

        setBtnLoading(true)

        updateEnterpriseService(enterprise.token, formData, logoFile, bannerFile).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            toast.success(response.message, {theme: "colored"});
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false)
        })
    }

    return(
        <div className="header-enterprise">
            <div
                className="banner"
                style={{ backgroundImage: `url('${bannerUrl}')`}}
                {...getRootBannerProps()}>

                <input {...getInputBannerProps()} />
                <CameraIcon/>
            </div>

            <div className="logo"
                 style={{ backgroundImage: `url('${logoUrl}')`}}
                 {...getRootLogoProps()}>

                <input {...getInputLogoProps()} />
                <CameraIcon/>
            </div>
            <div className="d-flex justify-content-center align-items-center edit-enterprise-form">
                <Card>
                    <Card.Body>
                        <Card.Title>Editar Empresa</Card.Title>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            defaultValue={formData.rut}
                                            type="text"
                                            placeholder="RUT"
                                            name="rut"
                                            onChange={onChange}
                                        />
                                    </Col>

                                    <Col>
                                        <Form.Control
                                            defaultValue={formData.name}
                                            type="text"
                                            placeholder="Nombre"
                                            name="name"
                                            onChange={onChange}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    defaultValue={formData.email}
                                    placeholder="Email"
                                    type="text"
                                    name="email"
                                    onChange={onChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    defaultValue={formData.address}
                                    as="textarea"
                                    rows="2"
                                    placeholder="Direccion"
                                    type="text"
                                    name="address"
                                    onChange={onChange}
                                />
                            </Form.Group>

                            <Button variant="primary"
                                    type="submit"
                                    className="btn-submit"
                                    disabled={btnLoading}>
                                {!btnLoading ? "Guardar" : <Spinner animation="border"/> }
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
