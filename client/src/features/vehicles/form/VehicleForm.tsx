"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldGroup, FieldLabel, Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"

const formSchema = z.object({
    brand: z.string().min(1, "Brand is required"),
    model: z.string().min(1, "Model is required"),
    licensePlate: z.string().min(1, "License plate is required"),
    productionYear: z.number().min(1900).max(2026),
    vehicleType: z.string().min(1, "Please select a type"),
})

export function VehicleForm() {
    const form = useForm({
        defaultValues: {
            brand: "",
            model: "",
            licensePlate: "",
            productionYear: 2024,
            vehicleType: "passengerCar",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            console.log("Submitted Data:", value)
            toast.success("Vehicle added successfully!")
        },
    })

    return (
        <Card className="p-6">
            <form
                id="vehicle-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <FieldGroup>
                    {/* Brand Field */}
                    <form.Field
                        name="brand"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Brand</FieldLabel>
                                    <Input
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        placeholder="e.g. Toyota"
                                    />
                                    {/* KLUCZ: Używamy dedykowanego komponentu z dokumentacji */}
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            )
                        }}
                    />

                    {/* Model Field */}
                    <form.Field
                        name="model"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Model</FieldLabel>
                                    <Input
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        placeholder="e.g. Corolla"
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            )
                        }}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        {/* Production Year */}
                        <form.Field
                            name="productionYear"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Year</FieldLabel>
                                        <Input
                                            id={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />

                        {/* Vehicle Type */}
                        <form.Field
                            name="vehicleType"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Type</FieldLabel>
                                        <Select
                                            value={field.state.value}
                                            onValueChange={field.handleChange}
                                        >
                                            <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="passengerCar">Passenger Car</SelectItem>
                                                <SelectItem value="camper">Camper</SelectItem>
                                                <SelectItem value="miniBus">Mini Bus</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Cancel
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </FieldGroup>
            </form>
        </Card>
    )
}