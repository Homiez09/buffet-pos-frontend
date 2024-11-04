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

const useGetOrders = () => {
    return useQuery<OrderResponse[]>({
        queryKey: ["orders"],
        queryFn: getOrders,
        staleTime: 5 * 60 * 1000,
    });
}

const updateOrder = async () => {
    const session = await getSession();
    const { data } = await axiosInstance.put("/manage/orders/status", {
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
    const { data } = await axiosInstance.get(`/manage/orders/table/${tableID}`,{
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useGetOrderByTableID = (tableID:string) => {
    return useQuery<OrderResponse>({
        queryKey: ["orders", tableID],
        queryFn: () => getOrderByTableID(tableID),
        staleTime: 5 * 60 * 1000,
    });
}



export{useGetOrders ,useUpdateOrder,useGetOrderByTableID}