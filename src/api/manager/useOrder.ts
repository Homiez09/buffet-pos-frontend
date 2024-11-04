import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { getSession } from "next-auth/react";
import { OrderResponse, OrderStatus } from '@/interfaces/order';

const getOrdersByStatus = async (status: OrderStatus) => {
    const session = await getSession();
    const { data } = await axiosInstance.get(`/manage/orders/status/${status}`, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useGetOrdersByStatus = (status: OrderStatus) => {
    return useQuery<OrderResponse[]>({
        queryKey: ["orders", status],
        queryFn: () => getOrdersByStatus(status),
        staleTime: 5 * 60 * 1000,
    });
}

const deliverOrder = async () => {
    const session = await getSession();
    const { data } = await axiosInstance.put("await p jaw", {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useDeliverOrder = () => {
    return useMutation({
        mutationFn: deliverOrder
    });
}

export{useGetOrdersByStatus ,useDeliverOrder}