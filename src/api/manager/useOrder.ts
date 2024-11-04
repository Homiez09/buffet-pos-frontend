import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { getSession } from "next-auth/react";
import { OrderResponse, OrderStatus, UpdateOrderRequest } from '@/interfaces/order';

const getOrdersByStatus = async (status: OrderStatus) => {
    const session = await getSession();
    const { data } = await axiosInstance.get(`/manage/orders`, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
        params: {
            status,
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

const updateOrder = async (updateOrder : UpdateOrderRequest) => {
    const session = await getSession();
    const { data } = await axiosInstance.put("/manage/orders/status", updateOrder,{
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useUpdateOrder = () => {
    return useMutation({
        mutationFn: updateOrder
    });
}

const getOrderByTableID = async (tableID :string ) => {
    const session = await getSession();
    const { data } = await axiosInstance.get(`/manage/orders/tables`,{
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
        params: {
            tableID: tableID
        },
    });
    return data;
}

const useGetOrderByTableID = (tableID:string) => {
    return useQuery<OrderResponse[]>({
        queryKey: ["orders", tableID],
        queryFn: () => getOrderByTableID(tableID),
        staleTime: 5 * 60 * 1000,
    });
}



export{useGetOrdersByStatus,useUpdateOrder,useGetOrderByTableID}
