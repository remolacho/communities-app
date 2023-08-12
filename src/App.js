import React, {useState, useEffect} from "react";
import {LANG} from "../src/utils/variablesApi"
import {ToastContainer} from "react-toastify"
import {AuthContext} from "./utils/contexts"
import RoutingLogin from "./routers/routes-sign-in/RoutingLogin";
import {userLoggedApi} from "./services/Auth/authUser";
import {getSubdomainApi} from "./services/Auth/authEnterprise";
import Subdomain from "./pages/Subdomain";
import {setLang} from "./services/Auth/authLang";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [callLogin, setCallLogin] = useState(false);
    const [loadUser, setLoadUser] = useState(false);

    useEffect(() => {
        setLang(LANG)

        setCurrentUser(userLoggedApi());
        setLoadUser(true);
        setCallLogin(false);
    }, [callLogin])

    if (!loadUser) return null;

    return (
        <AuthContext.Provider value={currentUser}>
            {
                getSubdomainApi() ?
                    currentUser ?
                        <div>
                            <h1>El usuario esta logueado</h1>
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
