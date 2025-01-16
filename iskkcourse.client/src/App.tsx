import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { useStore } from "@/store";
import { getApi } from "@/api";
import { IAuth } from "@/interfaces/IAuth";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
 
export default function App() {
        const { auth, setAuth } = useStore(
            useShallow((state) => ({ auth: state.auth, setAuth: state.setAuth }))
        );

    useEffect(() => {
        if (auth === undefined)
            getApi<IAuth>('Authentication/check-session').then(res => {
                setAuth(res)
            })
    }, [auth]);

    return <RouterProvider router={ router() } />
}