export type User = {
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
