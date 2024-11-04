export interface AddCategoryRequest {
    categoryName: string; // required
  }
  

export interface BaseCategoryResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryDetailResponse = BaseCategoryResponse;
