import { Layout } from "@/pages/Layout";
import Home from "@/pages/HomePage/Home";
import SignUp from "@/pages/auth/SignUpPage/SignUp";
import SignIn from "@/pages/auth/SignInPage/SignIn";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/ProtectedRoute";
import Dashboard from "@/pages/admin/DashboardPage/Dashboard";
import Programs from "./pages/ProgramPage/Programs";

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
                }
            ]
        },
    ]);
}