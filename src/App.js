import React, {useState, useEffect} from "react";
import {LANG} from "./utils/variablesApi"
import {ToastContainer} from "react-toastify"
import {AuthContext} from "./utils/contexts"
import RoutingLogin from "./routers/routes-sign-in/RoutingLogin";
import {userLoggedApi} from "./services/Auth/authUser";
import {getSubdomainApi} from "./services/Auth/authSubdomain";
import Subdomain from "./pages/Subdomain";
import {setLang} from "./services/Auth/authLang";

import {Button} from "react-bootstrap";
import {logoutUser} from "./services/Auth/authUser";

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

    const close = ()=> {
        logoutUser()
        setCallLogin(true)
    }

    return (
        <AuthContext.Provider value={currentUser}>
            {
                getSubdomainApi() ?
                    currentUser ?
                        <div>
                            <h1>El usuario esta logueado</h1>
                            <Button onClick={close}>Cerrar session</Button>
                        </div>
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
