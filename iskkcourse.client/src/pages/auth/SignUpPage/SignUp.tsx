import { useForm } from "react-hook-form";
import { IUser } from "@/interfaces/IUser";
import { postApi } from "@/api";
import { formStyle } from "@/styles/formStyle";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ErrorBlock } from "@/pages/components/ErrorBlock";

export default function SignUp() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IUser & { confirm_password: string }>()
    const navigate = useNavigate();
    const [error, setError] = useState<string | undefined>()

    const storeUser = (data: IUser) => {
        if (error) setError(undefined)
        postApi('/Authentication/signup', data).then(i => {
            if (i?.error) {
                setError(i.error)
                return
            }
            navigate('/')
        })
    }
    return (
        <form onSubmit={handleSubmit(storeUser)} className='flex flex-col gap-3 max-w-xs'>
            {error ? <div className='text-red-800'>{error}</div> : null}
            <div>
                <label htmlFor="userName" className={formStyle.label}>Vartotojo vardas</label>
                <input id="userName" className={formStyle.input} {...register("userName", {
                    required: "Vartotojo vardas yra privalomas", maxLength: {
                        value: 20,
                        message: 'Username cannot exceed 20 characters'
                    }
                })} />
                <ErrorBlock errors={errors} name="userName"/>
            </div>
            <div>
                <label htmlFor="email" className={formStyle.label}>El. paštas</label>
                <input id="email" className={formStyle.input} type="email" {...register("email", { required: "El. paštas yra privalomas" })} />
                <ErrorBlock errors={ errors } name="email"/>
            </div>
            <div>
                <label htmlFor="password" className={formStyle.label}>Slaptažodis</label>
                <input id="password" type="password" className={formStyle.input} {...register("password", {
                    required: "Slaptažodis yra privalomas",
                    minLength: { value: 5, message: "Slaptažodis turi būti bent penkių simbolių ilgumo" },
                    maxLength: {value: 9, message: "Slaptažodis negali būti ilgesnis nei devyni simboliai"}
                })} />
                <ErrorBlock errors={errors} name="password"/>
            </div>
            <div>
                <label htmlFor="confirm_password" className={formStyle.label}>Pakartoti slaptažodį</label>
                <input id = "confirm_password" type = "password" className = { formStyle.input } {
                    ...register("confirm_password",{
                    required: "Būtina pakartoti slaptažodį",
                    validate: (val: string) => {
                        if (watch('password') != val) {
                            return "Slaptažodiai nesutampa";
                        }
                    },
                })} />
                <ErrorBlock errors={errors} name="confirm_password"/>
            </div>
            <button className={formStyle.button} type="submit">Sukurti paskyrą</button>
        </form>
    )
}
