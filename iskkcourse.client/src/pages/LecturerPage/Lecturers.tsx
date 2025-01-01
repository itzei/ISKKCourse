import { useEffect, useState } from "react"
import { ILecturer } from "../../interfaces/ILecturer";
import { getApi, postApi, putApi, deleteApi } from "../../api";
import { Modal } from "../components/Modal";
import { LecturerForm } from "./components/LecturerForm";
import { pageStyle } from "./../../styles/pageStyle"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function Lecturers() {
    const [lecturers, setLecturers] = useState<ILecturer[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [visibleDeletionModal, setVisibleDeletionModal] = useState<boolean>(false)
    const [editLecturer, setEditLecturer] = useState<ILecturer | undefined>()
    const [deleteLecturer, setDeleteLecturer] = useState<ILecturer | undefined>()
    const [isOpen, setIsOpen] = useState(false);

    const getLecturers = () => getApi<ILecturer[]>('Lecturer').then(s => s && setLecturers(s))

    const storeLecturer = (lecturer: ILecturer) => {
        setVisibleModal(false)
        if (lecturer.id) {
            putApi(`Lecturer/${lecturer.id}`, lecturer).then(r => getLecturers()).then(i => i)
        }
        else {
            postApi(`Lecturer`, lecturer).then(r => getLecturers()).then(i => i)
        }
    }

    const removeLecturer = () => {
        if (deleteLecturer && deleteLecturer.id) {
            deleteApi(`Lecturer/${deleteLecturer.id}`, deleteLecturer).then(r => getLecturers()).then(i => i)
            setVisibleDeletionModal(false)
        }
    }

    const editHandler = (lecturer: ILecturer) => {
        setEditLecturer(lecturer)
        setVisibleModal(true)
    }

    const addLecturer = () => {
        setEditLecturer(undefined)
        setVisibleModal(true)
    }

    const deleteHandler = (lecturer: ILecturer) => {
        setDeleteLecturer(lecturer)
        setVisibleDeletionModal(true)
    }

    const toggleContent = () => {
            setIsOpen(!isOpen);
    }
    
    useEffect(() => {
        getLecturers().then(i => i)
    }, []);

    return <div>
        {
            visibleModal ? <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title='Destytoju forma'>
                <LecturerForm storeLecturer={storeLecturer} lecturer={editLecturer}/>
            </Modal> : null
        }
        {
            visibleDeletionModal && (
                <Modal visibleModal={visibleDeletionModal} setVisibleModal={setVisibleDeletionModal} title='Ar tikrai norite panaikinti?'>
                <>
                    <button className={pageStyle.confirmButton} onClick={removeLecturer}>Taip</button>
                    <button className={pageStyle.confirmButton} onClick={() => setVisibleDeletionModal(false)}>Ne</button>
                </>
                </Modal>
            )
        }
        <div className="text-3xl">Lecturers</div>
        <button type="button" className={pageStyle.addButton} onClick={addLecturer}>Add new...</button>
        <div className="relative p-6 flex-auto">{
            lecturers.map(lecturer =>
                <div key={lecturer.id}>{lecturer.firstName} {lecturer.lastName} {" " + lecturer.email + " "} {lecturer.phoneNumber }
                    <button type="button" className={pageStyle.editButton} onClick={() => editHandler(lecturer)}>
                        <PencilIcon className="h-5 w-5 stroke-gray-600" />
                    </button>
                    <button type="button" className={pageStyle.deleteButton} onClick={() => deleteHandler(lecturer)}><TrashIcon className="h-5 w-5 stroke-gray-600" /></button>
                </div>)}
        </div>
    </div>
}