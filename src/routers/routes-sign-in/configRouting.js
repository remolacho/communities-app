import SignIn from "../../pages/users/SignIn";

export default [
    {
        path: "users/login",
        exact: true,
        page: SignIn
    },
    {
        path: "/",
        exact: true,
        page: SignIn
    }
]
