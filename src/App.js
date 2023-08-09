import React, {useState} from "react";
import RoutingLogin from "./routers/routes-sign-in/RoutingLogin";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        currentUser ?
        <div>
            <h1>El usuario esta logueado</h1>
        </div>
        : <RoutingLogin/>
    )
}
