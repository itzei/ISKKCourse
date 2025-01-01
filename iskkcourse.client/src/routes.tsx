import { Layout } from "@/pages/Layout";
import Home from "@/pages/HomePage/Home";
import SignUp from "@/pages/auth/SignUpPage/SignUp";
import SignIn from "@/pages/auth/SignInPage/SignIn";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/ProtectedRoute";
import Students from "@/pages/StudentsPage/Students"
import Dashboard from "@/pages/admin/DashboardPage/Dashboard";
import Lecturers from "./pages/LecturerPage/Lecturers";
import Groups from "./pages/GroupPage/Groups";
import Subjects from "./pages/SubjectPage/Subjects";
import Programs from "./pages/ProgramPage/Programs";
import ProgramSubject from "./pages/ProgramSubjectPage/ProgramSubjectPage";

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
                    path: 'students',
                    element: <ProtectedRoute><Students /></ProtectedRoute >
                },
                {
                    path: 'lecturers',
                    element: <ProtectedRoute><Lecturers /></ProtectedRoute >
                },
                {
                    path: 'groups',
                    element: <ProtectedRoute><Groups /></ProtectedRoute >
                },
                {
                    path: 'programs',
                    Component: Programs
                },
                {
                    path: 'subjects',
                    element: <ProtectedRoute><Subjects /></ProtectedRoute >
                },
                {
                    path: 'programsubjects',
                    element: <ProtectedRoute><ProgramSubject/></ProtectedRoute>
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