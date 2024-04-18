import React from "react"

import { Employee } from "../types/types"

interface EmployeeCardProps {
    employee: Employee
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">{`${employee.firstName} ${employee.lastName}`}</h2>
            <p className="text-gray-600 mb-2">{employee.role}</p>
            <p className="text-gray-600 mb-2">{employee.email}</p>
            <p className="text-gray-600 mb-2">{employee.phoneNumber}</p>
            <p className="text-gray-600 mb-2">{employee.address}</p>
            <p className="text-gray-600 mb-2">{`${employee.city}, ${employee.state} ${employee.zipCode}, ${employee.country}`}</p>
            <p className="text-gray-600 mb-2">{`Hire Date: ${new Date(employee.hireDate).toLocaleDateString()}`}</p>
            <p className="text-gray-600 mb-2">{`Salary: $${employee.salary}`}</p>
            {employee.contractType && (
                <p className="text-gray-600 mb-2">{`Contract Type: ${employee.contractType}`}</p>
            )}
            {employee.workingHours && (
                <p className="text-gray-600 mb-2">{`Working Hours: ${employee.workingHours}`}</p>
            )}
            {employee.education && (
                <>
                    <p className="font-semibold mb-1">Education:</p>
                    <ul className="list-disc list-inside text-gray-600">
                        {employee.education.map((edu, index) => (
                            <li key={index}>{edu}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default EmployeeCard
