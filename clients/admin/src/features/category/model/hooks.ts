import { categoryApi } from "@entities/category/api";

export const useCreateCategory = categoryApi.useCreateCategoryMutation;
export const useUpdateCategory = categoryApi.useUpdateCategoryMutation;
export const useRemoveCategory = categoryApi.useRemoveCategoryMutation;
