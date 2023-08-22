import React, {useState} from "react";
import BannerAlt from "../../../../assets/png/banner.png";
import {Button} from "react-bootstrap";
import LogoAlt from "../../../../assets/png/logo2.png"
import "./BannerLogo.scss"
import {Link} from "react-router-dom";

export default function BannerLogo(props){
    const { enterprise } = props;
    const [logoUrl] = useState(
        enterprise.logo_url ?
            enterprise.logo_url :
            LogoAlt
    );

    const bannerUrl = enterprise.banner_url
        ? enterprise.banner_url
        : BannerAlt

    return(
        <div className="banner-logo" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div className="logo"
                 style={{ backgroundImage: `url('${logoUrl}')`}}>
            </div>
            <div className="actions-profile">
                <Link to="/enterprises/edit">
                    <Button>
                        Editar
                    </Button>
                </Link>
            </div>
        </div>
    )
}
