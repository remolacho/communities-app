import Login from "../../pages/users/Login";
import ForgotPassword from "../../pages/users/ForgotPassword";
import SignUp from "../../pages/users/SignUp";

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
        path: "users/sign-up",
        exact: true,
        page: SignUp
    },
    {
        path: "/",
        exact: true,
        page: Login
    }
]
