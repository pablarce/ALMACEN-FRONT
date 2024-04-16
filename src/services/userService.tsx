import axios from "axios"
import { useMutation, useQuery } from "react-query"

import config from "../config"

interface User {
    id: number
    name: string
}

interface UserData {
    data: User[] | undefined
    error: Error | null
    isLoading: boolean
}

const UserDataFetcher = (): UserData => {
    const fetchUsers = async (): Promise<User[]> => {
        const response = await axios.get<User[]>(`${config.backendUrl}/users`)
        return response.data
    }

    const { data, error, isLoading } = useQuery<User[], Error>("users", fetchUsers)

    return { data, error, isLoading }
}

const useCreateUser = () => {
    const createUser = async (newUser: User) => {
        const response = await axios.post(`${config.backendUrl}/users`, newUser)
        return response.data
    }

    return useMutation<User, Error, User>(createUser)
}

const useUpdateUser = () => {
    const updateUser = async (updatedUser: User) => {
        const response = await axios.put(`${config.backendUrl}/users/${updatedUser.id}`, updatedUser)
        return response.data
    }

    return useMutation<User, Error, User>(updateUser)
}

const useDeleteUser = () => {
    const deleteUser = async (id: number) => {
        await axios.delete(`${config.backendUrl}/users/${id}`)
    }

    return useMutation<void, Error, number>(deleteUser)
}

export { UserDataFetcher, useCreateUser, useUpdateUser, useDeleteUser }
