import React, {useState, useEffect} from "react";
import {ToastContainer} from "react-toastify"
import {AuthContext} from "./utils/contexts"
import RoutingLogin from "./routers/routes-sign-in/RoutingLogin";
import {userLoggedApi} from "./services/Auth/auth";
import {setSubdomainApi} from "./services/Auth/authEnterprise";
import {SUBDOMAIN} from "./utils/variablesApi";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [callLogin, setCallLogin] = useState(false);
    const [loadUser, setLoadUser] = useState(false);

    useEffect(() => {
        setSubdomainApi(SUBDOMAIN)

        setCurrentUser(userLoggedApi());
        setLoadUser(true);
        setCallLogin(false);
    }, [callLogin])

    if (!loadUser) return null;

    return (
        <AuthContext.Provider value={currentUser}>
            {
                currentUser ?
                    <div>
                        <h1>El usuario esta logueado</h1>
                    </div>
                    : <RoutingLogin setCallLogin={setCallLogin}/>
            }

            <ToastContainer
                position="top-right"
                autoClose={5000}
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
