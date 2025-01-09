import { Navigate } from "react-router-dom";
import { useStore } from "./store";
import { UserRoles } from "./data/userRoles";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const auth = useStore((state) => state.auth);
    if (!auth) return null;
    if (!auth.isAuthenticated) {
        return <Navigate to="/signin" />;
    }
    return children;
}
export function ProtectedRouteAdmin({ children }: { children: JSX.Element }) {
    const auth = useStore((state) => state.auth);
    if (!auth) return null;
    if (auth?.role !== UserRoles.Admin) {
        return <Navigate to="/signin" />;
    }
    return children;
}