import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

import logo from "../assets/logo.svg"
import { useAuth } from "../AuthContext"
import { Button } from "../components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { useToast } from "../components/ui/use-toast"

const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
})

const Login = () => {
    const navigate = useNavigate()
    const { authenticateUser, getUserByToken, setUser, registerUser } = useAuth()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { username, password } = values
        try {
            setLoading(true)
            const token = await authenticateUser({ username, password })
            setUser(await getUserByToken(token))
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Authentication successful. Token:", token)
            await new Promise((resolve) => setTimeout(resolve, 300))
            navigate("/gestion")
        } catch (error: any) {
            toast({
                title: error.message,
                description: "Username might not exist or password is incorrect",
            })
        }
        setLoading(false)
    }

    const handleRegister = async (values: z.infer<typeof formSchema>, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { username, password } = values
        try {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const result = await registerUser({ username, password })
            console.log("Registration successful. Result:", result)
            navigate("/gestion")
        } catch (error: any) {
            toast({
                title: "Registration failed",
                description: error.message,
                status: "error",
            })
        }
        setLoading(false)
    }

    return (
        <div
            className="flex items-center justify-center overflow-hidden w-full bg-gradient"
            style={{ height: "100vh" }}
        >
            <div className="flex flex-col items-center justify-center bg-gray-50 border-black rounded-xl h-2/3 w-1/3">
                <img src={logo} className="h-40 w-40" alt="logo" />
                <div className=""></div>
                <Form {...form}>
                    <form
                        onSubmit={(e) => form.handleSubmit((values) => handleSubmit(values, e))}
                        className="space-y-2 w-2/3"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your username" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your password.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="flex items-center justify-center h-10 w-full rounded-xl  border text-lg cursor-pointer gap-3 bg-gray-900 hover:bg-gray-700 duration-300"
                        >
                            <p className="text-white">Login</p>
                            {loading ? <Loader2 className="animate-spin text-white" /> : null}
                        </Button>
                    </form>
                </Form>
                <p className="underline cursor-pointer" onClick={handleRegister}>
                    Registrarse
                </p>
            </div>
        </div>
    )
}

export default Login
