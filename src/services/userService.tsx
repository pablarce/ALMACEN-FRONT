import axios from "axios"
import { useMutation, useQuery } from "react-query"

import { User } from "../types/types"

interface UserData {
    data: User[] | undefined
    error: Error | null
    isLoading: boolean
}

const backendUrl = import.meta.env.VITE_REACT_APP_BACK_URL

const useGetUser = (): UserData => {
    const fetchUsers = async (): Promise<User[]> => {
        const response = await axios.get<User[]>(`${backendUrl}/users`)
        return response.data
    }

    const { data, error, isLoading } = useQuery<User[], Error>("users", fetchUsers)

    return { data, error, isLoading }
}

const useCreateUser = () => {
    const createUser = async (newUser: User) => {
        const response = await axios.post(`${backendUrl}/users`, newUser)
        return response.data
    }

    return useMutation<User, Error, User>(createUser)
}

const useUpdateUser = () => {
    const updateUser = async (updatedUser: User) => {
        const response = await axios.put(`${backendUrl}/users/${updatedUser._id}`, updatedUser)
        return response.data
    }

    return useMutation<User, Error, User>(updateUser)
}

const useDeleteUser = () => {
    const deleteUser = async (id: number) => {
        await axios.delete(`${backendUrl}/users/${id}`)
    }

    return useMutation<void, Error, number>(deleteUser)
}

export { useGetUser, useCreateUser, useUpdateUser, useDeleteUser }
