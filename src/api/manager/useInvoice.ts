import { BaseInvoiceResponse, UpdateInvoiceStatusRequest } from "@/interfaces/invoice";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const getAllPaidInvoices = async () => {
    const session = await getSession();
    const { data } = await axiosInstance.get("/manage/invoices/paid", {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const getAllUnpaidInvoices = async () => {
    const session = await getSession();
    const { data } = await axiosInstance.get("/manage/invoices/unpaid", {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const updateInvoice = async (updateInvoice: UpdateInvoiceStatusRequest) => {
    const session = await getSession();
    const { data } = await axiosInstance.put(`/manage/invoices/set-paid`, updateInvoice, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useUpdateInvoice = () => {
    return useMutation({
        mutationFn: updateInvoice,
    });
}

const useGetAllPaidInvoices = () => {
    return useQuery<BaseInvoiceResponse[]>({
        queryKey: ["menus"],
        queryFn: getAllPaidInvoices,
        staleTime: 5 * 60 * 1000,
    });
}

const useGetAllUnpaidInvoices = () => {
    return useQuery<BaseInvoiceResponse[]>({
        queryKey: ["menus"],
        queryFn: getAllUnpaidInvoices,
        staleTime: 5 * 60 * 1000,
    });
}

export { useUpdateInvoice, useGetAllPaidInvoices, useGetAllUnpaidInvoices }