import { Link, Outlet, useFetchers, useNavigation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserRoles } from "@/data/userRoles";
import { pageStyle } from "../styles/pageStyle";

export function Layout() {
    const navigation = useNavigation();
    const fetchers = useFetchers();
    const { logoutHandler, auth } = useAuth()
    const fetcherInProgress = fetchers.some((f) =>
        ["loading", "submitting"].includes(f.state)
    );

    return <div className='container max-w-full flex flex-col'>
        <header className='flex justify-between bg-gradient-to-b from-orange-200 to-orange-300 text-black p-1'>
            <div className='text-3xl my-2 mx-3'><Link to="/">Registracijos puslapis</Link></div>
            <nav>
                <ul className='flex gap-x-4 my-3 mx-4'>
                    {
                        auth?.isAuthenticated ? <>
                        <li>
                            <Link to="/students">Prašymai</Link>
                        </li>
                        {
                            auth?.role === UserRoles.Admin ?
                             <li>
                                  <Link to="/dashboard">Admin Panel</Link>
                             </li> : null
                        }
                            <li>
                                <button onClick={logoutHandler}>Logout</button>
                            </li>
                        </> : <>
                            <li>
                                <Link to="/signup">Registruotis</Link>
                            </li>
                            <li>
                                <Link to="/signin">Prisijungti</Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
        <div>
            {navigation.state !== "idle" && <div className="m-1">Navigation in progress...</div> }
            {fetcherInProgress && <div className="m-1">Fetcher in progress...</div> }
        </div>
        <main className='flex min-h-screen items-center content-center justify-center'>
            <Outlet />
        </main>
        
        <footer className='bg-gray-800 text-white text-sm flex justify-center items-center h-10'>
        <div>Panevėžio kolegija</div>
        </footer>
    </div>
}