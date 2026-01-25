"use client"

import { useForm } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useAccounts } from "@/lib/hooks/useAccounts"
import { Loader2, LockKeyhole } from "lucide-react"
import { toast } from "sonner"
import { loginSchema } from "@/lib/schemas/loginSchema"
import { Link } from "react-router"

export function LoginForm() {
    const { loginUser, isLoggingIn } = useAccounts()

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onChange: loginSchema,
        },
        onSubmit: async ({ value }) => {
            await loginUser.mutateAsync(value)
            toast("You have been successfully loged in")
        },
    })

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-2">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <LockKeyhole className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}
                        className="space-y-4"
                    >
                        <FieldGroup>
                            <form.Field
                                name="email"
                                children={(field) => (
                                    <Field>
                                        <FieldLabel>Email address</FieldLabel>
                                        <Input
                                            type="email"
                                            placeholder="name@example.com"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            disabled={isLoggingIn}
                                        />
                                        <FieldError errors={field.state.meta.errors} />
                                    </Field>
                                )}
                            />

                            <form.Field
                                name="password"
                                children={(field) => (
                                    <Field>
                                        <div className="flex items-center justify-between">
                                            <FieldLabel>Password</FieldLabel>
                                        </div>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            disabled={isLoggingIn}
                                        />
                                        <FieldError errors={field.state.meta.errors} />
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <Button
                            type="submit"
                            className="w-full font-semibold"
                            disabled={isLoggingIn}
                            variant="outline"
                        >
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <Button
                            type="submit"
                            className="w-full font-semibold"
                            disabled={isLoggingIn}
                        >
                            <Link to="/registerForm">
                                Register
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Development mode
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full mt-4 border-dashed border-primary/50 hover:bg-primary/5"
                            onClick={() => loginUser.mutateAsync({ email: "bob@test.com", password: "Pa$$w0rd" })}
                            disabled={isLoggingIn}
                        >
                            🚀 Quick Login as Bob
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}