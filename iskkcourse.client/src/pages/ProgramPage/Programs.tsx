import { useEffect, useState } from "react"
import { IProgram } from "@/interfaces/IProgram";
import { IStudyFieldGroup } from "@/interfaces/IStudyFieldGroup";
import { IStudyField } from "@/interfaces/IStudyField";
import { IInstitution } from "@/interfaces/IInstitution";
import { ICity } from "@/interfaces/ICity";
import { getApi, postApi, putApi, deleteApi } from "@/api";
import { Modal } from "../components/Modal";
import { ProgramForm } from "./components/ProgramForm";
import { pageStyle } from "@/styles/pageStyle"
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { UserRoles } from "@/data/userRoles";
import { useAuth } from "@/hooks/useAuth";
import { formStyle } from "../../styles/formStyle";

export default function Programs() {
    const [programs, setPrograms] = useState<IProgram[]>([])
    const [studyFieldGroup, setStudyFieldGroup] = useState<IStudyFieldGroup[]>([])
    const [studyField, setStudyField] = useState<IStudyField[]>([])
    const [institution, setInstitution] = useState<IInstitution[]>([])
    const [city, setCity] = useState<ICity[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [visibleDeletionModal, setVisibleDeletionModal] = useState<boolean>(false)
    const [editProgram, setEditProgram] = useState<IProgram | undefined>()
    const [editStudyFieldGroup, setEditStudyFieldGroup] = useState<IStudyFieldGroup | undefined>()
    const [deleteProgram, setDeleteProgram] = useState<IProgram | undefined>()
    const { auth } = useAuth()
    const [filteredPrograms, setFilteredPrograms] = useState<IProgram[]>([])

    const getPrograms = async () => {
        const data = await getApi<IProgram[]>("Programs");
        if (data) {
            setPrograms(data); 
            setFilteredPrograms(data);    
        }
    };
    const getStudyFieldGroup = () => getApi<IStudyFieldGroup[]>('StudyFieldGroup').then(s => s && setStudyFieldGroup(s))
    const getStudyField = () => getApi<IStudyField[]>('StudyField').then(s => s && setStudyField(s))
    const getInstitution = () => getApi<IInstitution[]>('Institution').then(s => s && setInstitution(s))
    const getCity = () => getApi<ICity[]>('City').then(s => s && setCity(s))
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

    const filterPrograms = (key: keyof IProgram, value: string) => {
        if (value !== "") {
            setFilteredPrograms(programs.filter(program => program[key]?.toString() === value))
        }
        else 
            setFilteredPrograms(programs)
    }

    useEffect(() => {
        getPrograms()
        getStudyFieldGroup()
        getStudyField()
        getInstitution()
        getCity()
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
        <div className='flex-auto m-5'>

            <label htmlFor="studyFieldGroup" className={formStyle.label}>Krypčių grupė</label>
            <select id="studyFieldGroup" className={formStyle.input}
                onChange={(e) => filterPrograms("studyFieldGroup", e.target.value )}>
                <option className='bg-blue-200' value="" >-Pasirinkite-</option>
                {studyFieldGroup.map(group =>
                    <option key={group.id}>{group.title}</option>
                )}
            </select>

            <label htmlFor="studyField" className={formStyle.label}>Kryptis</label>
            <select id="studyField" className={formStyle.input}
                onChange={(e) => filterPrograms("studyField", e.target.value)}>
                <option className='bg-blue-200' value="" >-Pasirinkite-</option>
                {studyField.map(field =>
                    <option key={field.id}>{field.title}</option>
                )}
            </select>

            <label htmlFor="institution" className={formStyle.label}>Įstaiga</label>
            <select id="institution" className={formStyle.input}
                onChange={(e) => filterPrograms("institution", e.target.value)}>
                <option className='bg-blue-200' value="" >-Pasirinkite-</option>
                {institution.map(inst =>
                    <option key={inst.id}>{inst.title}</option>
                )}
            </select>

            <label htmlFor="city" className={formStyle.label}>Miestas</label>
            <select id="city" className={formStyle.input}
                onChange={(e) => filterPrograms("city", e.target.value)}>
                <option className='bg-blue-200' value="" >-Pasirinkite-</option>
                {city.map(city =>
                    <option key={city.id}>{city.title}</option>
                )}
            </select>
        </div>

        <div className='overflow-x-auto'>
            {filteredPrograms.length > 0 ? (
                <table className={pageStyle.fullTable}>
                    <thead>
                        <tr className='rounded-xl bg-gray-200'>
                            <th className='p-2'>Krypčių grupė</th>
                            <th className='p-2'>Kryptis</th>
                            <th className='p-2'>Įstaiga</th>
                            <th className='p-2'>Miestas</th>
                            <th className='p-2'>Studijų programa</th>
                            <th className='p-2 w-2/6'>Aprašymas</th>

                            {auth?.isAuthenticated && auth?.role === UserRoles.Admin && (
                                    <th className='p-2'>Veiksmai</th>
                            )}
                            </tr>
                    </thead>
                    <tbody>
                        {filteredPrograms.map(program =>
                                <tr key={program.id} className='border-2'>
                                    <td className='p-5'>{program.studyFieldGroup}</td>
                                    <td className='p-5'>{program.studyField}</td>
                                    <td className='p-5'>{program.institution}</td>
                                    <td className='p-5'>{program.city}</td>
                                    <td className='p-5'>{program.programTitle}</td>
                                    <td className='p-5 text-left'>{program.description}</td>
                                        {
                                            auth?.isAuthenticated && auth?.role === UserRoles.Admin && (
                                                <td className='p-5 break-words'>
                                                    <button type="button" className={pageStyle.editButton} onClick={() => editHandler(program)}>
                                                        <PencilIcon className="h-5 w-5 stroke-gray-600" />
                                                    </button>
                                                    <button type="button" className={pageStyle.deleteButton} onClick={() => deleteHandler(program)}>
                                                        <TrashIcon className="h-5 w-5 stroke-gray-600" />
                                                    </button>
                                                </td>
                                            )
                                        }
                                </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                    <div>Nėra studijų programų, atitinkančių pasirinktus kriterijus.</div>
            )}
        </div>
    </div>
}
