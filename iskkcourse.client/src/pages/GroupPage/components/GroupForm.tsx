import { useForm } from "react-hook-form";
import { IGroup } from "../../../interfaces/IGroup";
import { useEffect, useState } from "react";
import { formStyle } from "../../../styles/formStyle";


type GroupFormProps = { group: IGroup | undefined; storeGroup: (data: IGroup) => void }

export function GroupForm(props: GroupFormProps) {
    const { group, storeGroup } = props;
    const { register, handleSubmit, reset } = useForm<IGroup>({ defaultValues: group });

    useEffect(() => {
        reset(group);
    }, [group, reset]);

    return (
        <form onSubmit={handleSubmit(storeGroup)} className='flex flex-col gap-3' >
            {group?.id && <input type="hidden" {...register("id")} />}
            <div>
                <label htmlFor="studyProgram" className={formStyle.label}>Studijų programa</label>
                <input id="studyProgram" className={formStyle.input} {...register("studyProgram", { required: true, maxLength: 50 })} defaultValue={group?.studyProgram || ''} />
            </div>
            <div>
                <label htmlFor="groupTitle" className={formStyle.label}>Grupių pavadinimai</label>
                <input id="groupTitle" className={formStyle.input} {...register("groupTitle", { required: true, maxLength: 50 })} defaultValue={group?.groupTitle || ''} />
            </div>
            <button className={formStyle.button} type="submit">Išsaugoti</button>
        </form>
    )
}