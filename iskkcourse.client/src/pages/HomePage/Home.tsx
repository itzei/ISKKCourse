import { Link } from "react-router-dom"
import { pageStyle } from "@/styles/pageStyle"
export default function Home() {
    return <div className="flex flex-grow min-h-screen bg-[url('@/assets/background.jpg')] bg-cover bg-center items-center">
        <div className='flex flex-col flex-grow items-center backdrop-blur-sm font-medium'>
            <p>Sveiki atvykę į aukštųjų studijų registracijos puslapį!</p>
            <div>
                <button type="button" className={pageStyle.linkButton}><Link to="/programs">Peržiūrėti siūlomas studijų programas</Link></button>
                {/*<button type="button" className={pageStyle.linkButton}>Registruotis į studijas</button>*/}
            </div>
        </div>
    </div>
}