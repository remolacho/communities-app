import React from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import "./CreateFine.scss";

export default function CreateFine(props) {
    const { setCallLogin } = props;

    return (
        <BannerLayout setCallLogin={setCallLogin}>
            <div className="create-fine">
                <h1>Hola Mundo</h1>
            </div>
        </BannerLayout>
    );
} 