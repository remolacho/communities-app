import React, {useState, useEffect} from "react";
import {LANG} from "./utils/variablesApi"
import {ToastContainer} from "react-toastify"
import {AuthContext} from "./utils/contexts"
import RoutingLogin from "./routers/routes-sign-in/RoutingLogin";
import {userLoggedApi} from "./services/auth/authUser";
import {getSubdomainApi} from "./services/auth/authSubdomain";
import Subdomain from "./pages/SignInSignUp/Subdomain";
import {setLang} from "./services/auth/authLang";

import RoutingHome from "./routers/routes-home/RoutingHome";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [callLogin, setCallLogin] = useState(false);
    const [loadApp, setLoadApp] = useState(false);

    useEffect(() => {
        setLang(LANG)
        setCurrentUser(userLoggedApi());
        setLoadApp(true);
        setCallLogin(false);
    }, [callLogin])

    if (!loadApp) return null;

    return (
        <AuthContext.Provider value={currentUser}>
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
