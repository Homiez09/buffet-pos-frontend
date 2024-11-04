import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { UserLoginRequest, UserRegisterRequest } from "@/interfaces/user";

const register = async (newUser: UserRegisterRequest) => {
  const { data } = await axiosInstance.post<UserRegisterRequest>("/auth/register", newUser);
  return data;
};

const login = async (newUser: UserLoginRequest) => {
  const { data } = await axiosInstance.post<UserLoginRequest>("/auth/login", newUser);
  return data;
}

const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {},
  });
}

const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: async () => {},
  });
};

export {useRegister, useLogin};