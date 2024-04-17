import { columns } from "../components/ProductsTable/columns"
import { ProductsTable } from "../components/ProductsTable/ProductsTable"
import { useProductContext } from "../contexts/productsContext"
import productData from "./productData"

const Management = () => {
    const { products, error, isLoading } = useProductContext()

    return (
        <div className="flex items-center justify-center overflow-hidden w-full bg-gradient h-svh">
            <ProductsTable columns={columns} data={productData || []} className="" />
        </div>
    )
}
export default Management
