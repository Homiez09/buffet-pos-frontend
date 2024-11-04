import { BaseTableResponse } from "@/interfaces/table";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";


const getTable = async (accessCode: string) => {
    const { data } = await axiosInstance.get("/customer/tables", {
        headers: {
            AccessCode: accessCode,
        },
    });
    return data;
}

const useGetTable = (accessCode: string) => {
    return useQuery<BaseTableResponse>({
        queryKey: ["tda"],
        queryFn: () => getTable(accessCode),
        staleTime: 5 * 60 * 1000,
    });
}
export { useGetTable };