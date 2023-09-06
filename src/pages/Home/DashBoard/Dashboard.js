import React from "react";
import BannerLayout from "../../../layouts/BannerLayout";

function Dashboard(props){
    const {setCallLogin } = props

    return (
        <BannerLayout setCallLogin={setCallLogin}>
            <div>
                <h1>Este es el dashboard</h1>
            </div>
        </BannerLayout>
    );
}

export default Dashboard