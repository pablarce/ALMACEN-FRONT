import { Route, Routes } from "react-router-dom"

import { AuthProvider } from "./AuthContext"
import { Toaster } from "./components/ui/toaster"
import { ProductProvider } from "./contexts/productsContext"
import Login from "./pages/Login"
import Management from "./pages/Management"

function App() {
    return (
        <AuthProvider>
            <div className="bg-gray-900">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/gestion"
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
