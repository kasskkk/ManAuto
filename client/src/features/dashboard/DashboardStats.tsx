import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardSummary } from "@/lib/types";

interface Props {
    dashboardSummary: DashboardSummary;
}

export default function DashboardStats({ dashboardSummary }: Props) {
    return (
        <>
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Total Cars Rented</CardDescription>
                    <CardTitle className="text-2xl font-bold">
                        {dashboardSummary?.totalVehiclesRented ?? 0}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Active Rentals</CardDescription>
                    <CardTitle className="text-2xl font-bold">
                        {dashboardSummary?.activeRentals ?? 0}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Monthly Revenue</CardDescription>
                    <CardTitle className="text-2xl font-bold">
                        {dashboardSummary?.monthlyRevenue ?? 0} PLN
                    </CardTitle>
                </CardHeader>
            </Card>
        </>
    )
}
