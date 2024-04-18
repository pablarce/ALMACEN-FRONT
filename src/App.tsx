import { Route, Routes } from "react-router-dom"

import { useAuth } from "./AuthContext"
import Navbar from "./components/Navbar"
import { Toaster } from "./components/ui/toaster"
import { EmployeeProvider } from "./contexts/employeesContext"
import { ProductProvider } from "./contexts/productsContext"
import { PurchaseProvider } from "./contexts/purchasesContext"
import EmployeesDisplay from "./pages/EmployeesDisplay"
import Login from "./pages/Login"
import ProductsDisplay from "./pages/ProductsDisplay"
import PurchasesDisplay from "./pages/PurchasesDisplay"

function App() {
    const { user } = useAuth()

    return (
        <>
            <div className="bg-gray-900">
                {user && <Navbar />}

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/products"
                        element={
                            <ProductProvider>
                                <ProductsDisplay />
                            </ProductProvider>
                        }
                    />
                    <Route
                        path="/employees"
                        element={
                            <EmployeeProvider>
                                <EmployeesDisplay />
                            </EmployeeProvider>
                        }
                    />
                    <Route
                        path="/purchases"
                        element={
                            <PurchaseProvider>
                                <PurchasesDisplay />
                            </PurchaseProvider>
                        }
                    />
                </Routes>
            </div>
            <Toaster />
        </>
    )
}

export default App
