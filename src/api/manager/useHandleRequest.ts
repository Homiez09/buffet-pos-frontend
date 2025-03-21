import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const updateRequestStatus = async ({ requestId, status }: { requestId: string; status: string }) => {
    const { data } = await axiosInstance.post(`/staff/update-request-status`, { requestId, status });
    return data;
};

const useUpdateRequestStatus = () => {
    const queryClient = useQueryClient();

    return useMutation(updateRequestStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries(["staff-request-status"]);
        },
    });
};

export { useUpdateRequestStatus };
