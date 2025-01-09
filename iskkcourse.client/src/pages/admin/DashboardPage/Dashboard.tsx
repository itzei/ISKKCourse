import useSWR from "swr";
import { getApi } from "@/api"
import { IDashboard } from "@/interfaces/IDashboard";
import { useEffect, useState, } from "react";
import { IIdentityUser } from "@/interfaces/IIdentityUser";
import { Link } from "react-router-dom";
import { pageStyle } from "@/styles/pageStyle";
export default function Dashboard() {
    const [users, setUsers] = useState<IIdentityUser[]>([])
    const { data, error, isLoading } = useSWR<IDashboard | undefined>(
        "admin/dashboard",
        getApi,
        { revalidateOnReconnect: true }
    );
    const getUsers = () => getApi<IIdentityUser[]>('admin/Dashboard/').then(s => s && setUsers(s));

    useEffect(() => {
        getUsers().then(i => i)
    }, []);
    return <div className='p-6'>
        <h1 className='text-xl'>Administracijos panelė</h1>
        {error ? <div>{error}</div> : null}
        {data?.text}
        <div>
            <button type="button" className={pageStyle.linkButton}><Link to="/editdata">Puslapių duomenys</Link></button>
            <button type="button" className={pageStyle.linkButton}><Link to="/users">Vartotojai</Link></button>
        </div>      
    </div>
}