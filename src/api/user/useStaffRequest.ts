'use client';

import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

interface StaffRequestStatusResponse {
    status: "Pending" | "In Progress" | "Resolved";
}

interface UpdateStaffRequestRequest {
    requestId: string;
    status: "In Progress" | "Resolved";
}

const getStaffRequestStatus = async (tableId: string) => {
    const session = await getSession();
    const { data } = await axiosInstance.get(`/user/staff-request-status?tableId=${Id}`, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data as StaffRequestStatusResponse;
}

const updateStaffRequestStatus = async (newStatus: UpdateStaffRequestRequest) => {
    const session = await getSession();
    const { data } = await axiosInstance.put("/staff/update-request-status", newStatus, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
        },
    });
    return data;
}

const useGetStaffRequestStatus = (tableId: string) => {
    return useQuery<StaffRequestStatusResponse>({
        queryKey: ["staff-request-status", tableId],
        queryFn: () => getStaffRequestStatus(tableId),
        staleTime: 5 * 60 * 1000,
        refetchInterval: 5000,
    });
}

const useUpdateStaffRequestStatus = () => {
    return useMutation({
        mutationFn: updateStaffRequestStatus,
    });
}

export { useGetStaffRequestStatus, useUpdateStaffRequestStatus };
