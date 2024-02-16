import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts:builder.query({
            query:()=>({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor:true,
        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor:true,
        }),
        createProduct:builder.mutation({
            query:()=>({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags:['Product'],
        }), 
    })
});

export const {
    useGetProductsQuery, 
    useGetProductDetailsQuery,
    useCreateProductMutation
} = productsApiSlice;