import React from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting"

export default function RoutingLogin(props){
    const {setCallLogin } = props

    return (
        <Router>
            <Routes>
                {map(configRouting, (route, index) => (
                    <Route key={index}
                           path={route.path}
                           exact={route.exact}
                           element={<route.page setCallLogin={setCallLogin}  />}>
                    </Route>
                ))}
            </Routes>
        </Router>
    )
}
