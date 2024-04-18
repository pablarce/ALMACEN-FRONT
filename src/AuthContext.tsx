import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { User, UserAttributes } from "./types/types"

interface AuthenticationResponse {
    message: string
    user: User
}

interface AuthContextType {
    authenticateUser: (userToAuth: UserAttributes) => Promise<AuthenticationResponse>
    registerUser: (userToAuth: UserAttributes) => Promise<User>
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const AuthContext = createContext<AuthContextType>({
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

    const registerUser = async (userToAuth: UserAttributes): Promise<User> => {
        const { username, password } = userToAuth
        const response = await fetch(`${backUrl}/users/register?username=${username}&password=${password}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Registration failed")
        }

        return response.json()
    }

    const authenticateUser = async (userToAuth: UserAttributes): Promise<AuthenticationResponse> => {
        const { username, password } = userToAuth
        const response = await fetch(`${backUrl}/users/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })

        if (!response.ok) {
            throw new Error("Authentication failed")
        }

        return response.json()
    }

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, history])

    return (
        <AuthContext.Provider value={{ authenticateUser, registerUser, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
