import { Layout } from "@/pages/Layout";
import Home from "@/pages/HomePage/Home";
import SignUp from "@/pages/auth/SignUpPage/SignUp";
import SignIn from "@/pages/auth/SignInPage/SignIn";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/ProtectedRoute";
import Dashboard from "@/pages/admin/DashboardPage/Dashboard";
import EditData from "@/pages/admin/EditDataPage/EditData"
import Programs from "./pages/ProgramPage/Programs";
import StudyFieldGroup from "./pages/admin/EditDataPage/StudyFieldGroupPage/StudyFieldGroup";
import Institution from "./pages/admin/EditDataPage/InstitutionsPage/Institution";
import City from "./pages/admin/EditDataPage/CitiesPage/City";
import StudyField from "./pages/admin/EditDataPage/StudyFieldPage/StudyField";

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
                    element: <ProtectedRoute><Dashboard/></ProtectedRoute >
                },
                {
                    path: 'editdata',
                    element: <ProtectedRoute><EditData/></ProtectedRoute>
                },
                {
                    path: 'studyfieldgroup',
                    element: <ProtectedRoute><StudyFieldGroup/></ProtectedRoute>
                },
                {
                    path: 'studyfield',
                    element: <ProtectedRoute><StudyField /></ProtectedRoute>
                },
                {
                    path: 'city',
                    element: <ProtectedRoute><City/></ProtectedRoute>
                },
                {
                    path: 'institution',
                    element: <ProtectedRoute><Institution/></ProtectedRoute>
                }
            ]
        },
    ]);
}