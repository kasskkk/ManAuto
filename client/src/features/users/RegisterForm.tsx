import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FieldGroup, FieldLabel, FieldError, Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAccounts } from "@/lib/hooks/useAccounts"
import { registerSchema } from "@/lib/schemas/registerSchema"
import { useForm } from "@tanstack/react-form"
import { LockKeyhole, Loader2 } from "lucide-react"
import { Link } from "react-router"
import { toast } from "sonner"

export default function RegisterForm() {
    const { registerUser, isRegisteringIn } = useAccounts()

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onChange: registerSchema,
            onBlur: registerSchema
        },
        onSubmit: async ({ value }) => {
            await registerUser.mutateAsync(value)
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
                    <CardTitle className="text-2xl font-bold tracking-tight">Register account</CardTitle>
                    <CardDescription>
                        Enter your credentials to create your account
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
                                            disabled={isRegisteringIn}
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
                                            disabled={isRegisteringIn}
                                        />
                                        <FieldError errors={field.state.meta.errors} />
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <div>
                            <Button
                                type="submit"
                                className="w-full font-semibold"
                                disabled={isRegisteringIn}
                            >
                                {isRegisteringIn ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Registering Your Account...
                                    </>
                                ) : (
                                    "Register Your Acccount"
                                )}
                            </Button>
                        </div>

                    </form>
                    <div className="mt-6">

                        <Button
                            variant="outline"
                            type="submit"
                            className="w-full font-semibold"
                            disabled={isRegisteringIn}
                        >
                            <Link to="/login">
                                Back to Login
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
