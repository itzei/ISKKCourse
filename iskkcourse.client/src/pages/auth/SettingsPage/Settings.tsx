import { useEffect, useState } from "react";
import { IIdentityUser } from "@/interfaces/IIdentityUser";
import { getApi, putApi } from "@/api";
import { SettingsForm } from "./components/SettingsForm";
import { pageStyle } from "@/styles/pageStyle";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

export default function Settings() {
    const [user, setUser] = useState<IIdentityUser | undefined>();
    const [message, setMessage] = useState<string | null>(null);
    const { auth} = useAuth();


    const getUser = async () => {
        const users = await getApi<IIdentityUser[]>('Settings');
        const currentUser = users?.find(u => u.id === auth?.id);
        setUser(currentUser);
    };

    const storeUser = async (updatedUser: IIdentityUser) => {
        if (updatedUser.id) {
            await putApi(`Settings/${updatedUser.id}`, updatedUser);
            await getUser();
            setMessage("Paskyros duomenys buvo sėkmingai išsaugoti!");
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="flex flex-col p-6">
            {message && (
                <div className="mt-4 text-green-500 font-bold">{message}</div>
            )}
            <div className="text-3xl my-3">Paskyros nustatymai</div>
            {user ? (
                <SettingsForm storeUser={storeUser} user={user} />
            ) : null}
        </div>
    );
}
