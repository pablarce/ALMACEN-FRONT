import { Route, Routes } from "react-router-dom"

import { AuthProvider } from "./AuthContext"
import { Toaster } from "./components/ui/toaster"
import Login from "./pages/Login"
import Management from "./pages/Management"

function App() {
    return (
        <AuthProvider>
            <div className="bg-gray-900 overflow-hidden">
                <Routes>
                    <Route path="/LOGIN" element={<Login />} />
                    <Route path="gestion" element={<Management />} />
                </Routes>
            </div>
            <Toaster />
        </AuthProvider>
    )
}

export default App
