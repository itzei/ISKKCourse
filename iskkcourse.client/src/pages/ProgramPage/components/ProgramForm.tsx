import { useForm } from "react-hook-form";
import { IProgram } from "../../../interfaces/IProgram";
import { useEffect, useState } from "react";
import { formStyle } from "../../../styles/formStyle";


type ProgramFormProps = { program: IProgram | undefined; storeProgram: (data: IProgram) => void }

export function ProgramForm(props: ProgramFormProps) {
    const { program, storeProgram } = props;
    const { register, handleSubmit, reset } = useForm<IProgram>({ defaultValues: program });

    useEffect(() => {
        reset(program);
    }, [program, reset]);

    return (
        <form onSubmit={handleSubmit(storeProgram)} className='flex flex-col gap-3' >
            {program?.id && <input type="hidden" {...register("id")} />}
            <div>
                <label htmlFor="studyTitle" className={formStyle.label}>Studijų pavadinimas</label>
                <input id="studyTitle" className={formStyle.input} {...register("studyTitle", { required: true, maxLength: 50 })} defaultValue={program?.studyTitle || ''} />
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