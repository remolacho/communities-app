import React from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting"

export default function RoutingHome(props){
    const {setCallLogin, callLogin } = props

    return (
        <Router>
            <Routes>
                {map(configRouting, (route, index) => (
                    <Route key={index}
                           path={route.path}
                           exact={route.exact}
                           element={<route.page setCallLogin={setCallLogin} callLogin={callLogin}  />}>
                    </Route>
                ))}
            </Routes>
        </Router>
    )
}
