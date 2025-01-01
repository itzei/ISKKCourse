import { useForm } from "react-hook-form";
import { IStudent } from "@/interfaces/IStudent";
import { useEffect } from "react";
import { formStyle } from "@/styles/formStyle";


type StudentFormProps = { student: IStudent | undefined; storeStudent: (data: IStudent) => void }

export function StudentForm(props: StudentFormProps) {
    const { student, storeStudent } = props;
    const { register, handleSubmit, reset } = useForm<IStudent>({ defaultValues: student });

    useEffect(() => {
        reset(student);
    }, [student, reset]);

    return (
        <form onSubmit= { handleSubmit(storeStudent) } className = 'flex flex-col gap-3' >
            {student?.id && <input type="hidden" {...register("id")} />}
            <div>
                <label htmlFor="firstName" className={formStyle.label}>Vardas</label>
                <input id="firstName" className={formStyle.input} {...register("firstName", {required:true, maxLength: 20})} defaultValue={student?.firstName || '' }/>
            </div>
            <div>
                <label htmlFor="lastName" className={formStyle.label}>Pavardė</label>
                <input id="lastName" className={formStyle.input} {...register("lastName", { required: true, maxLength: 20 })} defaultValue={student?.lastName || ''} />
            </div>
            <div>
                <label htmlFor="email" className={formStyle.label}>El. paštas</label>
                <input id="email" className={formStyle.input} {...register("email")} defaultValue={student?.email || ''} />
            </div>
            <button className={formStyle.button} type="submit">Išsaugoti</button>
        </form>
    )
}

