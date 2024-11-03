import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { getSession } from "next-auth/react";
import { OrderResponse } from '@/interfaces/order';

const getOrders = async () => {
    const session = await getSession();
    const { data } = await axiosInstance.get("/manage/orders", {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useGetTables = () => {
    return useQuery<OrderResponse[]>({
        queryKey: ["orders"],
        queryFn: getOrders,
        staleTime: 5 * 60 * 1000,
    });
}