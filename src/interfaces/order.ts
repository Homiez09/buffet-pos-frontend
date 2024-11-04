export interface OrderItemResponse{
    id: string,
    orderID: string,
    menuID: string,
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

export interface UpdateOrderRequest{
    status: string;
    table_id: string;
}