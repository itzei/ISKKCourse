import { useEffect, useState } from "react"
import { IGroup } from "../../interfaces/IGroup";
import { getApi, postApi, putApi, deleteApi } from "../../api";
import { Modal } from "../components/Modal";
import { GroupForm } from "./components/GroupForm";
import { pageStyle } from "./../../styles/pageStyle"
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"

export default function Groups() {
    const [groups, setGroups] = useState<IGroup[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [visibleDeletionModal, setVisibleDeletionModal] = useState<boolean>(false)
    const [editGroup, setEditGroup] = useState<IGroup | undefined>()
    const [deleteGroup, setDeleteGroup] = useState<IGroup | undefined>()
    const [openGroupId, setOpenGroupId] = useState<number | null>(null);

    const getGroups = () => getApi<IGroup[]>('Group').then(s => s && setGroups(s))

    const storeGroup = (group: IGroup) => {
        setVisibleModal(false)
        if (group.id) {
            putApi(`Group/${group.id}`, group).then(r => getGroups()).then(i => i)
        }
        else {
            postApi(`Group`, group).then(r => getGroups()).then(i => i)
        }
    }

    const removeGroup = () => {
        if (deleteGroup && deleteGroup.id) {
            deleteApi(`Group/${deleteGroup.id}`, deleteGroup).then(r => getGroups()).then(i => i)
            setVisibleDeletionModal(false)
        }
    }

    const editHandler = (group: IGroup) => {
        setEditGroup(group)
        setVisibleModal(true)
    }

    const addGroup = () => {
        setEditGroup(undefined)
        setVisibleModal(true)
    }

    const deleteHandler = (group: IGroup) => {
        setDeleteGroup(group)
        setVisibleDeletionModal(true)
    }

    const toggleContent = (id: number) => {
        setOpenGroupId(openGroupId === id ? null : id);
    }

    useEffect(() => {
        getGroups().then(i => i)
    }, []);

    return <div>
        {visibleModal &&
            <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title='Destytoju forma'>
                <GroupForm storeGroup={storeGroup} group={editGroup} />
            </Modal>
        }
        {visibleDeletionModal &&
            <Modal visibleModal={visibleDeletionModal} setVisibleModal={setVisibleDeletionModal} title='Ar tikrai norite panaikinti?'>
                <>
                    <button className={pageStyle.confirmButton} onClick={removeGroup}>Taip</button>
                    <button className={pageStyle.confirmButton} onClick={() => setVisibleDeletionModal(false)}>Ne</button>
                </>
            </Modal>
        }
        <div className="text-3xl">Groups</div>
        <button type="button" className={pageStyle.addButton} onClick={addGroup}>Add new...</button>
        <div className="relative p-6 flex-auto">
            {groups.map(group =>
                <div key={group.id}>
                    {/*collapsible button field*/}
                    <div className={pageStyle.collapsibleButtonBlock}>
                        <button className={pageStyle.collapsibleButton} onClick={() => toggleContent(group.id)}>
                            <b>{group.studyProgram}</b>
                            {openGroupId === group.id ?
                                <ChevronUpIcon className="h-5 w-5 stroke-gray-600" /> :
                                <ChevronDownIcon className="h-5 w-5 stroke-gray-600" />}
                        </button>
                        <button type="button" className={pageStyle.editButton} onClick={() => editHandler(group)}>
                            <PencilIcon className="h-5 w-5 stroke-gray-600" />
                        </button>
                        <button type="button" className={pageStyle.deleteButton} onClick={() => deleteHandler(group)}>
                            <TrashIcon className="h-5 w-5 stroke-gray-600" />
                        </button>
                        <div className={pageStyle.collapsibleContent} style={{ display: openGroupId === group.id ? 'block' : 'none' }}>
                            <b>Šiuo metu besimokančios grupės:</b>{" " + group.groupTitle}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
}
