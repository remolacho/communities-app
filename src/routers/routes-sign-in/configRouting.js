import Login from "../../pages/SignInSignUp/users/Login";
import ForgotPassword from "../../pages/SignInSignUp/users/ForgotPassword";
import SignUp from "../../pages/SignInSignUp/users/SignUp";
import RecoverPassword from "../../pages/SignInSignUp/users/RecoverPassword";

const configRouting = [
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
        path: "users/recover-password",
        exact: true,
        page: RecoverPassword
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

export default configRouting;
