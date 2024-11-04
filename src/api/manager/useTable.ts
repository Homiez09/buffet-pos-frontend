import { AddTableRequest, AssignTableRequest, BaseTableResponse, EditTableRequest, TableDetailResponse } from "@/interfaces/table";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const getTables = async () => {
    const session = await getSession();
    const { data } = await axiosInstance.get("/manage/tables", {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const addTable = async (newTable: AddTableRequest) => {
    const session = await getSession();
    const { data } = await axiosInstance.post("/manage/tables", newTable, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const getTableById = async (id: string) => {
    const session = await getSession();
    const { data } = await axiosInstance.get(`/manage/tables/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const editTable = async (editTable: EditTableRequest ) => {
    const session = await getSession();
    const { data } = await axiosInstance.put(`/manage/tables`,editTable ,{
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const deleteTableById = async (id: string) => {
    const session = await getSession();
    const { data } = await axiosInstance.delete(`/manage/tables/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const assignTable = async (table: AssignTableRequest) => {
    const session = await getSession();
    const { data } = await axiosInstance.post("/manage/tables/assign", table, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useAssignTable = () => {
    return useMutation({
        mutationFn: assignTable,
    });
}

const useDeleteTableById = () => {
    return useMutation({
        mutationFn: deleteTableById,
    });
}

const useEditTable = () => {
    return useMutation({
        mutationFn: editTable,
    });
}

const useGetTables = () => {
    return useQuery<BaseTableResponse[]>({
        queryKey: ["tables"],
        queryFn: getTables,
        staleTime: 5 * 60 * 1000,
    });
}

const useGetTableById = (id: string) => {
    return useQuery<BaseTableResponse>({
        queryKey: ["tables", id],
        queryFn: () => getTableById(id),
        staleTime: 5 * 60 * 1000,
    });
}

const useAddTable = () => {
    return useMutation({
        mutationFn: addTable,
    });
}

export { useGetTables, useAddTable, useGetTableById, useEditTable, useDeleteTableById, useAssignTable};