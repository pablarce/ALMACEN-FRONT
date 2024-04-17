import { createContext, ReactNode, useContext, useEffect, useState } from "react"

import { useGetProduct } from "../services/productsService"
import { Product } from "../types/types"

interface ProductContextType {
    products: Product[] | undefined
    updateProducts: (updatedProducts: Product[]) => void
    error: Error | null
    isLoading: boolean
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const useProductContext = () => {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error("useProductContext debe ser usado dentro de un ProductProvider")
    }
    return context
}

interface ProductProviderProps {
    children: ReactNode
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
    const [products, setProducts] = useState<Product[]>()
    const { data: initialProducts, error, isLoading } = useGetProduct()

    useEffect(() => {
        if (initialProducts) {
            setProducts(initialProducts)
        }
    }, [initialProducts])

    const updateProducts = (updatedProducts: Product[]) => {
        setProducts(updatedProducts)
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                updateProducts,
                error,
                isLoading,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
