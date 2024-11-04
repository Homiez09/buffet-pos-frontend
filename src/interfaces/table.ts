export interface AddTableRequest {
    tableName: string; // required
}
  

export interface BaseTableResponse {
  id: string;
  tableName: string;
  isAvailable: boolean;
  qrcode?: string;
  accessCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditTableRequest{
  id: string;
  tableName: string;
}

export type TableDetailResponse = Omit<BaseTableResponse, 'createdAt' | 'updatedAt'>;
