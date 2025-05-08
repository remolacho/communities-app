import Profile from "../../pages/Home/users/Profile";
import ProfileEnterprise from "../../pages/Home/enterprises/Profile"
import Edit from "../../pages/Home/enterprises/Edit";
import ListUsers from "../../pages/Home/users/ListUsers";
import AssignImportRoles from "../../pages/Home/users/AssignImportRoles";
import RemoveImportRoles from "../../pages/Home/users/RemoveImportRoles";
import CreateSuggestion from "../../pages/Home/suggestions/CreateSuggestion";
import ListSuggestions from "../../pages/Home/suggestions/ListSuggestions";
import DetailSuggestion from "../../pages/Home/suggestions/DetailSuggestion";
import CreatePetition from "../../pages/Home/petitions/CreatePetition";
import ListPetitions from "../../pages/Home/petitions/ListPetitions/ListPetitions";
import DetailPetition from "../../pages/Home/petitions/DetailPetition";
import ImportFineCategories from "../../pages/Home/fines/ImportFineCategories";
import ListFineCategories from "../../pages/Home/fines/ListFineCategories";
import CreateFine from "../../pages/Home/fines/CreateFine";
import ImportProperties from "../../pages/Home/properties/ImportProperties";
import ListProperties from "../../pages/Home/properties/ListProperties";
import DashboardPQRs from "../../pages/Home/DashBoard/DashboardPQRs";
import Main from "../../pages/Home/Main";

const configRouting = [
    {
        path: "/",
        exact: true,
        page: Main
    },
    {
        path: "home",
        exact: true,
        page: Main
    },
    {
        path: "dashboard/pqrs",
        exact: true,
        page: DashboardPQRs
    },
    {
        path: "enterprises/profile",
        exact: true,
        page: ProfileEnterprise
    },
    {
        path: "enterprises/edit",
        exact: true,
        page: Edit
    },
    {
        path: "users/profile/:token",
        exact: true,
        page: Profile
    },
    {
        path: "users/list",
        exact: true,
        page: ListUsers
    },
    {
        path: "users/assign-roles",
        exact: true,
        page: AssignImportRoles
    },
    {
        path: "users/remove-roles",
        exact: true,
        page: RemoveImportRoles
    },
    {
        path: "suggestions/create",
        exact: true,
        page: CreateSuggestion
    },
    {
        path: "suggestions/list/:type",
        exact: true,
        page: ListSuggestions
    },
    {
        path: "suggestions/detail/:token",
        exact: true,
        page: DetailSuggestion
    },
    {
        path: "petitions/create",
        exact: true,
        page: CreatePetition
    },
    {
        path: "petitions/list/:type",
        exact: true,
        page: ListPetitions
    },
    {
        path: "petitions/detail/:token",
        exact: true,
        page: DetailPetition
    },
    {
        path: "fines/categories/import",
        exact: true,
        page: ImportFineCategories
    },
    {
        path: "fines/categories/list",
        exact: true,
        page: ListFineCategories
    },
    {
        path: "fines/create",
        exact: true,
        page: CreateFine
    },
    {
        path: "properties/import",
        exact: true,
        page: ImportProperties
    },
    {
        path: "properties/list",
        exact: true,
        page: ListProperties
    }
]

export default configRouting;