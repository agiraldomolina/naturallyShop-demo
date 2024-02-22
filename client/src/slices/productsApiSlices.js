import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts:builder.query({
            query:({ keyword, pageNumber })=>({
                url: PRODUCTS_URL,
                params: {
                    keyword,
                    pageNumber
                },
            }),
            providesTags:['Products'],
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
            invalidatesTags:['Products'],
        }),
        updateProduct:builder.mutation({
            query:(data)=>({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags:['Product'],
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE'
            }),
            invalidatesTags:['Products'],
        }),
        createReview:builder.mutation({
            query:(data)=>({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags:['Product'],
        }),
        uploadProductImage:builder.mutation({
            query:(data)=>({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
        })
    })
});

export const {
    useGetProductsQuery, 
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation
} = productsApiSlice;