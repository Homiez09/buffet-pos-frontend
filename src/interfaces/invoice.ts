export interface Invoice {
    id: string,
    peopleAmount: number,
    totalPrice: number,
    isPaid: boolean,
    tableId: string,
    createdAt: Date,
    updatedAt: Date
}