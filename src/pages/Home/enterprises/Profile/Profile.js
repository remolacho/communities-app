import "./Profile.scss";
import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
import {profileEnterpriseService} from "../../../../services/enterprises/Enterprise/profileEnterpriseService";
import InfoEnterprise from "../../../../components/enterprises/profile/InfoEnterprise";
import BannerLayout from "../../../../layouts/BannerLayout";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import Loading from "../../../../components/shared/Loading";

export default function Profile(props){
    const {setCallLogin} = props;
    const [enterprise, setEnterprise] = useState(null);
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() =>{
        profileEnterpriseService().then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setEnterprise(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setLoadingPage(false)
        })
    },[])

    if(loadingPage) return (<Loading/>);
    if (!enterprise) return

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <div className="profile-enterprise__actions">
                <Link to="/enterprises/edit">
                    <Button>
                        Editar
                    </Button>
                </Link>
            </div>
            <InfoEnterprise enterprise={enterprise} />
        </BannerLayout>
    )
}
