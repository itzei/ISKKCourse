import { useForm } from "react-hook-form";
import { IIdentityUser } from "@/interfaces/IIdentityUser";
import { useEffect, useState } from "react";
import { formStyle } from "@/styles/formStyle";
import { ErrorBlock } from "@/pages/components/ErrorBlock";

type SettingsFormProps = { user: IIdentityUser | undefined; storeUser: (data: IIdentityUser) => void };

export function SettingsForm(props: SettingsFormProps) {
    const { user, storeUser } = props;
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IIdentityUser>({ defaultValues: user });
    const [error, setError] = useState<string | undefined>()

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    return (
        <form onSubmit={handleSubmit(storeUser)} className="flex flex-col items-start gap-3">
            <input type="hidden" {...register("id")} value={user?.id || ''} />
            <div>
                <label htmlFor="userName" className={formStyle.label}>
                    Vartotojo vardas
                </label>
                <input id="userName" className={formStyle.input} {...register("userName", {
                    required: "Vartotojo vardas yra privalomas", maxLength: {
                        value: 20,
                        message: 'Vartotojo vardas negali būti ilgesnis nei 20 simbolių'
                    }})} defaultValue={ user?.userName
                }
                />
                <ErrorBlock errors={errors} name="userName" />
            </div>
            <div>
                <label htmlFor="email" className={formStyle.label}>El. paštas</label>
                <input id="email" className={formStyle.input} {...register("email", {
                    required: "El. paštas yra privalomas", maxLength: 50 })} defaultValue={user?.email} />
                <ErrorBlock errors={errors} name="email" />
            </div>
            <div>
                <label htmlFor="phoneNumber" className={formStyle.label}>Tel. nr.</label>
                <input id="phoneNumber" className={formStyle.input} {...register("phoneNumber", {
                    minLength: { value: 9, message: "Tel. nr. turi būti bent 9 simbolių ilgumo" },
                    maxLength: { value: 11, message: "Tel. nr. negali būti ilgesnis nei 11 simbolių" } })} defaultValue={user?.phoneNumber || ''} />
                <ErrorBlock errors={errors} name="phoneNumber" />
            </div>
            <button className={formStyle.button} type="submit">
                Išsaugoti
            </button>
        </form>
    );
}
