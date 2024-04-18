import axios from "axios"
import { useMutation, useQuery } from "react-query"

import { Employee } from "../types/types"

interface EmployeeData {
    data: Employee[] | undefined
    error: Error | null
    isLoading: boolean
}

const backendUrl = import.meta.env.VITE_REACT_APP_BACK_URL

const useGetEmployee = (): EmployeeData => {
    const fetchEmployees = async (): Promise<Employee[]> => {
        const response = await axios.get<Employee[]>(`${backendUrl}/employees`)
        return response.data
    }

    const { data, error, isLoading } = useQuery<Employee[], Error>("employees", fetchEmployees)

    return { data, error, isLoading }
}

const useCreateEmployee = () => {
    const createEmployee = async (newEmployee: Employee) => {
        const response = await axios.post(`${backendUrl}/employees`, newEmployee)
        return response.data
    }

    return useMutation<Employee, Error, Employee>(createEmployee)
}

const useUpdateEmployee = () => {
    const updateEmployee = async (updatedEmployee: Employee) => {
        const response = await axios.put(`${backendUrl}/employees/${updatedEmployee._id}`, updatedEmployee)
        return response.data
    }

    return useMutation<Employee, Error, Employee>(updateEmployee)
}

const useDeleteEmployee = () => {
    const deleteEmployee = async (id: number) => {
        await axios.delete(`${backendUrl}/employees/${id}`)
    }

    return useMutation<void, Error, number>(deleteEmployee)
}

export { useGetEmployee, useCreateEmployee, useUpdateEmployee, useDeleteEmployee }
