import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { AddCategoryRequest, CategoryDetailResponse } from "@/interfaces/category";
import { getSession } from "next-auth/react";
import { AddMenuRequest, BaseMenuResponse } from "@/interfaces/menu";

const getMenus = async () => {
    const session = await getSession();
    const { data } = await axiosInstance.get("/manage/menus", {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const getMenuByID = async (id: string) => {
    const session = await getSession();
    const { data } = await axiosInstance.get(`/manage/menus/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const addMenu = async (newMenu: AddMenuRequest) => {
    const session = await getSession();
    const { data } = await axiosInstance.post("/manage/menus", newMenu, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
}

const deleteMenu = async (id: string) => {
    const session = await getSession();
    const { data } = await axiosInstance.delete(`/manage/menus/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useDeleteMenu = () => {
    return useMutation({
        mutationFn: deleteMenu,
    });
}

const useGetMenus = () => {
    return useQuery<BaseMenuResponse[]>({
        queryKey: ["menus"],
        queryFn: getMenus,
        staleTime: 5 * 60 * 1000,
    });
}

const useGetMenuByID = (id: string) => {
    return useQuery<BaseMenuResponse>({
        queryKey: ["menus", id],
        queryFn: () => getMenuByID(id),
        staleTime: 5 * 60 * 1000,
    });
}

const useAddMenu = () => {
    return useMutation({
        mutationFn: addMenu,
    });
}

export { useGetMenus, useGetMenuByID, useAddMenu, useDeleteMenu };