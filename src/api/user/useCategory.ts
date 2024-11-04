import { BaseCategoryResponse } from "@/interfaces/category";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getCategories = async (accessCode: string) => {
    const { data } = await axiosInstance.get("/customer/categories", {
        headers: {
            AccessCode: accessCode,
        },
    });
    return data;
}

const useGetCategories = (accessCode: string) => {
    return useQuery<BaseCategoryResponse[]>({
        queryKey: ["categories"],
        queryFn: () => getCategories(accessCode),
        staleTime: 5 * 60 * 1000,
    });
}
export { useGetCategories };