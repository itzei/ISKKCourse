import { Link } from "react-router-dom";
import { pageStyle } from "@/styles/pageStyle";

export default function EditData() {
    return (
    <div className=''>
            <div>
                <button type="button" className={pageStyle.linkButton}><Link to="/studyfieldgroup">Redaguoti studijų krypčių grupes</Link></button>
                <button type="button" className={pageStyle.linkButton}><Link to="/studyfield">Redaguoti studijų kryptis</Link></button>
                <button type="button" className={pageStyle.linkButton}><Link to="/city">Redaguoti miestus</Link></button>
                <button type="button" className={pageStyle.linkButton}><Link to="/institution">Redaguoti įstaigas</Link></button>
            </div>
    </div>
    )
}

