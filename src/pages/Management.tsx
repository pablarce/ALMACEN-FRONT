import { columns } from "../components/ProductsTable/columns"
import { ProductsTable } from "../components/ProductsTable/ProductsTable"
import { useProductContext } from "../contexts/productsContext"

const Management = () => {
    const { products, error, isLoading } = useProductContext()

    return (
        <div className="flex items-center justify-center w-full bg-gradient h-svh">
            {products && <ProductsTable columns={columns} data={products} />}
        </div>
    )
}

export default Management
