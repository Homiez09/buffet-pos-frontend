'use client';

import { EditPricePerPersonRequest, SettingResponse } from "@/interfaces/setting";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const getPricePerPerson = async () => {
    const session = await getSession();
    const { data } = await axiosInstance.get("/manage/settings/price-per-person", {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const editPricePerPerson = async (newPrice: EditPricePerPersonRequest) => {
    const session = await getSession();
    const { data } = await axiosInstance.put("/manage/settings/price-per-person", newPrice, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useGetPricePerPerson = () => {
    return useQuery<SettingResponse>({
        queryKey: ["price-per-person"],
        queryFn: getPricePerPerson,
        staleTime: 5 * 60 * 1000,
    });
}

const useEditPricePerPerson = () => {
    return useMutation({
        mutationFn: editPricePerPerson,
    });
}

export { useGetPricePerPerson, useEditPricePerPerson };