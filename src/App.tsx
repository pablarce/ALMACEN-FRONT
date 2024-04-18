import { SetStateAction } from "react"
import { Route, Routes } from "react-router-dom"

import { AuthProvider, useAuth } from "./AuthContext"
import Navbar from "./components/Navbar"
import { Toaster } from "./components/ui/toaster"
import { ProductProvider } from "./contexts/productsContext"
import Login from "./pages/Login"
import Management from "./pages/Management"

function App() {
    const { user } = useAuth()

    return (
        <AuthProvider>
            <div className="bg-gray-900">
                {user && (
                    <Navbar
                        dataFont={""}
                        setDataFont={function (value: SetStateAction<string>): void {
                            throw new Error("Function not implemented.")
                        }}
                        client={undefined}
                    />
                )}

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
                </Routes>
            </div>
            <Toaster />
        </AuthProvider>
    )
}

export default App
