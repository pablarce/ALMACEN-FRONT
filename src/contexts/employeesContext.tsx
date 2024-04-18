import { createContext, ReactNode, useContext, useEffect, useState } from "react"

import { useGetEmployee } from "../services/employeeService"
import { Employee } from "../types/types"

interface EmployeeContextType {
    employees: Employee[] | undefined
    updateEmployees: (updatedEmployees: Employee[]) => void
    error: Error | null
    isLoading: boolean
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined)

export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext)
    if (!context) {
        throw new Error("useEmployeeContext debe ser usado dentro de un EmployeeProvider")
    }
    return context
}

interface EmployeeProviderProps {
    children: ReactNode
}

export const EmployeeProvider = ({ children }: EmployeeProviderProps) => {
    const [employees, setEmployees] = useState<Employee[]>()
    const { data: initialEmployees, error, isLoading } = useGetEmployee()

    useEffect(() => {
        if (initialEmployees) {
            setEmployees(initialEmployees)
        }
    }, [initialEmployees])

    const updateEmployees = (updatedEmployees: Employee[]) => {
        setEmployees(updatedEmployees)
    }

    return (
        <EmployeeContext.Provider
            value={{
                employees,
                updateEmployees,
                error,
                isLoading,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    )
}
