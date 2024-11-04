import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { OrderRequest } from "@/interfaces/order";

const addOrders = async (newOrders: OrderRequest, accessCode: string) => {
    const { data } = await axiosInstance.post("/customer/orders", newOrders, {
        headers: {
            AccessCode: accessCode,
        },
    });
    return data;
}

const getOrderHistory = async (accessCode: string) => {
    const { data } = await axiosInstance.get("/customer/orders/history", {
        headers: {
            AccessCode: accessCode,
        },
    });
    return data;
}

const useAddOrders = (newOrders: OrderRequest, accessCode: string) => {
    return useMutation({
        mutationFn: () => addOrders(newOrders, accessCode),
    });
}

const useGetOrder = (accessCode: string) => {
    return useQuery({
        queryKey: ["orders", accessCode],
        queryFn: ()=> getOrderHistory(accessCode),
    });
}

export{ useAddOrders, useGetOrder };
