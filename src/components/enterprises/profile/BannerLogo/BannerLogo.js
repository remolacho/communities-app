import React, {useState} from "react";
import BannerAlt from "../../../../assets/png/banner.png";
import LogoAlt from "../../../../assets/png/logo2.png"
import "./BannerLogo.scss"

export default function BannerLogo(props){
    const { enterprise } = props;
    const [logoUrl] = useState(
        enterprise?.logo_url ?
            enterprise.logo_url :
            LogoAlt
    );

    const bannerUrl = enterprise?.banner_url
        ? enterprise?.banner_url
            : BannerAlt

    return(
        <div className="banner-logo" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <img src={logoUrl} alt="community" className="logo"/>
        </div>
    )
}
