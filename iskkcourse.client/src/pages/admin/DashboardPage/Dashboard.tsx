import useSWR from "swr";
import { getApi } from "@/api"
import { IDashboard } from "@/interfaces/IDashboard";
import { useEffect, useState, } from "react";
import { IIdentityUser } from "@/interfaces/IIdentityUser";
import { Link } from "react-router-dom";
import { pageStyle } from "@/styles/pageStyle";
export default function Dashboard() {
    const [identityUsers, setIdentityUsers] = useState<IIdentityUser[]>([])
    const { data, error, isLoading } = useSWR<IDashboard | undefined>(
        "admin/dashboard",
        getApi,
        { revalidateOnReconnect: true }
    );
    const getUsers = () => getApi<IIdentityUser[]>('admin/Dashboard/').then(s => s && setIdentityUsers(s));

    useEffect(() => {
        getUsers().then(i => i)
    }, []);
    return <div className='p-6'>
        <h1 className='text-xl'>Administracijos panelė</h1>
        {error ? <div>{error}</div> : null}
        {data?.text}
        <div>
            <button type="button" className={pageStyle.linkButton}><Link to="/editdata">Edit page</Link></button>
        </div>
        <div className="text-3xl">Vartotojai</div>
        <div className="">
            {
                identityUsers.map(user =>
                    <div key={user.id}>
                        {user.userName} {" " + user.email}
                    </div>
                )
            }
        </div>
    </div>
}