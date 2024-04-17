import axios from "axios"
import { useMutation, useQuery } from "react-query"

import { Product } from "../types/types"

interface ProductData {
    data: Product[] | undefined
    error: Error | null
    isLoading: boolean
}

const backendUrl = import.meta.env.VITE_REACT_APP_BACK_URL

const useGetProduct = (): ProductData => {
    const fetchProducts = async (): Promise<Product[]> => {
        const response = await axios.get<Product[]>(`${backendUrl}/products`)

        return response.data
    }

    const { data, error, isLoading } = useQuery<Product[], Error>("products", fetchProducts)

    return { data, error, isLoading }
}

const useCreateProduct = () => {
    const createProduct = async (newProduct: Product) => {
        const response = await axios.post(`${backendUrl}/products`, newProduct)
        return response.data
    }

    return useMutation<Product, Error, Product>(createProduct)
}

const useUpdateProduct = () => {
    const updateProduct = async (updatedProduct: Product) => {
        const response = await axios.put(`${backendUrl}/products/${updatedProduct._id}`, updatedProduct)
        return response.data
    }

    return useMutation<Product, Error, Product>(updateProduct)
}

const useDeleteProduct = () => {
    const deleteProduct = async (id: number) => {
        await axios.delete(`${backendUrl}/products/${id}`)
    }

    return useMutation<void, Error, number>(deleteProduct)
}

export { useGetProduct, useCreateProduct, useUpdateProduct, useDeleteProduct }
