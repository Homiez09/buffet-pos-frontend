'use client';

import { useLogin } from "@/api/auth/useAuth";
import { UserLoginRequest } from "@/interfaces/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof schema>;

export default function LoginPage() {

    const login = useLogin();
    const { register: loginForm, handleSubmit, watch, formState: { errors } } = useForm<LoginFormValues>();
    const router = useRouter();
    
    const onSubmit = (data: LoginFormValues) => {
        const loginData: UserLoginRequest = {
            email: data.email,
            password: data.password,
        };
        login.mutate(loginData,{
                onSuccess: () => {
                    router.push("/manager/menu");
                }
            }
        );
    }

    const BaseForm = ({name, formId, type}: {name: string, formId: keyof LoginFormValues, type: string}) => {
        return (
            <div className="flex flex-col">
                <label className="input input-bordered flex items-center gap-2">
                    {name}:
                    <input 
                        {...loginForm(`${formId}`, { required: true })} 
                        type={type}
                    />
                </label>
                
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center w-full gap-10">
            <div className="text-3xl font-bold text-primary">Login</div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-5/6">
                <BaseForm
                    name="Email"
                    formId="email"
                    type="email"
                />
                <BaseForm
                    name="Password"
                    formId="password"
                    type="password"
                />
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            <div>No account? <span className="text-primary hover:cursor-pointer" onClick={() => router.push(
                "/auth/register"
            )}>register</span> here</div>
        </div>
    )
}