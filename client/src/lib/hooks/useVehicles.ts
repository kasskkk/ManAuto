import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Vehicle } from "../types/vehicle";

export const useVehicles = () => {
    const { data: vehicles, isLoading: isLoadingVehicles } = useQuery({
        queryKey: ['vehicles'],
        queryFn: async () => {
            const response = await agent.get<Vehicle[]>('/vehicles')
            return response.data
        }
    });

    return {
        vehicles,
        isLoadingVehicles
    }
}