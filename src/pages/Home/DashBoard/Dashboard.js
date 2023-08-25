import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import BannerLayout from "../../../layouts/BannerLayout";
import useAuth from "../../../hooks/contextValues/useAuth";

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