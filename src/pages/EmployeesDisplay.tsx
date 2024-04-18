import EmployeeCard from "../components/EmployeeCard"
import { useEmployeeContext } from "../contexts/employeesContext"

const EmployeesDisplay = () => {
    const { employees } = useEmployeeContext()

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {employees && employees.map((employee) => <EmployeeCard key={employee._id} employee={employee} />)}
        </div>
    )
}

export default EmployeesDisplay
