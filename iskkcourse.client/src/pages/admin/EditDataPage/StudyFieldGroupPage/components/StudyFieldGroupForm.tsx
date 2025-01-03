import { useForm } from "react-hook-form";
import { IStudyFieldGroup } from "@/interfaces/IStudyFieldGroup";
import { ICity } from "@/interfaces/ICity";
import { IStudyField } from "@/interfaces/IStudyField";
import { useEffect, useState } from "react";
import { formStyle } from "@/styles/formStyle";


type ProgramFormProps = { program: IStudyFieldGroup | undefined; storeProgram: (data: IStudyFieldGroup) => void }

export function StudyFieldGroupForm(props: ProgramFormProps) {
    const { program, storeProgram } = props;
    const { register, handleSubmit, reset } = useForm<IStudyFieldGroup>({ defaultValues: program });

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