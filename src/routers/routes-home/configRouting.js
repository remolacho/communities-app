import Dashboard from "../../pages/Home/DashBoard";
import Profile from "../../pages/Home/users/Profile";
import ProfileEnterprise from "../../pages/Home/enterprises/Profile"
import Edit from "../../pages/Home/enterprises/Edit";

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
    },
    {
        path: "/enterprises/profile",
        exact: true,
        page: ProfileEnterprise
    },
    {
        path: "/enterprises/edit",
        exact: true,
        page: Edit
    }
]
