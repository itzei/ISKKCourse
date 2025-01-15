import { useStore } from "@/store";
import { postApi } from "@/api";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

export function useAuth() {
    const navigate = useNavigate();
    const { setAuth, auth } = useStore(useShallow((state) => ({
        setAuth: state.setAuth,
        auth: state.auth
    })));


    const logoutHandler = async () => {
        const response = await postApi('Authentication/logout', {});
        setAuth(undefined);
        navigate('/');
    };

    useEffect(() => {
        if (auth === undefined) {
            navigate('/signin');
        }
    }, [auth, navigate]);

    return {logoutHandler, auth}
}