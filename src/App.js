import React, {useState, useEffect} from "react";
import {LANG} from "./utils/variablesApi"
import {toast, ToastContainer} from "react-toastify"
import {AuthContext} from "./utils/contexts"
import RoutingLogin from "./routers/routes-sign-in/RoutingLogin";
import {getTokenApi, logoutUser, userLoggedApi} from "./services/auth/authUser";
import {getSubdomainApi} from "./services/auth/authSubdomain";
import Subdomain from "./pages/SignInSignUp/Subdomain";
import {setLang} from "./services/auth/authLang";

import RoutingHome from "./routers/routes-home/RoutingHome";
import {settingEnterpriseService} from "./services/enterprises/Enterprise/settingEnterpriseService";
import Loading from "./components/shared/Loading";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentEnterprise, setCurrentEnterprise] = useState(null);
    const [callLogin, setCallLogin] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);

    const close = ()=> {
        logoutUser()
        setCallLogin(true)
    }

    useEffect(() => {
        setLang(LANG)

        if(getTokenApi() && !callLogin){
            setLoadingPage(true)

            settingEnterpriseService().then(response => {
                if (!response.success) {
                    toast.error(response.message, {theme: "colored"});
                    close()
                    return
                }

                setCurrentEnterprise(response.data)
                setLoadingPage(false)
            }).catch(() =>{
                return null
            })
        }

        setCurrentUser(userLoggedApi());
        setCallLogin(false);
    }, [callLogin])

    if(loadingPage) return (<Loading/>);

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
