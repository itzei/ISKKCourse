import { useForm } from "react-hook-form";
import { IStudyField } from "@/interfaces/IStudyField";
import { ICity } from "@/interfaces/ICity";
import { useEffect, useState } from "react";
import { formStyle } from "@/styles/formStyle";


type ProgramFormProps = { program: IStudyField | undefined; storeProgram: (data: IStudyField) => void }

export function StudyFieldForm(props: ProgramFormProps) {
    const { program, storeProgram } = props;
    const { register, handleSubmit, reset } = useForm<IStudyField>({ defaultValues: program });

    useEffect(() => {
        reset(program);
    }, [program, reset]);

    return (
        <form onSubmit={handleSubmit(storeProgram)} className='flex flex-col gap-3' >
            {program?.id && <input type="hidden" {...register("id")} />}
            <div>
                <label htmlFor="title" className={formStyle.label}>Studijų kryptis</label>
                <input id="title" className={formStyle.input} {...register("title", { required: true, maxLength: 50 })} defaultValue={program?.title || ''} />
            </div>
            <button className={formStyle.button} type="submit">Išsaugoti</button>
        </form>
    )
}