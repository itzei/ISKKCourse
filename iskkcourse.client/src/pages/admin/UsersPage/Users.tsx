import { useEffect, useState } from "react"
import { IIdentityUser } from "@/interfaces/IIdentityUser";
import { getApi, postApi, putApi, deleteApi } from "@/api";
import { Modal } from "@/pages/components/Modal";
import { UsersForm } from "./components/UsersForm";
import { pageStyle } from "@/styles/pageStyle"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useAuth } from "@/hooks/useAuth";

export default function StudyField() {
    const [users, setUsers] = useState<IIdentityUser[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [visibleDeletionModal, setVisibleDeletionModal] = useState<boolean>(false)
    const [editUser, setEditUser] = useState<IIdentityUser | undefined>()
    const [deleteUser, setDeleteUser] = useState<IIdentityUser | undefined>()
    const { auth } = useAuth()

    const getUsers = () => getApi<IIdentityUser[]>('Settings').then(s => s && setUsers(s))

    const storeUsers = (program: IIdentityUser) => {
        setVisibleModal(false)
        if (program.id) {
            putApi(`Settings/${program.id}`, program).then(r => getUsers()).then(i => i)
        }
        else {
            postApi(`Settings`, program).then(r => getUsers()).then(i => i)
        }
    }

    const removeProgram = () => {
        if (deleteUser && deleteUser.id) {
            deleteApi(`Settings/${deleteUser.id}`, deleteUser).then(r => getUsers()).then(i => i)
            setVisibleDeletionModal(false)
        }
    }

    const editHandler = (program: IIdentityUser) => {
        setEditUser(program)
        setVisibleModal(true)
    }

    const addUser = () => {
        setEditUser(undefined)
        setVisibleModal(true)
    }

    const deleteHandler = (program: IIdentityUser) => {
        setDeleteUser(program)
        setVisibleDeletionModal(true)
    }

    useEffect(() => {
        getUsers().then(i => i)
    }, []);

    return <div className='flex flex-col p-6'>
        {visibleModal &&
            <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title='Vartotoju forma'>
                <UsersForm storeUser={storeUsers} user={editUser} />
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
        <div className="text-3xl">Vartotojai</div>
        <button type="button" className={pageStyle.addButton} onClick={addUser}>Pridėti nauja</button>

        <div className='overflow-x-auto'>
            <table className={pageStyle.fullTable}>
                <thead>
                    <tr className='rounded-xl bg-gray-200'>
                        <th className='p-2 w-1/6'>Vartotojo vardas</th>
                        <th className='p-2 w-1/6'>El. paštas</th>
                        <th className='p-2 w-1/6'>Tel. Nr.</th>
                        <th className='p-2 w-1/6'>Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(program =>
                            <tr key={program.id}>
                                <td className='p-5 break-words'>{program.userName}</td>
                                <td className='p-5 break-words'>{program.email}</td>
                                <td className='p-5 break-words'>{program.phoneNumber}</td>
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
