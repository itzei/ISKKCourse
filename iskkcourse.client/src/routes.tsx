import { Layout } from "@/pages/Layout";
import Home from "@/pages/HomePage/Home";
import SignUp from "@/pages/auth/SignUpPage/SignUp";
import SignIn from "@/pages/auth/SignInPage/SignIn";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute, ProtectedRouteAdmin } from "@/ProtectedRoute";
import Dashboard from "@/pages/admin/DashboardPage/Dashboard";
import EditData from "@/pages/admin/EditDataPage/EditData"
import Programs from "./pages/ProgramPage/Programs";
import StudyFieldGroup from "./pages/admin/EditDataPage/StudyFieldGroupPage/StudyFieldGroup";
import Institution from "./pages/admin/EditDataPage/InstitutionsPage/Institution";
import City from "./pages/admin/EditDataPage/CitiesPage/City";
import StudyField from "./pages/admin/EditDataPage/StudyFieldPage/StudyField";
import Settings from "./pages/auth/SettingsPage/Settings"
import Users from "./pages/admin/UsersPage/Users"

export function router() {
    return createBrowserRouter([
        {
            path: "/",
            Component: Layout,
            children: [
                {
                    index: true,
                    Component: Home
                },
                {
                    path: 'programs',
                    Component: Programs
                },
                {
                    path: 'signup',
                    Component: SignUp
                },
                {
                    path: 'signin',
                    Component: SignIn
                },
                {
                    path: 'dashboard',
                    element: <ProtectedRouteAdmin><Dashboard/></ProtectedRouteAdmin >
                },
                {
                    path: 'editdata',
                    element: <ProtectedRouteAdmin><EditData/></ProtectedRouteAdmin>
                },
                {
                    path: 'studyfieldgroup',
                    element: <ProtectedRouteAdmin><StudyFieldGroup/></ProtectedRouteAdmin>
                },
                {
                    path: 'studyfield',
                    element: <ProtectedRouteAdmin><StudyField /></ProtectedRouteAdmin>
                },
                {
                    path: 'city',
                    element: <ProtectedRouteAdmin><City/></ProtectedRouteAdmin>
                },
                {
                    path: 'institution',
                    element: <ProtectedRouteAdmin><Institution/></ProtectedRouteAdmin>
                },
                {
                    path: 'settings',
                    element: <ProtectedRoute><Settings/></ProtectedRoute>
                },
                {
                    path: 'users',
                    element: <ProtectedRouteAdmin><Users/></ProtectedRouteAdmin>
                },
            ]
        },
    ]);
}