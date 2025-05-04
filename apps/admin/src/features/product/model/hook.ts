import { productApi } from "@entities/product/api";

export const useCreateProduct = productApi.useCreateProductMutation;
export const useUpdateProduct = productApi.useUpdateProductMutation;
export const useRemoveProduct = productApi.useRemoveProductMutation;
