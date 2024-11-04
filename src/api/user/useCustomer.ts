import { UserAddOrderRequest } from "@/interfaces/user";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";





const addOrder = async (addItem: UserAddOrderRequest) => {
    const session = await getSession();
    const { data } = await axiosInstance.post("/customer/orders", addItem, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useAddOrder = () => {
    return useMutation({
        mutationFn: addOrder,
    });
}

export { useAddOrder};