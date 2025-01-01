import { useForm } from "react-hook-form";
import { IUser } from "@/interfaces/IUser";
import { IAuth } from "@/interfaces/IAuth";
import { postApi } from "@/api";
import { formStyle } from "@/styles/formStyle";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ErrorBlock } from "@/pages/components/ErrorBlock";
import { useStore } from "@/store";
import { useShallow } from "zustand/react/shallow";

export default function SignIn() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IUser>()
    const navigate = useNavigate();
    const [error, setError] = useState<string | undefined>()
    const { setAuth, auth } = useStore(useShallow((state) => ({
        setAuth: state.setAuth,
        auth: state.auth
    })));

    const loginHandler = (data: IUser) => {
        if (error) setError(undefined)
        postApi<IAuth>('Authentication/signin', data).then(response => {
            if (response?.error) {
                setError(response.error)
                return
            }
            setAuth(response)
            navigate('/')
        })
    }
    return (
        <form onSubmit={handleSubmit(loginHandler)} className='flex flex-col gap-3 max-w-xs'>
            {error ? <div className='text-red-800'>{error}</div> : null}
            <div>
                <label htmlFor="email" className={formStyle.label}>El. paštas</label>
                <input id="email" type="email" className={formStyle.input} {...register("email", {
                    required: "El. paštas yra privalomas"
                })} />
                <ErrorBlock errors={errors} name="email"/>
            </div>
            <div>
                <label htmlFor="password" className={formStyle.label}>Slaptažodis</label>
                <input id="password" type="password" className={formStyle.input} {...register("password", {
                    required: "Slaptažodis yra privalomas"
                })} />
                <ErrorBlock errors={errors} name="password"/>
            </div>
            <button className={formStyle.button} type="submit">Prisijungti</button>
        </form>
    )
}
