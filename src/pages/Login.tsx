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
    const { authenticateUser, setUser, registerUser } = useAuth()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const { username, password } = values

        try {
            setLoading(true)
            const response = await authenticateUser({ username, password })

            if (response && response.user) {
                const authenticatedUser = response.user
                setUser(authenticatedUser)
                await new Promise((resolve) => setTimeout(resolve, 2000))
                toast({
                    title: "Authentification successful",
                    description: response.message,
                })
                navigate("/products")
            } else {
                toast({
                    title: "Authentication failed",
                    description: "Username might not exist or password is incorrect",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
            })
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (values: z.infer<typeof formSchema>) => {
        const { username, password } = values

        try {
            setLoading(true)
            const result = await registerUser({ username, password })
            await new Promise((resolve) => setTimeout(resolve, 2000))
            const authenticatedUser = result
            setUser(authenticatedUser)
            toast({
                title: "Registration successful",
            })
            navigate("/products")
        } catch (error: any) {
            toast({
                title: "Registration failed",
                description: error.message,
            })
        } finally {
            setLoading(false)
        }
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
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit(form.getValues())
                        }}
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
                <p className="underline cursor-pointer" onClick={() => handleRegister(form.getValues())}>
                    Registrarse
                </p>
            </div>
        </div>
    )
}

export default Login
