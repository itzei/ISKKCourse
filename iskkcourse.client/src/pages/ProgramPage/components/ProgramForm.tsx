import { useForm } from "react-hook-form";
import { IProgram } from "@/interfaces/IProgram";
import { ICity } from "@/interfaces/ICity";
import { IStudyFieldGroup } from "@/interfaces/IStudyFieldGroup";
import { IStudyField } from "@/interfaces/IStudyField";
import { useEffect, useState } from "react";
import { formStyle } from "@/styles/formStyle";
import { getApi } from "@/api";
import { IInstitution } from "@/interfaces/IInstitution";


type ProgramFormProps = { program: IProgram | undefined; storeProgram: (data: IProgram) => void }

export function ProgramForm(props: ProgramFormProps) {
    const { program, storeProgram } = props;
    const [studyFieldGroup, setStudyFieldGroup] = useState<IStudyFieldGroup[]>([])
    const [studyField, setStudyField] = useState<IStudyField[]>([])
    const [city, setCity] = useState<ICity[]>([])
    const [institution, setInstitution] = useState<IInstitution[]>([])
    const { register, handleSubmit, reset } = useForm<IProgram>({ defaultValues: program });

    const getStudyFieldGroup = () => getApi<IStudyFieldGroup[]>('StudyFieldGroup').then(s => s && setStudyFieldGroup(s))
    const getStudyField = () => getApi<IStudyField[]>('StudyField').then(s => s && setStudyField(s))
    const getCity = () => getApi<ICity[]>('City').then(s => s && setCity(s))
    const getInstitution = () => getApi<IInstitution[]>('Institution').then(s => s && setInstitution(s))

    useEffect(() => {
        reset(program);
        getStudyFieldGroup().then(i => i)
        getStudyField().then(i => i)
        getCity().then(i => i)
        getInstitution().then(i => i)
    }, [program, reset]);

    return (
        <form onSubmit={handleSubmit(storeProgram)} className='flex flex-col gap-3' >
            {program?.id && <input type="hidden" {...register("id")} />}
            <div>
                <label htmlFor="studyFieldGroup" className={formStyle.label}>Krypčių grupė</label>
                <select id="studyFieldGroup" className={formStyle.input} {...register("studyFieldGroup", { required: true, maxLength: 50 })} defaultValue={program?.studyFieldGroup || ''}>
                    <option value={program?.id}>{program?.studyFieldGroup || '-Pasirinkite-'}</option>
                    {studyFieldGroup.map(group => 
                            <option key={group.id}>{group.title}</option>
                    )}
                </select>
            </div>
            <div>
                <label htmlFor="studyField" className={formStyle.label}>Kryptis</label>
                <select id="studyField" className={formStyle.input} {...register("studyField", { required: true, maxLength: 50 })} defaultValue={program?.studyField || ''}>
                    <option value={program?.studyField}>{program?.studyField || '-Pasirinkite-'}</option>
                    {studyField.map(group => 
                            <option key={group.id}>{group.title}</option>
                    )}
                </select>
            </div>
            <div>
                <label htmlFor="institution" className={formStyle.label}>Istaiga</label>
                <select id="institution" className={formStyle.input} {...register("institution", { required: true, maxLength: 50 })} defaultValue={program?.institution || ''}>
                    <option value={program?.institution}>{program?.institution || '-Pasirinkite-'}</option>
                    {institution.map(group =>
                        <option key={group.id}>{group.title}</option>
                    )}
                </select>
            </div>
            <div>
                <label htmlFor="city" className={formStyle.label}>Miestas</label>
                <select id="city" className={formStyle.input} {...register("city", { required: true, maxLength: 50 })} defaultValue={program?.city || ''}>
                    <option value={program?.city}>{program?.city || '-Pasirinkite-'}</option>
                    {city.map(group =>
                        <option key={group.id}>{group.title}</option>
                    )}
                </select>
            </div>
            <div>
                <label htmlFor="studyTitle" className={formStyle.label}>Studijų pavadinimas</label>
                <input id="studyTitle" className={formStyle.input} {...register("programTitle", { required: true, maxLength: 50 })} defaultValue={program?.programTitle || ''} />
            </div>
            <div>
                <label htmlFor="credits" className={formStyle.label}>Kreditai</label>
                <input id="credits" className={formStyle.input} {...register("credits", { required: true, maxLength: 3 })} defaultValue={program?.credits || ''} />
            </div>
            <div>
                <label htmlFor="description" className={formStyle.label}>Aprašymas</label>
                <input id="description" className={formStyle.input} {...register("description")} defaultValue={program?.description || ''} />
            </div>
            <button className={formStyle.button} type="submit">Išsaugoti</button>
        </form>
    )
}