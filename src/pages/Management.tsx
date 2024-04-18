import { useState } from "react"

import { columns } from "../components/ProductsTable/columns"
import { ProductsTable } from "../components/ProductsTable/ProductsTable"
import ProductView from "../components/ProductView"
import { useProductContext } from "../contexts/productsContext"

const Management = () => {
    const { products, error, isLoading } = useProductContext()
    const [idSelected, setIdSelected] = useState<string>("")

    return (
        <div
            className={`${idSelected === "" ? "" : "grid grid-cols-2"} gap-6 items-center justify-center overflow-hidden w-full bg-gradient h-[100vh] `}
        >
            <ProductsTable
                columns={columns}
                data={products || []}
                className="p-4 "
                idSelected={idSelected}
                setIdSelected={setIdSelected}
            />
            {idSelected !== "" && (
                <ProductView
                    idProductPulsed={idSelected}
                    className="w-full 2xl:h-[80vh] lg:h-[70vh] base:h-[60vh] overflow-y-scroll"
                />
            )}
        </div>
    )
}
export default Management
