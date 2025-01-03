import { useForm } from "react-hook-form";
import { IInstitution } from "@/interfaces/IInstitution";
import { ICity } from "@/interfaces/ICity";
import { IStudyField } from "@/interfaces/IStudyField";
import { useEffect, useState } from "react";
import { formStyle } from "@/styles/formStyle";


type ProgramFormProps = { program: IInstitution | undefined; storeProgram: (data: IInstitution) => void }

export function InstitutionForm(props: ProgramFormProps) {
    const { program, storeProgram } = props;
    const { register, handleSubmit, reset } = useForm<IInstitution>({ defaultValues: program });

    useEffect(() => {
        reset(program);
    }, [program, reset]);

    return (
        <form onSubmit={handleSubmit(storeProgram)} className='flex flex-col gap-3' >
            {program?.id && <input type="hidden" {...register("id")} />}
            <div>
                <label htmlFor="title" className={formStyle.label}>Įstaigos pavadinimas</label>
                <input id="title" className={formStyle.input} {...register("title", { required: true, maxLength: 50 })} defaultValue={program?.title || ''} />
            </div>
            <button className={formStyle.button} type="submit">Išsaugoti</button>
        </form>
    )
}