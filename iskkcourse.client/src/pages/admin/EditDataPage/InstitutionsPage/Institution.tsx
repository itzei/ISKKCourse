import { useEffect, useState } from "react"
import { IInstitution } from "@/interfaces/IInstitution";
import { getApi, postApi, putApi, deleteApi } from "@/api";
import { Modal } from "../../../components/Modal";
import { InstitutionForm } from "./components/InstitutionForm";
import { pageStyle } from "@/styles/pageStyle"
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { UserRoles } from "@/data/userRoles";
import { useAuth } from "@/hooks/useAuth";

export default function Institution() {
    const [programs, setPrograms] = useState<IInstitution[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [visibleDeletionModal, setVisibleDeletionModal] = useState<boolean>(false)
    const [editProgram, setEditProgram] = useState<IInstitution | undefined>()
    const [deleteProgram, setDeleteProgram] = useState<IInstitution | undefined>()
    const [openProgramId, setOpenProgramId] = useState<number | null>(null);
    const { auth } = useAuth()

    const getPrograms = () => getApi<IInstitution[]>('Institution').then(s => s && setPrograms(s))

    const storeProgram = (program: IInstitution) => {
        setVisibleModal(false)
        if (program.id) {
            putApi(`Institution/${program.id}`, program).then(r => getPrograms()).then(i => i)
        }
        else {
            postApi(`Institution`, program).then(r => getPrograms()).then(i => i)
        }
    }

    const removeProgram = () => {
        if (deleteProgram && deleteProgram.id) {
            deleteApi(`Institution/${deleteProgram.id}`, deleteProgram).then(r => getPrograms()).then(i => i)
            setVisibleDeletionModal(false)
        }
    }

    const editHandler = (program: IInstitution) => {
        setEditProgram(program)
        setVisibleModal(true)
    }

    const addProgram = () => {
        setEditProgram(undefined)
        setVisibleModal(true)
    }

    const deleteHandler = (program: IInstitution) => {
        setDeleteProgram(program)
        setVisibleDeletionModal(true)
    }

    useEffect(() => {
        getPrograms().then(i => i)
    }, []);

    return <div className='flex flex-col p-6'>
        {visibleModal &&
            <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title='Istaigų forma'>
                <InstitutionForm storeProgram={storeProgram} program={editProgram} />
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
        <div className="text-3xl">Įstaigos</div>
        <button type="button" className={pageStyle.addButton} onClick={addProgram}>Pridėti nauja</button>

        <div className='overflow-x-auto'>
            <table className={ pageStyle.smallTable }>
                <thead>
                    <tr className='rounded-xl bg-gray-200'>
                        <th className='p-2 w-1/6'>Pavadinimas</th>
                        <th className='p-2 w-1/6'>Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
            {programs.map(program =>
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
                    )}
                </tbody>
            </table>
        </div>
    </div>
}
