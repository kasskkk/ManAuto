"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldGroup, FieldLabel, Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { Card } from "@/components/ui/card"
import { useVehicles } from "@/lib/hooks/useVehicles"
import { useState } from "react"
import { ImageIcon, X } from "lucide-react"

const formSchema = z.object({
    brand: z.string().min(1, "Brand is required"),
    model: z.string().min(1, "Model is required"),
    licensePlate: z.string().min(1, "License plate is required"),
    productionYear: z.number().min(1900).max(2026),
    vehicleType: z.string().min(1, "Please select a type"),
    files: z.array(z.any()).min(1, "At least one photo is required"),
})

export function VehicleForm() {
    const [step, setStep] = useState(1)
    const totalSteps = 2;
    const { createVehicle, isCreatingVehicle } = useVehicles()

    const stepProgress = (step / totalSteps) * 100;

    const form = useForm({
        defaultValues: {
            brand: "",
            model: "",
            licensePlate: "",
            productionYear: 2024,
            vehicleType: "passengerCar",
            files: [] as File[],
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            await createVehicle.mutateAsync(value)
        },
    })

    return (
        <Card className="p-6 w-full max-w-2xl mx-auto shadow-lg">
            <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-muted-foreground">Step {step} of {totalSteps}</span>
                    <span className="text-primary">{stepProgress}% Complete</span>
                </div>

                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-in-out"
                        style={{ width: `${stepProgress}%` }}
                    />
                </div>

                <div className="flex items-center justify-center gap-4 pt-2">
                    <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary font-bold" : "text-muted-foreground"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 1 ? "border-primary bg-primary/10" : "border-muted"}`}>1</div>
                        <span className="text-xs sm:text-sm">General Info</span>
                    </div>
                    <div className={`w-12 h-px transition-colors ${step === 2 ? "bg-primary" : "bg-muted"}`} />
                    <div className={`flex items-center gap-2 ${step === 2 ? "text-primary font-bold" : "text-muted-foreground"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${step === 2 ? "border-primary bg-primary/10" : "border-muted"}`}>2</div>
                        <span className="text-xs sm:text-sm">Photos</span>
                    </div>
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <FieldGroup>
                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                            <form.Field
                                name="brand"
                                children={(field) => (
                                    <Field>
                                        <FieldLabel>Brand</FieldLabel>
                                        <Input {...field.state} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="e.g. Toyota" />
                                        <FieldError errors={field.state.meta.errors} />
                                    </Field>
                                )}
                            />

                            <form.Field
                                name="model"
                                children={(field) => (
                                    <Field>
                                        <FieldLabel>Model</FieldLabel>
                                        <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="e.g. Corolla" />
                                        <FieldError errors={field.state.meta.errors} />
                                    </Field>
                                )}
                            />

                            <form.Field
                                name="licensePlate"
                                children={(field) => (
                                    <Field>
                                        <FieldLabel>License Plate</FieldLabel>
                                        <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="ABC 1234" />
                                        <FieldError errors={field.state.meta.errors} />
                                    </Field>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <form.Field
                                    name="productionYear"
                                    children={(field) => (
                                        <Field>
                                            <FieldLabel>Year</FieldLabel>
                                            <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(e.target.valueAsNumber)} />
                                            <FieldError errors={field.state.meta.errors} />
                                        </Field>
                                    )}
                                />

                                <form.Field
                                    name="vehicleType"
                                    children={(field) => (
                                        <Field>
                                            <FieldLabel>Type</FieldLabel>
                                            <Select value={field.state.value} onValueChange={field.handleChange}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="passengerCar">Passenger Car</SelectItem>
                                                    <SelectItem value="camper">Camper</SelectItem>
                                                    <SelectItem value="miniBus">Mini Bus</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FieldError errors={field.state.meta.errors} />
                                        </Field>
                                    )}
                                />
                            </div>

                            <Button type="button" className="w-full mt-4" onClick={() => setStep(2)}>
                                Next: Add Photos
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <form.Field
                                name="files"
                                children={(field) => (
                                    <Field>
                                        <FieldLabel>Vehicle Photos</FieldLabel>

                                        {/* Grid podglądu zdjęć */}
                                        <div className="grid grid-cols-3 gap-2 mb-4">
                                            {field.state.value.map((file: File, index: number) => (
                                                <div key={index} className="relative aspect-video bg-muted rounded-md overflow-hidden group">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt="preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => field.handleChange(field.state.value.filter((_, i) => i !== index))}
                                                        className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}

                                            <label className="border-2 border-dashed border-muted rounded-md aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                                                <ImageIcon className="text-muted-foreground mb-1" />
                                                <span className="text-xs text-muted-foreground font-medium">Add Photo</span>
                                                <input
                                                    type="file"
                                                    multiple
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const newFiles = Array.from(e.target.files || [])
                                                        field.handleChange([...field.state.value, ...newFiles])
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        <FieldError errors={field.state.meta.errors} />
                                    </Field>
                                )}
                            />

                            <div className="flex gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setStep(1)}
                                    disabled={isCreatingVehicle}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={isCreatingVehicle}
                                >
                                    {isCreatingVehicle ? "Creating..." : "Finish & Save"}
                                </Button>
                            </div>
                        </div>
                    )}
                </FieldGroup>
            </form>
        </Card>
    )
}