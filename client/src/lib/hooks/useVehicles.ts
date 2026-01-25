import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Vehicle } from "../types/vehicle";
import { toast } from "sonner";

export const useVehicles = () => {
    const queryClient = useQueryClient();

    const { data: vehicles, isLoading: isLoadingVehicles } = useQuery({
        queryKey: ['vehicles'],
        queryFn: async () => {
            const response = await agent.get<Vehicle[]>('/vehicles')
            return response.data
        }
    });

    interface CreateVehicleInput {
        brand: string;
        model: string;
        licensePlate: string;
        productionYear: number;
        vehicleType: string;
        files: File[];
    }

    const createVehicle = useMutation({
        mutationFn: async (data: CreateVehicleInput) => {
            const formData = new FormData();

            formData.append('vehicleDto.brand', data.brand);
            formData.append('vehicleDto.model', data.model);
            formData.append('vehicleDto.licensePlate', data.licensePlate);
            formData.append('vehicleDto.productionYear', data.productionYear.toString());
            formData.append('vehicleDto.vehicleType', data.vehicleType);

            data.files.forEach((file) => {
                formData.append('files', file);
            });

            const response = await agent.post('/vehicles', formData)
            return response.data;

        },
        onSuccess: () => {
            toast.success("Vehicle created!");
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
        },
        onError: () => {
            toast.error("Failed to create vehicle");
        }
    })

    return {
        vehicles,
        isLoadingVehicles,
        createVehicle,
        isCreatingVehicle: createVehicle.isPending
    }
}