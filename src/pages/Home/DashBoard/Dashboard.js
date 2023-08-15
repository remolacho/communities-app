import React from "react";
import MainLayout from "../../../layouts/MainLayout";

function Dashboard(props){
    const {setCallLogin } = props

    return (
        <MainLayout setCallLogin={setCallLogin} className="">
            <div>
                <h1>Este es el dashboard</h1>
            </div>
        </MainLayout>
    );
}

export default Dashboard