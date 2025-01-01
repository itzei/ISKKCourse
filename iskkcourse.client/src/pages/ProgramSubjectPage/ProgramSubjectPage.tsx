import { useEffect, useState } from "react";
import { IProgram } from "@/interfaces/IProgram";
import { getApi, postApi, putApi, deleteApi } from "@/api";
import { Modal } from "../components/Modal";
import { ProgramForm } from "./components/ProgramForm";
import { pageStyle } from "@/styles/pageStyle";
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { ISubject } from "../../interfaces/ISubject";
import Select from "react-dropdown-select";

export default function ProgramSubject() {
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [visibleDeletionModal, setVisibleDeletionModal] = useState<boolean>(false);
    const [visibleDropdown, setVisibleDropdown] = useState<number | null>(null);
    const [editProgram, setEditProgram] = useState<IProgram | undefined>();
    const [deleteProgram, setDeleteProgram] = useState<IProgram | undefined>();
    const [openProgramId, setOpenProgramId] = useState<number | null>(null);
    const [filteredSubjects, setFilteredSubjects] = useState<ISubject[]>([]);

    const getProgram = () => getApi<IProgram[]>('Programs').then(s => {
        console.log("Programs:", s);
        return s && setPrograms(s);
    });
    const getSubject = () => getApi<ISubject[]>('Subject').then(s => {
        console.log("Subjects:", s);
        return s && setSubjects(s);
    });

    const storeProgram = (program: IProgram) => {
        setVisibleModal(false);
        if (program.id) {
            putApi(`ProgramSubject/${program.id}`, program).then(r => getProgram()).then(i => i);
        } else {
            postApi(`ProgramSubject`, program).then(r => getProgram()).then(i => i);
        }
    };

    const removeProgram = () => {
        if (deleteProgram && deleteProgram.id) {
            deleteApi(`ProgramSubject/${deleteProgram.id}`, deleteProgram).then(r => getProgram()).then(i => i);
            setVisibleDeletionModal(false);
        }
    };

    const editHandler = (program: IProgram) => {
        setEditProgram(program);
        setVisibleModal(true);
    };

    const addProgram = () => {
        setEditProgram(undefined);
        setVisibleModal(true);
    };

    const deleteHandler = (program: IProgram) => {
        setDeleteProgram(program);
        setVisibleDeletionModal(true);
    };

    const toggleContent = (id: number) => {
        setOpenProgramId(openProgramId === id ? null : id);
    };

    useEffect(() => {
        getProgram().then(i => i);
        getSubject().then(i => i);
    }, []);

    useEffect(() => {
        if (visibleDropdown !== null) {
            const selectedProgram = programs.find(p => p.id === visibleDropdown);
            console.log("Selected Program:", selectedProgram);
            if (selectedProgram) {
                const filtered = subjects.filter(subject => {
                    console.log("Subject:", subject);
                    return subject.programs && subject.programs.some(program => program.id === selectedProgram.id);
                });
                console.log("Filtered Subjects:", filtered);
                setFilteredSubjects(filtered);
            }
        }
    }, [visibleDropdown, programs, subjects]);

    return (
        <div>
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
            <div className="text-3xl">Program Subjects</div>
            <button type="button" className={pageStyle.addButton} onClick={addProgram}>Add new...</button>
            <div className="relative p-6 flex-auto">
                <select onChange={(e) => setVisibleDropdown(Number(e.target.value))}>
                    <option value="">Pasirinkite studiju programa</option>
                    {programs.map(program =>
                        <option key={program.id} value={program.id}>{program.studyTitle}</option>
                    )}
                </select>
                {visibleDropdown && (
                    <select>
                        {filteredSubjects.map(subject =>
                            <option key={subject.id} value={subject.id}>{subject.subjectTitle}</option>
                        )}
                    </select>
                )}
            </div>
        </div>
    );
}
