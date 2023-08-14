import Dashboard from "../../pages/Home/DashBoard";
import Profile from "../../pages/Home/users/Profile";

export default [
    {
        path: "/",
        exact: true,
        page: Dashboard
    },
    {
        path: "/home",
        exact: true,
        page: Dashboard
    },
    {
        path: "/users/profile",
        exact: true,
        page: Profile
    }
]
