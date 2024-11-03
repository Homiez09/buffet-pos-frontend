'use client';

import { useRegister } from "@/api/auth/useAuth";
import { UserRegisterRequest } from "@/interfaces/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegisterPage() {

    const register = useRegister();
    const { register: registerForm, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter();
    
    const onSubmit = (data: any) => {
        console.log(data);
        registerHandler();
    }

    const registerHandler = async () => {
        console.log("register");
        const registerData: UserRegisterRequest = {
            email: "test@gmail.com",
            password: "jaw",
            name: "jaw",
        };
        register.mutate(registerData);
    };

    const BaseForm = ({name, formId, type}: {name: string, formId: string, type: string}) => {
        return (
            <div className="flex flex-col">
                <label className="input input-bordered flex items-center gap-2">
                    {name}:
                    <input 
                        {...registerForm(`${formId}`, { required: true })} 
                        type={type}
                    />
                </label>
                
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center w-full gap-10">
            <div className="text-3xl font-bold text-primary">Register</div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-5/6">
                <BaseForm
                    name="Email"
                    formId="email"
                    type="email"
                />
                <BaseForm
                    name="Name"
                    formId="name"
                    type="text"
                />
                <BaseForm
                    name="Password"
                    formId="password"
                    type="password"
                />
                <BaseForm
                    name="Confirm Password"
                    formId="confirmPassword"
                    type="password"
                />
                <button className="btn btn-primary" type="submit">Register</button>
            </form>
            <div>Already have an account? <span className="text-primary hover:cursor-pointer" onClick={() => router.push(
                "/auth/login"
            )}>login</span> here</div>
        </div>
    );
}


