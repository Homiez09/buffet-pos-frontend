export interface OrderItemResponse{
    id: string,
    orderId: string,
    menuId: string,
    quantity: number,
}

export interface OrderResponse {
    id: string,
    tableId: string,
    orderItem: OrderItemResponse[],
    status: string,
    createAt: Date,
    updateAt: Date
}

export interface OrderItemRequest {
    menu_id: string;
    quantity: number;
}

export interface OrderRequest {
    table_id: string;
    order_item: OrderItemRequest[];
}