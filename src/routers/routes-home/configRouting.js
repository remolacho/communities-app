import Dashboard from "../../pages/Home/DashBoard";
import Profile from "../../pages/Home/users/Profile";
import ProfileEnterprise from "../../pages/Home/enterprises/Profile"
import Edit from "../../pages/Home/enterprises/Edit";
import ListUsers from "../../pages/Home/users/ListUsers";
import AssignImportRoles from "../../pages/Home/users/AssignImportRoles";
import RemoveImportRoles from "../../pages/Home/users/RemoveImportRoles";

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
        path: "/enterprises/profile",
        exact: true,
        page: ProfileEnterprise
    },
    {
        path: "/enterprises/edit",
        exact: true,
        page: Edit
    },
    {
        path: "/users/profile/:token",
        exact: true,
        page: Profile
    },
    {
        path: "/users/list",
        exact: true,
        page: ListUsers
    },
    {
        path: "/users/assign-roles",
        exact: true,
        page: AssignImportRoles
    },
    {
        path: "/users/remove-roles",
        exact: true,
        page: RemoveImportRoles
    },
]
