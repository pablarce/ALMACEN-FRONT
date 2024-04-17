import { useState } from "react"

import { columns } from "../components/ProductsTable/columns"
import { ProductsTable } from "../components/ProductsTable/ProductsTable"
import ProductView from "../components/ProductView"
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
            {idSelected !== "" && <ProductView idProductPulsed={"1234"} className="w-full h-[80vh]" />}
        </div>
    )
}
export default Management
