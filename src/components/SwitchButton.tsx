import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../AuthContext"

interface SwitchButtonProps {
    className?: string
}

const SwitchButton = (props: SwitchButtonProps) => {
    const [tab, setTab] = useState<string>("products")
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            navigate(tab)
        }
    }, [tab])

    return (
        <div className={`${props.className}`}>
            <div className="bg-gray-200 flex gap-6 items-center px-4 h-14 rounded-xl border text-lg select-none">
                <div
                    onClick={() => {
                        setTab("products")
                    }}
                    className="z-10 w-18 hover:cursor-pointer"
                >
                    Productos
                </div>
                <div
                    onClick={() => {
                        setTab("employees")
                    }}
                    className="z-10 w-18 hover:cursor-pointer"
                >
                    Empleados
                </div>
                <div
                    onClick={() => {
                        setTab("purchases")
                    }}
                    className="z-10 w-18 hover:cursor-pointer"
                >
                    Compras
                </div>
                <div
                    className={`absolute bg-white rounded-xl shadow-md h-10 duration-300 ${
                        tab === "products"
                            ? "-translate-x-2 w-24"
                            : tab === "employees"
                              ? "translate-x-24 w-28"
                              : "translate-x-52 w-20"
                    }`}
                ></div>
            </div>
        </div>
    )
}

export default SwitchButton
