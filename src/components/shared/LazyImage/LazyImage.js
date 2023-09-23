import "./LazyImage.scss"
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';

function LazyLoadedImage(props) {
    const {src, className, roundedCircle} = props
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <Image src={src}
               alt="Community-image"
               loading="lazy"
               className={  isLoading ? `${className} image-loading` : `${className} image-load` }
               onLoad={handleImageLoad}
               roundedCircle={roundedCircle || false}
        />
    );
}

export default LazyLoadedImage;