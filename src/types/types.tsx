export type User = {
    _id: string
    firstName: string
    lastName: string
    role: "client" | "employee"
    email: string
    username: string
    organization: string
    password: string
    country?: string
}

export type UserAttributes = {
    username: string
    password: string
}

export type Product = {
    _id: string
    product_name: string
    stock: number
    price: number
    type: string
    description: string
}

export type Employee = {
    _id: string
    firstName: string
    lastName: string
    role: string
    email: string
    phoneNumber: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
    hireDate: Date
    workingHours?: string
    salary: number
    contractType?: string
    education?: string[]
}
