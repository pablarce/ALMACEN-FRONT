import { Wallet } from "lucide-react"

import logo from "../assets/full_logo.svg"
import { useAuth } from "../AuthContext"
import SwitchButton from "./SwitchButton"

interface NavbarProps {
    className?: string
}

const Navbar = (props: NavbarProps) => {
    const { user } = useAuth()

    return (
        <div className={`${props.className} flex items-center gap-4 px-10 pt-6`}>
            <img width="400px" src={logo} alt="" />
            <div className="w-full absolute flex items-center justify-center -z-1"></div>
            <div className="w-full flex items-center justify-center">
                <SwitchButton className="self-center align-middle" />
            </div>

            <div className="flex items-center justify-center h-14 w-fit px-4 rounded-xl border text-lg cursor-pointer hover:bg-gray-700">
                <p className="text-white">{user?.username}</p>
            </div>
            <div className="flex items-center justify-center w-fit px-4 bg-gray-700 h-14 rounded-xl border border-gray-50 text-gray-50 gap-4">
                <Wallet />
                <p className="text-xl">{user?.role} </p>
            </div>
        </div>
    )
}

export default Navbar
