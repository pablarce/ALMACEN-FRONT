import { Route, Routes } from "react-router-dom"

import { AuthProvider, useAuth } from "./AuthContext"
import Navbar from "./components/Navbar"
import { Toaster } from "./components/ui/toaster"
import { EmployeeProvider } from "./contexts/employeesContext"
import { ProductProvider } from "./contexts/productsContext"
import EmployeesDisplay from "./pages/EmployeesDisplay"
import Login from "./pages/Login"
import Management from "./pages/Management"

function App() {
    const { user } = useAuth()

    return (
        <AuthProvider>
            <div className="bg-gray-900">
                {true && <Navbar />}

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/products"
                        element={
                            <ProductProvider>
                                <Management />
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
                </Routes>
            </div>
            <Toaster />
        </AuthProvider>
    )
}

export default App
