import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { User, UserAttributes } from "./types/types"

interface AuthContextType {
    getUserByToken: (token: string) => Promise<User>
    authenticateUser: (userToAuth: UserAttributes) => Promise<string>
    registerUser: (userToAuth: UserAttributes) => Promise<string>
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const AuthContext = createContext<AuthContextType>({
    getUserByToken: async (token: string) => {
        throw new Error("getUserByToken function not implemented")
    },
    authenticateUser: async (userToAuth: UserAttributes) => {
        throw new Error("authenticateUser function not implemented")
    },
    registerUser: async (userToAuth: UserAttributes) => {
        throw new Error("registerUser function not implemented")
    },
    user: undefined,
    setUser: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const backUrl = import.meta.env.VITE_REACT_APP_BACK_URL

    const [user, setUser] = useState<User | undefined>(undefined)

    const registerUser = async (userToAuth: UserAttributes): Promise<string> => {
        const { username, password } = userToAuth
        const response = await fetch(`${backUrl}/users/Register?username=${username}&password=${password}`, {
            method: "POST",
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Registration failed")
        }

        return response.json()
    }

    const authenticateUser = async (userToAuth: UserAttributes): Promise<string> => {
        const { username, password } = userToAuth
        const response = await fetch(`${backUrl}/users/Authenticate?username=${username}&password=${password}`, {
            method: "POST",
        })

        if (!response.ok) {
            throw new Error("Authentication failed")
        }

        return response.json()
    }

    const getUserByToken = async (token: string): Promise<User> => {
        const response = await fetch(`${backUrl}/users/GetUserByToken?token=${token}`)

        if (!response.ok) {
            throw new Error("User not found")
        }

        const result: User = await response.json()

        return result
    }

    useEffect(() => {
        if (!user) {
            //navigate("/login")
        }
    }, [user, history])

    return (
        <AuthContext.Provider value={{ authenticateUser, registerUser, getUserByToken, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
