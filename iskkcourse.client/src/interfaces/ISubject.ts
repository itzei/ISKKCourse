import { IProgram } from "./IProgram";

export interface ISubject {
    id: number
    studyProgram: string
    subjectTitle: string
    programs: IProgram[];
}