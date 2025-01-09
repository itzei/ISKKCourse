import { useForm } from "react-hook-form";
import { IIdentityUser } from "@/interfaces/IIdentityUser";
import { useEffect, useState } from "react";
import { formStyle } from "@/styles/formStyle";


type ProgramFormProps = { user: IIdentityUser | undefined; storeUser: (data: IIdentityUser) => void }

export function UsersForm(props: ProgramFormProps) {
    const { user, storeUser } = props;
    const { register, handleSubmit, reset } = useForm<IIdentityUser>({ defaultValues: user });

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    return (
        <form onSubmit={handleSubmit(storeUser)} className='flex flex-col gap-3' >
            {user?.id && <input type="hidden" {...register("id")} />}
            <div>
                <label htmlFor="userName" className={formStyle.label}>Vartotojo vardas</label>
                <input id="userName" className={formStyle.input} {...register("userName", { required: true, maxLength: 20 })} defaultValue={user?.userName || ''} />
            </div>
            <div>
                <label htmlFor="mail" className={formStyle.label}>El. paštas</label>
                <input id="email" className={formStyle.input} {...register("email", { required: true, maxLength: 50 })} defaultValue={user?.email || ''} />
            </div>
            <div>
                <label htmlFor="phoneNumber" className={formStyle.label}>Tel. Nr.</label>
                <input id="phoneNumber" className={formStyle.input} {...register("phoneNumber", { maxLength: 12 })} defaultValue={user?.phoneNumber || ''} />
            </div>
            <button className={formStyle.button} type="submit">Išsaugoti</button>
        </form>
    )
}