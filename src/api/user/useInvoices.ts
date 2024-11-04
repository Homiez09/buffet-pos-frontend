import { BaseInvoiceResponse } from "@/interfaces/invoice";
import { BaseMenuResponse } from "@/interfaces/menu";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getInvoice = async (accessCode: string) => {
    const { data } = await axiosInstance.get("/customer/invoices", {
        headers: {
            AccessCode: accessCode,
        },
    });
    return data;
}

const useGetInvoice = (accessCode: string) => {
    return useQuery<BaseInvoiceResponse>({
        queryKey: ["menus"],
        queryFn: () => getInvoice(accessCode),
        staleTime: 5 * 60 * 1000,
    });
}

export { useGetInvoice };