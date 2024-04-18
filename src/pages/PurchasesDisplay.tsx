import PurchaseCard from "../components/PurchaseCard"
import { usePurchaseContext } from "../contexts/purchasesContext"

const PurchasesDisplay = () => {
    const { purchases } = usePurchaseContext()

    return (
        <div className=" grid grid-cols-3 gap-4 p-4">
            {purchases && purchases.map((purchase) => <PurchaseCard key={purchase._id} purchase={purchase} />)}
        </div>
    )
}

export default PurchasesDisplay
