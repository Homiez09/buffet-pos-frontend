import { BaseMenuResponse } from "@/interfaces/menu";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";


const getMenus = async (accessCode: string) => {
    const { data } = await axiosInstance.get("/customer/menus", {
        headers: {
            AccessCode: accessCode,
        },
    });
    return data;
}

const useGetMenus = (accessCode: string) => {
    return useQuery<BaseMenuResponse[]>({
        queryKey: ["menus"],
        queryFn: () => getMenus(accessCode),
        staleTime: 5 * 60 * 1000,
    });
}
export { useGetMenus };