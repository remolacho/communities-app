import Login from "../../pages/Login";
import ForgotPassword from "../../pages/ForgotPassword";

export default [
    {
        path: "users/login",
        exact: true,
        page: Login
    },
    {
        path: "users/forgot-password",
        exact: true,
        page: ForgotPassword
    },
    {
        path: "/",
        exact: true,
        page: Login
    }
]
