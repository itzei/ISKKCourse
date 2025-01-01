import { useEffect, useState } from "react"
import { ISubject } from "../../interfaces/ISubject";
import { getApi, postApi, putApi, deleteApi } from "../../api";
import { Modal } from "../components/Modal";
import { SubjectForm } from "./components/SubjectForm";
import { pageStyle } from "./../../styles/pageStyle"
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"

export default function Subjects() {
    const [subjects, setSubjects] = useState<ISubject[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [visibleDeletionModal, setVisibleDeletionModal] = useState<boolean>(false)
    const [editSubject, setEditSubject] = useState<ISubject | undefined>()
    const [deleteSubject, setDeleteSubject] = useState<ISubject | undefined>()
    const [openSubjectId, setOpenSubjectId] = useState<number | null>(null);

    const getSubjects = () => getApi<ISubject[]>('Subject').then(s => s && setSubjects(s))

    const storeSubject = (subject: ISubject) => {
        setVisibleModal(false)
        if (subject.id) {
            putApi(`Subject/${subject.id}`, subject).then(r => getSubjects()).then(i => i)
        }
        else {
            postApi(`Subject`, subject).then(r => getSubjects()).then(i => i)
        }
    }

    const removeSubject = () => {
        if (deleteSubject && deleteSubject.id) {
            deleteApi(`Subject/${deleteSubject.id}`, deleteSubject).then(r => getSubjects()).then(i => i)
            setVisibleDeletionModal(false)
        }
    }

    const editHandler = (subject: ISubject) => {
        setEditSubject(subject)
        setVisibleModal(true)
    }

    const addSubject = () => {
        setEditSubject(undefined)
        setVisibleModal(true)
    }

    const deleteHandler = (subject: ISubject) => {
        setDeleteSubject(subject)
        setVisibleDeletionModal(true)
    }

    const toggleContent = (id: number) => {
        setOpenSubjectId(openSubjectId === id ? null : id);
    }

    useEffect(() => {
        getSubjects().then(i => i)
    }, []);

    return <div>
        {visibleModal &&
            <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title='Destytoju forma'>
                <SubjectForm storeSubject={storeSubject} subject={editSubject} />
            </Modal>
        }
        {visibleDeletionModal &&
            <Modal visibleModal={visibleDeletionModal} setVisibleModal={setVisibleDeletionModal} title='Ar tikrai norite panaikinti?'>
                <>
                    <button className={pageStyle.confirmButton} onClick={removeSubject}>Taip</button>
                    <button className={pageStyle.confirmButton} onClick={() => setVisibleDeletionModal(false)}>Ne</button>
                </>
            </Modal>
        }
        <div className="text-3xl">Subjects</div>
        <button type="button" className={pageStyle.addButton} onClick={addSubject}>Add new...</button>
        <div className="relative p-6 flex-auto">
            {subjects.map(subject =>
                <div key={subject.id}>
                    {/*collapsible button field*/}
                    <div className={pageStyle.collapsibleButtonBlock}>
                        <button className={pageStyle.collapsibleButton} onClick={() => toggleContent(subject.id)}>
                            <b>{subject.subjectTitle}</b>
                            {openSubjectId === subject.id ?
                                <ChevronUpIcon className="h-5 w-5 stroke-gray-600" /> :
                                <ChevronDownIcon className="h-5 w-5 stroke-gray-600" />}
                        </button>
                        <button type="button" className={pageStyle.editButton} onClick={() => editHandler(subject)}>
                            <PencilIcon className="h-5 w-5 stroke-gray-600" />
                        </button>
                        <button type="button" className={pageStyle.deleteButton} onClick={() => deleteHandler(subject)}>
                            <TrashIcon className="h-5 w-5 stroke-gray-600" />
                        </button>
                        <div className={pageStyle.collapsibleContent} style={{ display: openSubjectId === subject.id ? 'block' : 'none' }}>
                            <b>Šį dalyką mokosi šios grupės:</b>{" " + subject.studyProgram}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
}
