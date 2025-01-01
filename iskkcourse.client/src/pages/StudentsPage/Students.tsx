import { useEffect, useState } from "react"
import { IStudent } from "@/interfaces/IStudent";
import { getApi, postApi, putApi } from "@/api";
import { Modal } from "@/pages/components/Modal";
import { StudentForm } from "./components/StudentForm";
import { pageStyle } from "@/styles/pageStyle"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function Students() {
    const [students, setStudents] = useState<IStudent[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [editStudent, setEditStudent] = useState<IStudent | undefined>()

    const getStudents = () => getApi<IStudent[]>('Student').then(s => s && setStudents(s))

    const storeStudent = (student: IStudent) => {
        setVisibleModal(false)
        if (student.id) {
            putApi(`Student/${student.id}`, student).then(r => getStudents()).then(i => i)
        }
        else {
            postApi(`Student`, student).then(r => getStudents()).then(i => i)
        }
    }

    const editHandler = (student: IStudent) => {
        setEditStudent(student)
        setVisibleModal(true)
    }

    const addStudent = () => {
        setEditStudent(undefined)
        setVisibleModal(true)
    }

    useEffect(() => {
        getStudents().then(i => i)
    }, []);

    return <div>
        {
            visibleModal ? <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title='Studentu forma'>
                <StudentForm storeStudent={storeStudent} student={editStudent}/>
            </Modal> :null
        }
        <div className="text-3xl">Students</div>
        <button type="button" className={ pageStyle.addButton } onClick={addStudent}>Add new...</button>
        <div className="relative p-6 flex-auto">{
            students.map(student =>
                <div key={student.id}>{student.firstName} {student.lastName} {" " + student.email + " "}
                    <button type="button" className="outline outline-1 rounded-lg py-1 px-1 mx-1 my-1 hover:bg-blue-400" onClick={() => editHandler(student)}>
                        <PencilIcon className="h-5 w-5 stroke-gray-600"/>
                    </button>
                </div>)}
        </div>
    </div>
}