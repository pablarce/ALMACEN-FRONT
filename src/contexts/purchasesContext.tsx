import { createContext, ReactNode, useContext, useEffect, useState } from "react"

import { useGetPurchase } from "../services/purchasesService"
import { Purchase } from "../types/types"

interface PurchaseContextType {
    purchases: Purchase[] | undefined
    updatePurchases: (updatedPurchases: Purchase[]) => void
    error: Error | null
    isLoading: boolean
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined)

export const usePurchaseContext = () => {
    const context = useContext(PurchaseContext)
    if (!context) {
        throw new Error("usePurchaseContext debe ser usado dentro de un PurchaseProvider")
    }
    return context
}

interface PurchaseProviderProps {
    children: ReactNode
}

export const PurchaseProvider = ({ children }: PurchaseProviderProps) => {
    const [purchases, setPurchases] = useState<Purchase[]>()
    const { data: initialPurchases, error, isLoading } = useGetPurchase()

    useEffect(() => {
        if (initialPurchases) {
            setPurchases(initialPurchases)
        }
    }, [initialPurchases])

    const updatePurchases = (updatedPurchases: Purchase[]) => {
        setPurchases(updatedPurchases)
    }

    return (
        <PurchaseContext.Provider
            value={{
                purchases,
                updatePurchases,
                error,
                isLoading,
            }}
        >
            {children}
        </PurchaseContext.Provider>
    )
}
