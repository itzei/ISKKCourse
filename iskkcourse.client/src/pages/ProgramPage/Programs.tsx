import { useEffect, useState } from "react"
import { IProgram } from "@/interfaces/IProgram";
import { getApi, postApi, putApi, deleteApi } from "@/api";
import { Modal } from "../components/Modal";
import { ProgramForm } from "./components/ProgramForm";
import { pageStyle } from "@/styles/pageStyle"
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { UserRoles } from "@/data/userRoles";
import { useAuth } from "@/hooks/useAuth";
import Select from "react-dropdown-select";

export default function Programs() {
    const [programs, setPrograms] = useState<IProgram[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [visibleDeletionModal, setVisibleDeletionModal] = useState<boolean>(false)
    const [editProgram, setEditProgram] = useState<IProgram | undefined>()
    const [deleteProgram, setDeleteProgram] = useState<IProgram | undefined>()
    const [openProgramId, setOpenProgramId] = useState<number | null>(null);
    const { auth } = useAuth()

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

    return <div className='flex flex-col p-6'>
        {visibleModal &&
            <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title='Programų forma'>
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
        <div className="text-3xl">Siūlomos studijų programos</div>
        {auth?.isAuthenticated && auth?.role === UserRoles.Admin && (
            <>
                <button type="button" className={pageStyle.addButton} onClick={addProgram}>Pridėti nauja</button>
            </>
            )
        }
        <select className='w-32'>
            <option>xd</option>
        </select>
        <div className=''>
            <table className='my-5 rounded-xl bg-gray-100'>
                <thead>
                    <tr className='rounded-xl bg-gray-200'>
                        <th className='p-2 w-1/6'>Istaiga</th>
                        <th className='p-2 w-1/6'>Studiju kryptis</th>
                        <th className='p-2 w-1/6'>Miestas</th>
                        <th className='p-2 w-1/6'>Studiju programa</th>
                        <th className='p-2 w-1/6'>Kreditai</th>
                        <th className='p-2 w-1/6'>Aprasymas</th>

                        {auth?.isAuthenticated && auth?.role === UserRoles.Admin && (
                            <>
                                <th className='p-2 w-1/6'>Veiksmai</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
            {programs.map(program =>
                <>
                    <tr key={program.id}>
                        <td className='p-5 break-words'>{program.institution}</td>
                        <td className='p-5 break-words'>{program.studyField}</td>
                        <td className='p-5 break-words'>{program.city}</td>
                        <td className='p-5 break-words'>{program.programTitle}</td>
                        <td className='p-5 break-words'>{program.credits}</td>
                        <td className='p-5 break-words'>{program.description}</td>
                        <td className='p-5 break-words'>
                        {
                            auth?.isAuthenticated && auth?.role === UserRoles.Admin && (
                                <>
                                    <button type="button" className={pageStyle.editButton} onClick={() => editHandler(program)}>
                                        <PencilIcon className="h-5 w-5 stroke-gray-600" />
                                    </button>
                                    <button type="button" className={pageStyle.deleteButton} onClick={() => deleteHandler(program)}>
                                        <TrashIcon className="h-5 w-5 stroke-gray-600" />
                                    </button>
                                </>
                            )
                            }
                        </td>
                            </tr>
                    {/*<div className={pageStyle.collapsibleButtonBlock}>
                        <button className={pageStyle.collapsibleButton} onClick={() => toggleContent(program.id)}>
                            <b>{program.programTitle}</b>
                            {openProgramId === program.id ?
                                <ChevronUpIcon className="h-5 w-5 stroke-gray-600" /> :
                                <ChevronDownIcon className="h-5 w-5 stroke-gray-600" />}
                        </button>
                        
                    <div className={pageStyle.collapsibleContent} style={{ display: openProgramId === program.id ? 'block' : 'none' }}>
                            <table className='table-auto'>
                                <thead>
                                    <tr>
                                        <th>Istaiga</th>
                                        <th>Studiju kryptis</th>
                                        <th>Miestas</th>
                                        <th>Studiju programa</th>
                                        <th>Kreditai</th>
                                        <th>Aprasymas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{program.institution}</td>
                                        <td>{program.studyField}</td>
                                        <td>{program.city}</td>
                                        <td>{program.programTitle}</td>
                                        <td>{program.credits}</td>
                                        <td>{program.description}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>*/}
                </>
                    )}
                </tbody>
            </table>
        </div>
    </div>
}
