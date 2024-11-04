import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { getSession } from "next-auth/react";
import { OrderRequest } from "@/interfaces/order";

const addOrders = async (newOrders: OrderRequest) => {
    const session = await getSession();
    const { data } = await axiosInstance.post("/customer/orders", newOrders, {
        headers: {
            AccessCode: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useAddOrder = () => {
    return useMutation({
        mutationFn: addOrders,
    });
}

export{ useAddOrder }