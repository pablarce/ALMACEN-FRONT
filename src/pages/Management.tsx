import { useState } from "react"

import { columns } from "../components/ProductsTable/columns"
import { ProductsTable } from "../components/ProductsTable/ProductsTable"
import { useProductContext } from "../contexts/productsContext"
import productData from "./productData"

const Management = () => {
    const { products, error, isLoading } = useProductContext()
    const [idSelected, setIdSelected] = useState<string>("")

    return (
        <div
            className={`${idSelected === "" ? "" : "grid grid-cols-2"} gap-6 items-center justify-center overflow-hidden w-full bg-gradient h-[100vh] `}
        >
            <ProductsTable
                columns={columns}
                data={productData || []}
                className="p-4 "
                idSelected={idSelected}
                setIdSelected={setIdSelected}
            />
        </div>
    )
}
export default Management
