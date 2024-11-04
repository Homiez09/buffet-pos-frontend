'use client';

import { useRegister } from "@/api/auth/useAuth";
import { UserRegisterRequest } from "@/interfaces/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.string().email("Invalid email format"),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof schema>;

export default function RegisterPage() {

    const register = useRegister();
    const { register: registerForm, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormValues>(
        {
            resolver: zodResolver(schema),
        }
    );
    const router = useRouter();
    
    const onSubmit = (data: RegisterFormValues) => {
        const registerData: UserRegisterRequest = {
            email: data.email,
            password: data.password,
            name: data.name,
        };
        register.mutate(registerData, {
            onSuccess: () => {
                router.push("/auth/login");
            }
        });
    }

    const BaseForm = ({name, formId, type}: {name: string, formId: keyof RegisterFormValues, type: string}) => {
        return (
            <div className="flex flex-col">
                <label className="input input-bordered flex items-center gap-2">
                    {name}:
                    <input 
                        {...registerForm(`${formId}`, { required: true })} 
                        type={type}
                    />
                </label>
                {errors[formId] && <span className="text-red-500 text-xs mt-3">{errors[formId]?.message}</span>}
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


