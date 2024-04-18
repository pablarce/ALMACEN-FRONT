import axios from "axios"
import { useMutation, useQuery } from "react-query"

import { Purchase } from "../types/types"

interface PurchaseData {
    data: Purchase[] | undefined
    error: Error | null
    isLoading: boolean
}

const backendUrl = import.meta.env.VITE_REACT_APP_BACK_URL

const useGetPurchase = (): PurchaseData => {
    const fetchPurchases = async (): Promise<Purchase[]> => {
        const response = await axios.get<Purchase[]>(`${backendUrl}/purchases`)
        return response.data
    }

    const { data, error, isLoading } = useQuery<Purchase[], Error>("purchases", fetchPurchases)

    return { data, error, isLoading }
}

const useCreatePurchase = () => {
    const createPurchase = async (newPurchase: Purchase) => {
        const response = await axios.post(`${backendUrl}/purchases`, newPurchase)
        return response.data
    }

    return useMutation<Purchase, Error, Purchase>(createPurchase)
}

const useUpdatePurchase = () => {
    const updatePurchase = async (updatedPurchase: Purchase) => {
        const response = await axios.put(`${backendUrl}/purchases/${updatedPurchase._id}`, updatedPurchase)
        return response.data
    }

    return useMutation<Purchase, Error, Purchase>(updatePurchase)
}

const useDeletePurchase = () => {
    const deletePurchase = async (id: number) => {
        await axios.delete(`${backendUrl}/purchases/${id}`)
    }

    return useMutation<void, Error, number>(deletePurchase)
}

export { useGetPurchase, useCreatePurchase, useUpdatePurchase, useDeletePurchase }
