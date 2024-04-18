export type User = {
    _id: string
    firstName: string
    lastName: string
    role: "client" | "employee"
    email: string
    username: string
    organization: string
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

type PurchaseItem = {
    productId: string
    amount: number
}

export type Purchase = {
    _id: string
    clientId: string
    supplierId: string
    items: PurchaseItem[]
    totalCost: number
    purchaseDate: Date
}
