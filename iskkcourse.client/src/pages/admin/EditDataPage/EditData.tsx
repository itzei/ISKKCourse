import { Link } from "react-router-dom";
import { pageStyle } from "@/styles/pageStyle";

export default function EditData() {
    return (
    <div className=''>
            <div>
                <button type="button" className={pageStyle.linkButton}><Link to="/studyfieldgroup">Edit study field groups</Link></button>
                <button type="button" className={pageStyle.linkButton}><Link to="/studyfield">Edit study fields</Link></button>
                <button type="button" className={pageStyle.linkButton}><Link to="/city">Edit cities</Link></button>
                <button type="button" className={pageStyle.linkButton}><Link to="/institution">Edit institutions</Link></button>
            </div>
    </div>
    )
}

