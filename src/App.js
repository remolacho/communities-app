import React, {useState, useEffect} from "react";
import {LANG} from "./utils/variablesApi"
import {ToastContainer} from "react-toastify"
import {AuthContext} from "./utils/contexts"
import RoutingLogin from "./routers/routes-sign-in/RoutingLogin";
import {getTokenApi, userLoggedApi} from "./services/auth/authUser";
import {getSubdomainApi} from "./services/auth/authSubdomain";
import Subdomain from "./pages/SignInSignUp/Subdomain";
import {setLang} from "./services/auth/authLang";

import RoutingHome from "./routers/routes-home/RoutingHome";
import {settingEnterpriseService} from "./services/enterprises/Enterprise/settingEnterpriseService";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentEnterprise, setCurrentEnterprise] = useState(null);
    const [callLogin, setCallLogin] = useState(false);
    const [loadApp, setLoadApp] = useState(false);


    useEffect(() => {
        setLang(LANG)

        if(getTokenApi() && !callLogin){
            settingEnterpriseService().then(response => {
                if (!response.success) {
                    return
                }

                setCurrentEnterprise(response.data)
            }).catch(() =>{
                return null
            })
        }

        setCurrentUser(userLoggedApi());
        setCallLogin(false);
    }, [callLogin])

    return (
        <AuthContext.Provider value={{currentUser: currentUser, currentEnterprise: currentEnterprise}}>
            {
                getSubdomainApi() ?
                    currentUser ?
                        <RoutingHome setCallLogin={setCallLogin} callLogin={callLogin}/>
                        : <RoutingLogin setCallLogin={setCallLogin}/>
                    : <Subdomain setCallLogin={setCallLogin}/>
            }

            <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </AuthContext.Provider>
    )
}
