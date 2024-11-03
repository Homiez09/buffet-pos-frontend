import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { AddCategoryRequest, CategoryDetailResponse } from "@/interfaces/category";
import { getSession } from "next-auth/react";

const getCategories = async () => {
    const session = await getSession();
    const { data } = await axiosInstance.get("/manage/categories", {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const getCategoryById = async (id: string) => {
    const session = await getSession();
    const { data } = await axiosInstance.get(`/manage/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const addCategory = async (newCategory: AddCategoryRequest) => {
    const session = await getSession();
    const { data } = await axiosInstance.post("/manage/categories", newCategory, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const deleteCategory = async (id :string) =>{
    const session = await getSession();
    const { data } = await axiosInstance.delete(`/manage/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useDeleteCategory = () => {
    return useMutation({
        mutationFn: deleteCategory,
    });
}

const useGetCategories = () => {
    return useQuery<CategoryDetailResponse[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: 5 * 60 * 1000,
    });
}

const useGetCategoryById = (id: string) => {
    return useQuery<CategoryDetailResponse>({
        queryKey: ["categories", id],
        queryFn: () => getCategoryById(id),
        staleTime: 5 * 60 * 1000,
    });
}

const useAddCategory = () => {
    return useMutation({
        mutationFn: addCategory,
    });
}

export { useGetCategories, useGetCategoryById, useAddCategory, useDeleteCategory };