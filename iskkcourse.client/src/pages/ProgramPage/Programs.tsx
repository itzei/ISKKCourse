import { useEffect, useState } from "react"
import { IProgram } from "@/interfaces/IProgram";
import { getApi, postApi, putApi, deleteApi } from "@/api";
import { Modal } from "../components/Modal";
import { ProgramForm } from "./components/ProgramForm";
import { pageStyle } from "@/styles/pageStyle"
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"

export default function Programs() {
    const [programs, setPrograms] = useState<IProgram[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [visibleDeletionModal, setVisibleDeletionModal] = useState<boolean>(false)
    const [editProgram, setEditProgram] = useState<IProgram | undefined>()
    const [deleteProgram, setDeleteProgram] = useState<IProgram | undefined>()
    const [openProgramId, setOpenProgramId] = useState<number | null>(null);

    const getPrograms = () => getApi<IProgram[]>('Programs').then(s => s && setPrograms(s))

    const storeProgram = (program: IProgram) => {
        setVisibleModal(false)
        if (program.id) {
            putApi(`Programs/${program.id}`, program).then(r => getPrograms()).then(i => i)
        }
        else {
            postApi(`Programs`, program).then(r => getPrograms()).then(i => i)
        }
    }

    const removeProgram = () => {
        if (deleteProgram && deleteProgram.id) {
            deleteApi(`Programs/${deleteProgram.id}`, deleteProgram).then(r => getPrograms()).then(i => i)
            setVisibleDeletionModal(false)
        }
    }

    const editHandler = (program: IProgram) => {
        setEditProgram(program)
        setVisibleModal(true)
    }

    const addProgram = () => {
        setEditProgram(undefined)
        setVisibleModal(true)
    }

    const deleteHandler = (program: IProgram) => {
        setDeleteProgram(program)
        setVisibleDeletionModal(true)
    }

    const toggleContent = (id: number) => {
        setOpenProgramId(openProgramId === id ? null : id);
    }

    useEffect(() => {
        getPrograms().then(i => i)
    }, []);

    return <div>
        {visibleModal &&
            <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title='Destytoju forma'>
                <ProgramForm storeProgram={storeProgram} program={editProgram} />
            </Modal>
        }
        {visibleDeletionModal &&
            <Modal visibleModal={visibleDeletionModal} setVisibleModal={setVisibleDeletionModal} title='Ar tikrai norite panaikinti?'>
                <>
                    <button className={pageStyle.confirmButton} onClick={removeProgram}>Taip</button>
                    <button className={pageStyle.confirmButton} onClick={() => setVisibleDeletionModal(false)}>Ne</button>
                </>
            </Modal>
        }
        <div className="text-3xl">Programs</div>
        <button type="button" className={pageStyle.addButton} onClick={addProgram}>Add new...</button>
        <div className="relative p-6 flex-auto">
            {programs.map(program =>
                <div key={program.id}>
                    {/*collapsible button field*/}
                    <div className={pageStyle.collapsibleButtonBlock}>
                        <button className={pageStyle.collapsibleButton} onClick={() => toggleContent(program.id)}>
                            <b>{program.studyTitle}</b>
                            {openProgramId === program.id ?
                                <ChevronUpIcon className="h-5 w-5 stroke-gray-600" /> :
                                <ChevronDownIcon className="h-5 w-5 stroke-gray-600" />}
                        </button>
                    <button type="button" className={pageStyle.editButton} onClick={() => editHandler(program)}>
                        <PencilIcon className="h-5 w-5 stroke-gray-600" />
                    </button>
                    <button type="button" className={pageStyle.deleteButton} onClick={() => deleteHandler(program)}>
                        <TrashIcon className="h-5 w-5 stroke-gray-600" />
                        </button>
                    <div className={pageStyle.collapsibleContent} style={{ display: openProgramId === program.id ? 'block' : 'none' }}>
                        <b>Studiju kreditai:</b>{" " + program.credits}
                        <br />
                        <b>Studiju aprašymas:</b>{" " + program.description}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
}
