import { Armchair, BookCopy, CookingPot, Dumbbell, FileQuestion, Smartphone } from "lucide-react"

import logo from "../assets/logo.svg"
import { useProductContext } from "../contexts/productsContext"

// import EditProduct from "./EditProduct"

interface ProductProps {
    idProductPulsed: string | undefined
    className?: string
    style?: any
}

const getProductStyleIcon = (productStyle: string | undefined) => {
    switch (productStyle) {
        case "Sport":
            return <Dumbbell className="w-60 h-52" />
        case "Furniture":
            return <Armchair className="w-60 h-52" />
        case "Books":
            return <BookCopy className="w-60 h-52" />
        case "Electronics":
            return <Smartphone className="w-60 h-52" />
        case "Kitchen Appliances":
            return <CookingPot className="w-60 h-52" />
        default:
            return <FileQuestion className="w-60 h-52" />
    }
}

const Product = ({ idProductPulsed, className, style }: ProductProps) => {
    const { products } = useProductContext()

    const currentProduct = products?.find((product) => product._id === idProductPulsed)

    return (
        <div className={`${className} p-6 bg-gray-100`} style={style}>
            {idProductPulsed != undefined ? (
                <>
                    <div className="flex items-center">
                        <p className="text-4xl">{currentProduct?.product_name}</p>
                        {/* <EditProduct
                            className="ml-auto"
                            id={currentProduct.idProductPulsed}
                            given_product_name={currentProduct.productName}
                            given_type={currentProduct.productStyle}
                            given_price={currentProduct.productPrice}
                            given_stock={currentProduct.productStock}
                            given_description={currentProduct.productDescription}
                        /> */}
                    </div>
                    <div className="flex h-96 items-center">
                        {getProductStyleIcon(currentProduct?.type)}
                        <div className="self-start pt-20 pl-10">
                            <div className="flex justify-center gap-2 items-center">
                                <div className="w-6 border border-black"></div>
                                <p className="text-2xl">Stock</p>
                                <div className="w-60 border border-black"></div>
                            </div>
                            <p className="py-8">Actualmente hay {currentProduct?.stock} uds.</p>
                            <div className="flex justify-center gap-2 items-center">
                                <div className="w-6 border border-black"></div>
                                <p className="text-2xl">Price</p>
                                <div className="w-60 border border-black"></div>
                            </div>
                            <p className="py-8">Precio actual: €{currentProduct?.price}.</p>
                        </div>
                    </div>
                    <div className="pl-10">
                        <div className="relative self-start flex flex-col gap-2 ">
                            <p className="text-2xl font-bold">Descripcion del producto: </p>
                            <p className="w-[27rem] ">{currentProduct?.description}</p>
                        </div>
                        <br />
                        <p className="">
                            <span className="font-bold">Id del producto</span>: {idProductPulsed}
                        </p>
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center text-center">
                    <img src={logo} className="w-56" alt="logo" />
                    <p className="text-xl">Pulsa algun producto para visualizarlo.</p>
                </div>
            )}
        </div>
    )
}

export default Product
