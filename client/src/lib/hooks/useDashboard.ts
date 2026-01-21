import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { DashboardSummary } from "../types";

export const useDashboard = () => {

    const { data: dashboardSummary, isLoading: isLoadingDashboard } = useQuery({
        queryKey: ['dashboardSummary'],
        queryFn: async () => {
            const response = await agent.get<DashboardSummary>('/dashboard')
            return response.data
        }
    });

    return {
        dashboardSummary,
        isLoadingDashboard
    }
}