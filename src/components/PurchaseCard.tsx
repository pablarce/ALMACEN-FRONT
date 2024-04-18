import { Purchase } from "../types/types"

interface PurchaseCardProps {
    purchase: Purchase
}

const PurchaseCard = ({ purchase }: PurchaseCardProps) => {
    const formattedDate = new Date(purchase.purchaseDate).toLocaleDateString()

    return (
        <div className="border border-gray-200 bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{purchase._id}</h3>
            <p>Client ID: {purchase.clientId}</p>
            <p>Supplier ID: {purchase.supplierId}</p>
            <p>Total Cost: {purchase.totalCost}</p>
            <p>Purchase Date: {formattedDate}</p>
            <div className="mt-2">
                <h4>Items:</h4>
                <ul>
                    {purchase.items.map((item, index) => (
                        <li key={index}>
                            Product ID: {item.productId}, Amount: {item.amount}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PurchaseCard
