import { useEffect, useState } from "react"
import { IStudyFieldGroup } from "@/interfaces/IStudyFieldGroup";
import { getApi, postApi, putApi, deleteApi } from "@/api";
import { Modal } from "../../../components/Modal";
import { StudyFieldGroupForm } from "./components/StudyFieldGroupForm";
import { pageStyle } from "@/styles/pageStyle"
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { UserRoles } from "@/data/userRoles";
import { useAuth } from "@/hooks/useAuth";

export default function StudyFieldGroup() {
    const [programs, setPrograms] = useState<IStudyFieldGroup[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [visibleDeletionModal, setVisibleDeletionModal] = useState<boolean>(false)
    const [editProgram, setEditProgram] = useState<IStudyFieldGroup | undefined>()
    const [deleteProgram, setDeleteProgram] = useState<IStudyFieldGroup | undefined>()
    const [openProgramId, setOpenProgramId] = useState<number | null>(null);
    const { auth } = useAuth()

    const getPrograms = () => getApi<IStudyFieldGroup[]>('StudyFieldGroup').then(s => s && setPrograms(s))

    const storeProgram = (program: IStudyFieldGroup) => {
        setVisibleModal(false)
        if (program.id) {
            putApi(`StudyFieldGroup/${program.id}`, program).then(r => getPrograms()).then(i => i)
        }
        else {
            postApi(`StudyFieldGroup`, program).then(r => getPrograms()).then(i => i)
        }
    }

    const removeProgram = () => {
        if (deleteProgram && deleteProgram.id) {
            deleteApi(`StudyFieldGroup/${deleteProgram.id}`, deleteProgram).then(r => getPrograms()).then(i => i)
            setVisibleDeletionModal(false)
        }
    }

    const editHandler = (program: IStudyFieldGroup) => {
        setEditProgram(program)
        setVisibleModal(true)
    }

    const addProgram = () => {
        setEditProgram(undefined)
        setVisibleModal(true)
    }

    const deleteHandler = (program: IStudyFieldGroup) => {
        setDeleteProgram(program)
        setVisibleDeletionModal(true)
    }

    useEffect(() => {
        getPrograms().then(i => i)
    }, []);

    return <div className='flex flex-col p-6'>
        {visibleModal &&
            <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title='Studijų krypčių grupių forma'>
                <StudyFieldGroupForm storeProgram={storeProgram} program={editProgram} />
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
        <div className="text-3xl">Studijų krypčių grupės</div>
        <button type="button" className={pageStyle.addButton} onClick={addProgram}>Pridėti nauja</button>

        <div className=''>
            <table className='my-5 rounded-xl bg-gray-100'>
                <thead>
                    <tr className='rounded-xl bg-gray-200'>
                        <th className='p-2 w-1/6'>Krypčių grupė</th>
                        <th className='p-2 w-1/6'>Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
            {programs.map(program =>
                <>
                    <tr key={program.id}>
                        <td className='p-5 break-words'>{program.title}</td>
                        <td className='p-5 break-words'>
                                    <button type="button" className={pageStyle.editButton} onClick={() => editHandler(program)}>
                                        <PencilIcon className="h-5 w-5 stroke-gray-600" />
                                    </button>
                                    <button type="button" className={pageStyle.deleteButton} onClick={() => deleteHandler(program)}>
                                        <TrashIcon className="h-5 w-5 stroke-gray-600" />
                                    </button>
                        </td>
                    </tr>
                </>
                    )}
                </tbody>
            </table>
        </div>
    </div>
}
