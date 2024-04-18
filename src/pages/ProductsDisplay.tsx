import { useState } from "react"

import { columns } from "../components/ProductsTable/columns"
import { ProductsTable } from "../components/ProductsTable/ProductsTable"
import ProductView from "../components/ProductView"
import { useProductContext } from "../contexts/productsContext"
import { Product } from "../types/types"
import productData from "./productData"

const Management = () => {
    const { products, error, isLoading } = useProductContext()
    const [idSelected, setIdSelected] = useState<string>("")

    return (
        <div
            className={`${idSelected === "" ? "" : "grid grid-cols-2"} gap-6 items-center justify-center overflow-hidden w-full bg-gradient h-[100vh] `}
        >
            <ProductsTable<Product, any>
                columns={columns}
                data={products || []}
                className="p-4 "
                idSelected={idSelected}
                setIdSelected={setIdSelected}
            />
            <div className="p-4">
                {idSelected !== "" && (
                    <ProductView
                        idProductPulsed={idSelected}
                        className="w-full lg:h-[80vh] h-[70vh] overflow-y-scroll"
                    />
                )}
            </div>
        </div>
    )
}
export default Management
