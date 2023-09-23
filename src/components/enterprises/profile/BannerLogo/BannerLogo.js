import "./BannerLogo.scss"
import React, {useState} from "react";
import BannerAlt from "../../../../assets/png/banner.png";
import LogoAlt from "../../../../assets/png/logo2.png"
import LazyLoadedImage from "../../../shared/LazyImage";

export default function BannerLogo(props){
    const [isLoading, setIsLoading] = useState(true);
    const { enterprise } = props;
    const [logoUrl] = useState(
        enterprise?.logo_url ?
            enterprise.logo_url :
            LogoAlt
    );

    const bannerUrl = enterprise?.banner_url
        ? enterprise?.banner_url
            : BannerAlt

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return(
        <div className="banner-logo"
             onLoad={handleImageLoad}
             style={{
                       backgroundImage: `url('${bannerUrl}')`,
                       opacity: isLoading ? 0.1 : 1,
                       filter: isLoading ? "blur(10px)" : ""
                    }}
             >

            <LazyLoadedImage
                src={logoUrl}
                className="logo"
            />
        </div>
    )
}
